/**
 * FLAME & SMOKE ENGINE (flame.js)
 * -------------------------------------------------------------
 * Renderuje realističan plamen i fiziku dima na HTML5 Canvas-u pri 60 FPS.
 * 
 * Karakteristike:
 * 1. Višeslojni organski plamen (unutrašnje plavo jezgro, žuto-belo telo,
 *    topao spoljni plamen i meki radijalni glow).
 * 2. Dinamički odgovor na dah: nagib, treperenje, širenje i smanjivanje
 *    srazmerno jačini zvuka / vetra u realnom vremenu.
 * 3. Progresivno gašenje: svaka svećica ima svoj specifičan prag i zahteva
 *    kontinuiran dah određenog trajanja. Lakši dah gasi samo neke svećice,
 *    dok snažan i stabilan dah gasi sve redom.
 * 4. Fizika čestica dima nakon gašenja koja se diže i nestaje.
 * 5. Podrška za direktan dodir (tap/prevlačenje) kao rezervna opcija (fallback).
 */

export class FlameEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.theme = options.theme || {
      flameCore: '#ffffff',
      flameBody: '#ffcf40',
      flameHalo: 'rgba(255, 170, 60, 0.65)',
      candleWax: '#e8b4b8',
      candleStripe: '#d4af37'
    };

    this.onAllExtinguished = options.onAllExtinguished || null;
    this.onCandleExtinguished = options.onCandleExtinguished || null;
    this.playPuffSound = options.playPuffSound || (() => {});

    this.candles = [];
    this.smokeParticles = [];
    this.sparkParticles = [];

    this.currentIntensity = 0;
    this.windDirection = 1; // 1 = blagi nagib udesno pri duvanju
    this.lastTime = performance.now();
    this.isRunning = false;
    this._rafId = null;

    this._bindEvents();
    this._renderLoop = this._renderLoop.bind(this);
  }

  /**
   * Kreiranje svećica raspoređenih po gornjoj elipsi torte u 3D perspektivi
   */
  initCandles(count, bounds) {
    this.candles = [];
    this.smokeParticles = [];
    this.sparkParticles = [];

    const width = bounds.width;
    const height = bounds.height;
    const scaleFactor = width / 400;

    // Tačan centar i poluprečnici gornje elipse torte iz SVG modela (cx: 200, cy: 124, rx: 115, ry: 20)
    const centerX = width / 2;
    const centerY = 124 * scaleFactor;
    const radiusX = 100 * scaleFactor;
    const radiusY = 17 * scaleFactor;

    this.cakeCenter = { x: centerX, y: centerY, rx: radiusX, ry: radiusY };

    const candleCount = Math.max(1, count);

    // Ako je veći broj svećica (npr. 24 ili 25), raspoređujemo ih u 2 koncentrična prstena
    // radi savršene estetike i preglednosti
    const isDoubleRing = candleCount > 10;
    const outerCount = isDoubleRing ? Math.ceil(candleCount * 0.62) : candleCount;
    const innerCount = isDoubleRing ? (candleCount - outerCount) : 0;

    const candleList = [];

    // Spoljni prsten (veći poluprečnik)
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radiusX;
      const y = centerY + Math.sin(angle) * radiusY;
      candleList.push({ x, y, isInner: false });
    }

    // Unutrašnji prsten
    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2 + (Math.PI / innerCount);
      const x = centerX + Math.cos(angle) * (radiusX * 0.55);
      const y = centerY + Math.sin(angle) * (radiusY * 0.55);
      candleList.push({ x, y, isInner: true });
    }

    // Sortiramo po Y osi radi tačnog 3D dubinskog iscrtavanja (back to front)
    candleList.sort((a, b) => a.y - b.y);

    // Dodeljujemo progresivne pragove gašenja
    // Osetno zahtevniji pragovi: traže pun plućni kapacitet i neprekidan snažan dah
    const minThreshold = 0.55;
    const maxThreshold = 0.86;

    this.candles = candleList.map((pos, idx) => {
      const progress = idx / Math.max(1, candleList.length - 1);
      // Fina nasumična varijacija za organski izgled
      const jitter = (Math.random() - 0.5) * 0.03;
      const threshold = Math.min(0.88, Math.max(0.51, minThreshold + progress * (maxThreshold - minThreshold) + jitter));

      return {
        id: idx,
        x: pos.x,
        y: pos.y,
        wickHeight: 8,
        flameHeight: 30,
        flameWidth: 13,
        isLit: true,
        threshold: threshold,
        requiredBlowMs: 580 + (progress * 550), // 580ms za prve, do čak 1130ms za poslednje
        accumulatedBlowMs: 0,
        flickerSeed: Math.random() * 100,
        scale: 0.88 + ((pos.y - centerY) / radiusY) * 0.18, // 3D perspektivno skaliranje
        tilt: 0
      };
    });

    this.resizeCanvas();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.resetTransform();
      this.ctx.scale(dpr, dpr);
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this._rafId = requestAnimationFrame(this._renderLoop);
  }

  stop() {
    this.isRunning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  /**
   * Postavlja jačinu duvanja dobijenu iz AudioEngine-a
   */
  setBlowIntensity(intensity) {
    this.currentIntensity = Math.max(0, Math.min(1, intensity));
  }

  /**
   * Glavna petlja iscrtavanja i fizike (60 FPS)
   */
  _renderLoop(now) {
    if (!this.isRunning) return;

    const dt = Math.min(64, now - this.lastTime); // ms
    this.lastTime = now;

    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Ažuriranje logike gašenja i akumulacije duvanja
    this._updateCandlesBlowState(dt);

    // 2. Iscrtavanje svećica i plamenova
    this._renderCandles(now);

    // 3. Ažuriranje i iscrtavanje čestica dima
    this._updateAndRenderSmoke(dt);

    // 4. Ažuriranje i iscrtavanje magičnih iskri
    this._updateAndRenderSparks(dt);

    this._rafId = requestAnimationFrame(this._renderLoop);
  }

  /**
   * Proverava da li je intenzitet duvanja dovoljan za pojedinačne svećice
   */
  _updateCandlesBlowState(dt) {
    const intensity = this.currentIntensity;
    let litCountBefore = 0;
    let newlyExtinguished = 0;

    this.candles.forEach(candle => {
      if (!candle.isLit) return;
      litCountBefore++;

      // Ako je intenzitet iznad specifičnog praga ove svećice
      if (intensity >= candle.threshold) {
        // Ravnomerna progresija gašenja
        const ratio = intensity / candle.threshold;
        const multiplier = Math.min(1.15, Math.max(1.0, ratio * 1.01));
        candle.accumulatedBlowMs += dt * multiplier;

        if (candle.accumulatedBlowMs >= candle.requiredBlowMs) {
          this.extinguishCandle(candle);
          newlyExtinguished++;
        }
      } else {
        // Brzo hlađenje pri posustajanju daha (zahteva konstantan pritisak bez prekida)
        candle.accumulatedBlowMs = Math.max(0, candle.accumulatedBlowMs - dt * 3.6);
      }
    });

    // Provera da li su sve svećice ugašene
    const litCountAfter = this.candles.filter(c => c.isLit).length;
    if (litCountBefore > 0 && litCountAfter === 0) {
      if (this.onAllExtinguished) {
        this.onAllExtinguished();
      }
    }
  }

  /**
   * Gašenje pojedinačne svećice
   */
  extinguishCandle(candle) {
    if (!candle.isLit) return;
    candle.isLit = false;

    // Zvuk gašenja
    this.playPuffSound();

    // Kreiramo realistične čestice dima
    const wickTopX = candle.x;
    const wickTopY = candle.y - candle.wickHeight * candle.scale;
    this._spawnSmoke(wickTopX, wickTopY, candle.scale);

    if (this.onCandleExtinguished) {
      this.onCandleExtinguished(candle, this.getLitCount());
    }
  }

  /**
   * Vraća broj preostalih upaljenih svećica
   */
  getLitCount() {
    return this.candles.filter(c => c.isLit).length;
  }

  /**
   * Iscrtavanje tela svećica i plamenova
   */
  _renderCandles(time) {
    const ctx = this.ctx;
    const intensity = this.currentIntensity;
    const litCount = this.getLitCount();

    // 1. Dinamičko osvetljenje gornje površine torte od plamena
    if (litCount > 0 && this.cakeCenter) {
      const litRatio = litCount / Math.max(1, this.candles.length);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const cakeGlow = ctx.createRadialGradient(
        this.cakeCenter.x, this.cakeCenter.y, 10,
        this.cakeCenter.x, this.cakeCenter.y, this.cakeCenter.rx * 1.35
      );
      const glowBase = this.theme.flameHalo || 'rgba(255, 170, 60, 0.65)';
      cakeGlow.addColorStop(0, glowBase.replace(/[\d\.]+\)$/, `${0.5 * litRatio})`));
      cakeGlow.addColorStop(0.6, glowBase.replace(/[\d\.]+\)$/, `${0.2 * litRatio})`));
      cakeGlow.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = cakeGlow;
      ctx.beginPath();
      ctx.ellipse(this.cakeCenter.x, this.cakeCenter.y, this.cakeCenter.rx * 1.35, this.cakeCenter.ry * 1.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Iscrtavanje svake svećice
    this.candles.forEach(candle => {
      const scale = candle.scale;
      const x = candle.x;
      const y = candle.y;

      const candleWidth = 8 * scale;
      const candleHeight = 32 * scale;
      const halfW = candleWidth / 2;

      // Melted wax pool na dnu svećice gde ulazi u glazuru
      ctx.fillStyle = this.theme.candleWax;
      ctx.beginPath();
      ctx.ellipse(x, y + 1, halfW * 1.3, 2 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3D cilindrični gradijent tela svećice (senka - sjaj - osnovna boja - senka)
      const waxGrad = ctx.createLinearGradient(x - halfW, y, x + halfW, y);
      waxGrad.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
      waxGrad.addColorStop(0.22, '#ffffff'); // jak sjaj sa leve strane
      waxGrad.addColorStop(0.55, this.theme.candleWax);
      waxGrad.addColorStop(0.9, this.theme.candleWax);
      waxGrad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');

      ctx.fillStyle = waxGrad;
      ctx.beginPath();
      ctx.rect(x - halfW, y - candleHeight, candleWidth, candleHeight);
      ctx.fill();

      // Spiralne ukrasne metalik pruge na svećici
      ctx.strokeStyle = this.theme.candleStripe;
      ctx.lineWidth = 1.6 * scale;
      ctx.lineCap = 'round';
      for (let offset = 0.2; offset < 0.85; offset += 0.24) {
        ctx.beginPath();
        ctx.moveTo(x - halfW + 0.5, y - candleHeight * (offset + 0.12));
        ctx.lineTo(x + halfW - 0.5, y - candleHeight * offset);
        ctx.stroke();
      }

      // Gornji eliptični kapak / bazenčić otopljenog voska
      const capY = y - candleHeight;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(x, capY, halfW, 2 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.theme.candleWax;
      ctx.beginPath();
      ctx.ellipse(x, capY, halfW * 0.75, 1.4 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fitilj (wick)
      const wickTopY = capY - candle.wickHeight * scale;
      ctx.strokeStyle = '#221e20';
      ctx.lineWidth = 1.6 * scale;
      ctx.beginPath();
      ctx.moveTo(x, capY);
      ctx.quadraticCurveTo(x + 1, capY - (candle.wickHeight * 0.4 * scale), x, wickTopY);
      ctx.stroke();

      // Ako je svećica upaljena, iscrtavamo slojeviti dinamički plamen
      if (candle.isLit) {
        this._renderFlame(candle, x, wickTopY, scale, time, intensity);
      }
    });
  }

  /**
   * Iscrtavanje pojedinačnog plamena sa WebGL-nivoom fluidnosti i glow svetlom
   */
  _renderFlame(candle, x, wickY, scale, time, intensity) {
    const ctx = this.ctx;
    const seed = candle.flickerSeed;

    // Proračun nagiba i treperenja usled daha
    // Čak i pri umerenom duvanju plamen reaguje vizuelno, ali se gasi samo uz jak napor
    const visualIntensity = Math.min(1, intensity * 1.45);
    const baseWobble = Math.sin((time * 0.012) + seed) * 1.5;
    const blowLean = visualIntensity * 24 * this.windDirection; // dinamičan nagib
    const blowFlutter = visualIntensity * Math.sin((time * 0.045) + seed) * 7.5;

    const tiltX = baseWobble + blowLean + blowFlutter;
    const flameHeight = Math.max(12, (candle.flameHeight - visualIntensity * 9) * scale);
    const flameWidth = Math.max(6, (candle.flameWidth + visualIntensity * 4.5) * scale);

    const tipX = x + tiltX;
    const tipY = wickY - flameHeight;

    ctx.save();

    // 1. Spoljni radijalni Glow (osvetljava tortu i okolinu)
    ctx.globalCompositeOperation = 'screen';
    const haloRadius = Math.max(15, (flameHeight * 1.6 + Math.sin(time * 0.01 + seed) * 3));
    const glowGrad = ctx.createRadialGradient(x, wickY - flameHeight * 0.4, 2, x, wickY - flameHeight * 0.4, haloRadius);
    glowGrad.addColorStop(0, this.theme.flameHalo);
    glowGrad.addColorStop(0.5, this.theme.flameHalo.replace(/[\d\.]+\)$/, '0.25)'));
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(x, wickY - flameHeight * 0.4, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Glavni spoljni plamen (topli narandžasto-zlatni tonovi)
    ctx.globalCompositeOperation = 'source-over';
    const flameGrad = ctx.createLinearGradient(x, wickY, tipX, tipY);
    flameGrad.addColorStop(0, '#ff4500');
    flameGrad.addColorStop(0.35, '#ff8c00');
    flameGrad.addColorStop(0.8, this.theme.flameBody);
    flameGrad.addColorStop(1, '#ffffff');

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x - flameWidth * 0.5, wickY);
    ctx.bezierCurveTo(
      x - flameWidth * 0.8, wickY - flameHeight * 0.45,
      tipX - flameWidth * 0.3, tipY + flameHeight * 0.25,
      tipX, tipY
    );
    ctx.bezierCurveTo(
      tipX + flameWidth * 0.3, tipY + flameHeight * 0.25,
      x + flameWidth * 0.8, wickY - flameHeight * 0.45,
      x + flameWidth * 0.5, wickY
    );
    ctx.closePath();
    ctx.fill();

    // 3. Unutrašnje blistavo jezgro (belo-žuto)
    const innerW = flameWidth * 0.42;
    const innerH = flameHeight * 0.55;
    const innerTipX = x + tiltX * 0.5;
    const innerTipY = wickY - innerH;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(x - innerW * 0.5, wickY);
    ctx.bezierCurveTo(
      x - innerW * 0.7, wickY - innerH * 0.4,
      innerTipX - innerW * 0.2, innerTipY + innerH * 0.2,
      innerTipX, innerTipY
    );
    ctx.bezierCurveTo(
      innerTipX + innerW * 0.2, innerTipY + innerH * 0.2,
      x + innerW * 0.7, wickY - innerH * 0.4,
      x + innerW * 0.5, wickY
    );
    ctx.closePath();
    ctx.fill();

    // 4. Plavo dno plamena kod fitilja (karakteristično za pravi plamen)
    const blueGrad = ctx.createRadialGradient(x, wickY - 1, 1, x, wickY - 1, 4 * scale);
    blueGrad.addColorStop(0, 'rgba(60, 120, 255, 0.9)');
    blueGrad.addColorStop(1, 'rgba(60, 120, 255, 0)');
    ctx.fillStyle = blueGrad;
    ctx.beginPath();
    ctx.arc(x, wickY - 1, 4 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Kreiranje čestica dima kada se svećica ugasi
   */
  _spawnSmoke(x, y, scale) {
    const count = 22;
    for (let i = 0; i < count; i++) {
      this.smokeParticles.push({
        x: x + (Math.random() - 0.5) * 4 * scale,
        y: y,
        vx: (Math.random() - 0.4) * 0.9 * scale + (this.currentIntensity * 1.5),
        vy: -(0.8 + Math.random() * 1.6) * scale,
        size: (2.5 + Math.random() * 3) * scale,
        growth: 0.12 * scale,
        alpha: 0.45 + Math.random() * 0.25,
        decay: 0.006 + Math.random() * 0.007,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04
      });
    }
  }

  /**
   * Kreiranje svetlucavih iskri pri ponovnom paljenju
   */
  _spawnSparks(x, y, scale) {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 2.5;
      this.sparkParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: 1.5 + Math.random() * 2,
        alpha: 1.0,
        decay: 0.02 + Math.random() * 0.025,
        color: this.theme.primary || '#e0a96d'
      });
    }
  }

  /**
   * Ažuriranje i iscrtavanje dima
   */
  _updateAndRenderSmoke(dt) {
    const ctx = this.ctx;

    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.size += p.growth;
      p.alpha -= p.decay;
      p.rotation += p.rotSpeed;

      // Blagi horizontalni talasasti drift
      p.vx += Math.sin(p.y * 0.05) * 0.02;

      if (p.alpha <= 0) {
        this.smokeParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = 'rgba(215, 215, 230, 0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Ažuriranje i iscrtavanje iskri
   */
  _updateAndRenderSparks(dt) {
    const ctx = this.ctx;

    for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
      const p = this.sparkParticles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravitacija
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.sparkParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * VIP Turbo Dah: Sekvencijalno brzo gašenje svih svećica uz oblake dima
   */
  extinguishAll() {
    const litCandles = this.candles.filter(c => c.isLit);
    if (litCandles.length === 0) return;

    litCandles.forEach((candle, idx) => {
      setTimeout(() => {
        if (candle.isLit) {
          this.extinguishCandle(candle);
          if (this.getLitCount() === 0 && this.onAllExtinguished) {
            this.onAllExtinguished();
          }
        }
      }, idx * 35);
    });
  }

  /**
   * Ponovno paljenje svih svećica sa magičnim efektom
   */
  relightAll() {
    this.candles.forEach((candle, idx) => {
      setTimeout(() => {
        candle.isLit = true;
        candle.accumulatedBlowMs = 0;
        const wickTopY = candle.y - (candle.wickHeight + 24) * candle.scale;
        this._spawnSparks(candle.x, wickTopY, candle.scale);
      }, idx * 35);
    });
  }

  /**
   * Dodir i prevlačenje (Touch & Swipe Fallback)
   */
  _bindEvents() {
    const handlePointerAction = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const px = clientX - rect.left;
      const py = clientY - rect.top;

      let hitAny = false;
      this.candles.forEach(candle => {
        if (!candle.isLit) return;
        const candleHeight = 24 * candle.scale;
        const flameHeight = candle.flameHeight * candle.scale;
        const flameCenterY = candle.y - candleHeight - (flameHeight * 0.5);

        const dx = px - candle.x;
        const dy = py - flameCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Radijus osetljivosti na dodir (24px)
        if (dist < 26 * candle.scale) {
          this.extinguishCandle(candle);
          hitAny = true;
        }
      });

      if (hitAny) {
        const litCount = this.getLitCount();
        if (litCount === 0 && this.onAllExtinguished) {
          this.onAllExtinguished();
        }
      }
    };

    this.canvas.addEventListener('click', handlePointerAction);
    this.canvas.addEventListener('touchmove', handlePointerAction, { passive: true });
    this.canvas.addEventListener('touchstart', handlePointerAction, { passive: true });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }
}
