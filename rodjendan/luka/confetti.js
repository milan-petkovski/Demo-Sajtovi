/**
 * CONFETTI & FIREWORKS ENGINE (confetti.js)
 * -------------------------------------------------------------
 * Visoko-performantni, lagani Canvas 2D engine za slavljeničke konfete i vatromet.
 * 
 * Karakteristike:
 * 1. 3D rotacija i lepršanje metalik papirića (prednja/zadnja strana sa osenčenjem).
 * 2. Zvezdice sa 5 krakova, serpentine/trake i sjajne metalik krljušti sa odsjajem svetlosti.
 * 3. Vazdušni vatromet sa raketama i zvezdanim eksplozijama bez opterećujućeg shadowBlur-a.
 * 4. Strog limit čestica (MAX_PARTICLES) i orkestrirani rafali (bez curenja memorije i seckanja).
 * 5. Kontinuirana, luksuzna kiša zvezda i zlatnog sjaja sa stabilnih 60 FPS na svim uređajima.
 */

export class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.isRunning = false;
    this._rafId = null;
    this._timeouts = [];
    this._drizzleInterval = null;
    this.lastTime = 0;

    // Maksimalan broj aktivnih čestica - garantuje ultra-fluidnih 60 FPS
    this.MAX_PARTICLES = 280;

    // Standardna paleta boja (ažurira se preko setColors)
    this.colors = ['#e0a96d', '#f7c5cc', '#ffffff', '#ffd700', '#d47a88', '#ffe8a3'];
    this.backColors = this.colors.map(c => this._shadeColor(c, -25));

    this._resize = this._resize.bind(this);
    this._loop = this._loop.bind(this);
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  setColors(colors) {
    if (colors && colors.length > 0) {
      // Kombinujemo boje teme sa luksuznim zlatnim i šampanjac nijansama
      const enriched = [...new Set([...colors, '#ffd700', '#ffe8a3', '#ffffff'])];
      this.colors = enriched;
      this.backColors = enriched.map(c => this._shadeColor(c, -28));
    }
  }

  _shadeColor(col, percent) {
    if (!col || typeof col !== 'string' || !col.startsWith('#')) return col;
    let hex = col.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    if (hex.length !== 6) return col;

    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));

    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }

  _resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Pokreće orkestriranu rođendansku proslavu:
   * 1. Glavni topovski plotun sa obe strane + centralni rasprskivač.
   * 2. Stupnjeviti vatrometi u prvih par sekundi.
   * 3. Lagana, graciozna kiša zlatnih listića koja ne opterećuje procesor.
   */
  startCelebration() {
    this.stop(); // Čisti sve prethodne tajmere ako postoje
    this._resize();
    this.particles = [];
    this.fireworks = [];
    this.isRunning = true;
    this.lastTime = performance.now();

    // 1. Inicijalni veliki dvostruki plotun iz donjih uglova
    this.launchCannons(50, 50, 25);
    this.launchFirework(0.35);
    this.launchFirework(0.65);

    // 2. Koreografisani dodatni rafali tokom prvih nekoliko sekundi
    const schedule = [
      { delay: 450, fwPos: 0.5, cannon: false },
      { delay: 1100, fwPos: 0.28, cannon: true, left: 35, right: 35 },
      { delay: 1900, fwPos: 0.72, cannon: false },
      { delay: 2800, fwPos: 0.45, cannon: true, left: 25, right: 25 },
      { delay: 3800, fwPos: 0.60, cannon: false }
    ];

    schedule.forEach(item => {
      const tid = setTimeout(() => {
        if (!this.isRunning) return;
        if (item.fwPos) this.launchFirework(item.fwPos);
        if (item.cannon) this.launchCannons(item.left || 30, item.right || 30, 15);
      }, item.delay);
      this._timeouts.push(tid);
    });

    // 3. Kontinuirana, umirujuća kiša metalik listića i zvezda (održava ~130 čestica)
    const drizzleTid = setTimeout(() => {
      if (!this.isRunning) return;
      this._drizzleInterval = setInterval(() => {
        if (!this.isRunning) return;
        if (this.particles.length < 150) {
          this._spawnAmbientDrizzle(3);
        }
      }, 340);
    }, 2400);
    this._timeouts.push(drizzleTid);

    if (!this._rafId) {
      this._rafId = requestAnimationFrame(this._loop);
    }
  }

  stop() {
    this.isRunning = false;

    if (this._drizzleInterval) {
      clearInterval(this._drizzleInterval);
      this._drizzleInterval = null;
    }

    if (this._timeouts && this._timeouts.length > 0) {
      this._timeouts.forEach(tid => clearTimeout(tid));
      this._timeouts = [];
    }

    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    this.particles = [];
    this.fireworks = [];
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  /**
   * Ispaljuje konfete iz levog i desnog donjeg ugla ka centru
   */
  launchCannons(leftCount = 45, rightCount = 45, centerCount = 20) {
    if (!this.isRunning) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Levi top (ispaljuje pod uglom od 35 do 65 stepeni udesno-gore)
    for (let i = 0; i < leftCount; i++) {
      if (this.particles.length >= this.MAX_PARTICLES) break;
      const angle = (Math.PI * 0.22) + (Math.random() * 0.35);
      const speed = 15 + Math.random() * 16;
      this.particles.push(this._createConfetti(
        -10,
        h * 0.88,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed
      ));
    }

    // Desni top (ispaljuje ulevo-gore)
    for (let i = 0; i < rightCount; i++) {
      if (this.particles.length >= this.MAX_PARTICLES) break;
      const angle = (Math.PI * 0.78) - (Math.random() * 0.35);
      const speed = 15 + Math.random() * 16;
      this.particles.push(this._createConfetti(
        w + 10,
        h * 0.88,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed
      ));
    }

    // Centralni rasprskivač zvezdica
    for (let i = 0; i < centerCount; i++) {
      if (this.particles.length >= this.MAX_PARTICLES) break;
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      this.particles.push(this._createConfetti(
        w * 0.5,
        h * 0.42,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        'star'
      ));
    }
  }

  /**
   * Lagana kiša koja se spušta sa vrha ekrana (daje živost bez gušenja performansi)
   */
  _spawnAmbientDrizzle(count = 3) {
    const w = window.innerWidth;
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.MAX_PARTICLES) break;
      const x = Math.random() * w;
      const y = -15 - Math.random() * 20;
      const vx = (Math.random() - 0.5) * 1.8;
      const vy = 1.2 + Math.random() * 2.4;
      this.particles.push(this._createConfetti(x, y, vx, vy));
    }
  }

  _createConfetti(x, y, vx, vy, forcedShape = null) {
    const idx = Math.floor(Math.random() * this.colors.length);
    const color = this.colors[idx];
    const backColor = this.backColors[idx] || color;

    const shapes = ['rect', 'rect', 'star', 'ribbon', 'sequin'];
    const shape = forcedShape || shapes[Math.floor(Math.random() * shapes.length)];

    let width = 7 + Math.random() * 6;
    let height = shape === 'ribbon' ? (18 + Math.random() * 16) : (9 + Math.random() * 7);

    if (shape === 'star') {
      width = 7 + Math.random() * 6;
      height = width;
    } else if (shape === 'sequin') {
      width = 5 + Math.random() * 5;
      height = width;
    }

    return {
      x,
      y,
      vx,
      vy,
      width,
      height,
      color,
      backColor,
      shape,
      tiltAngle: Math.random() * Math.PI * 2,
      tiltSpeed: 0.04 + Math.random() * 0.07,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.04,
      drift: 0.8 + Math.random() * 1.4,
      opacity: 1,
      gravity: shape === 'ribbon' ? 0.20 : 0.26,
      drag: 0.965
    };
  }

  /**
   * Lansira raketu koja leti u vis i eksplodira u vatromet
   */
  launchFirework(xRatio = 0.5) {
    if (!this.isRunning) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const startX = w * Math.max(0.18, Math.min(0.82, xRatio + (Math.random() * 0.1 - 0.05)));
    const targetY = h * (0.16 + Math.random() * 0.22);
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.fireworks.push({
      x: startX,
      y: h + 10,
      targetY,
      vx: (Math.random() - 0.5) * 1.6,
      vy: -(13 + Math.random() * 4),
      color,
      trail: []
    });
  }

  _explodeFirework(fw) {
    const sparkCount = 38;
    for (let i = 0; i < sparkCount; i++) {
      if (this.particles.length >= this.MAX_PARTICLES) break;
      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const speed = 2.5 + Math.random() * 6.5;

      this.particles.push({
        x: fw.x,
        y: fw.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: 3 + Math.random() * 2,
        height: 3 + Math.random() * 2,
        color: fw.color,
        backColor: '#ffffff',
        shape: 'spark',
        tiltAngle: 0,
        tiltSpeed: 0,
        rotation: 0,
        rotSpeed: 0,
        wobble: 0,
        wobbleSpeed: 0,
        drift: 0,
        opacity: 1,
        gravity: 0.14,
        drag: 0.95,
        sparkDecay: 0.018 + Math.random() * 0.018
      });
    }
  }

  /**
   * Iscrtavanje zvezdice sa 5 krakova
   */
  _drawStar(ctx, cx, cy, outerRadius, innerRadius) {
    const spikes = 5;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  _loop(now) {
    if (!this.isRunning && this.particles.length === 0 && this.fireworks.length === 0) {
      this._rafId = null;
      return;
    }

    const dt = Math.min(50, now - this.lastTime);
    this.lastTime = now;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    // 1. Obrada i iscrtavanje raketa vatrometa
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.vy *= 0.985;

      // Čuvamo tačke za trag rakete
      fw.trail.push({ x: fw.x, y: fw.y, alpha: 0.9 });
      if (fw.trail.length > 5) fw.trail.shift();

      // Iscrtavamo trag rakete
      ctx.strokeStyle = fw.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let t = 0; t < fw.trail.length; t++) {
        const pt = fw.trail[t];
        if (t === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Glava rakete
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Detonacija na vrhu putanje
      if (fw.y <= fw.targetY || fw.vy >= -1.5) {
        this._explodeFirework(fw);
        this.fireworks.splice(i, 1);
      }
    }

    // 2. Obrada i renderovanje čestica
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Fizika kretanja
      p.x += p.vx + Math.sin(p.wobble) * p.drift;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy = (p.vy * p.drag) + p.gravity;

      p.tiltAngle += p.tiltSpeed;
      p.rotation += p.rotSpeed;
      p.wobble += p.wobbleSpeed;

      // Životni vek čestice
      if (p.shape === 'spark') {
        p.opacity -= p.sparkDecay;
      } else {
        if (p.y > h * 0.8) {
          p.opacity -= 0.025;
        }
      }

      if (p.opacity <= 0 || p.y > h + 40) {
        this.particles.splice(i, 1);
        continue;
      }

      // Iscrtavanje
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const scaleX = Math.cos(p.tiltAngle);

      if (p.shape === 'rect') {
        // Dvostrano metalik osenčenje (efekat presijavanja)
        ctx.fillStyle = scaleX < 0 ? p.backColor : p.color;
        ctx.fillRect(-p.width * scaleX * 0.5, -p.height * 0.5, p.width * scaleX, p.height);
      } else if (p.shape === 'star') {
        ctx.fillStyle = p.color;
        const starScale = Math.abs(scaleX) * 0.5 + 0.5;
        this._drawStar(ctx, 0, 0, p.width * starScale, (p.width * 0.45) * starScale);
      } else if (p.shape === 'sequin') {
        // Okrugla krljušt sa svetlosnim odsjajem
        ctx.fillStyle = scaleX < 0 ? p.backColor : p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.max(0.5, Math.abs(p.width * scaleX * 0.5)), p.width * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Odsjaj svetlosti
        if (p.opacity > 0.4) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.beginPath();
          ctx.arc(p.width * 0.15, -p.width * 0.15, p.width * 0.16, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (p.shape === 'ribbon') {
        // Lepršava traka/serpentina
        ctx.fillStyle = scaleX < 0 ? p.backColor : p.color;
        ctx.fillRect(-p.width * 0.45 * scaleX, -p.height * 0.5, p.width * 0.9 * scaleX, p.height);
      } else if (p.shape === 'spark') {
        // Iskra vatrometa (brzi dual-layer bez laggy shadowBlur-a)
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.width, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, p.width * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    this._rafId = requestAnimationFrame(this._loop);
  }
}
