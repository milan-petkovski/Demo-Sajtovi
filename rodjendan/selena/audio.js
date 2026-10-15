/**
 * AUDIO ENGINE & DETEKCIJA DUVANJA (audio.js)
 * -------------------------------------------------------------
 * Koristi Web Audio API za visoko-preciznu detekciju duvanja u mikrofon.
 * 
 * Karakteristike:
 * 1. Isključuje sistemsko potiskivanje buke (noiseSuppression: false)
 *    i echoCancellation jer oni uklanjaju šum duvanja.
 * 2. Analizira odnos niskih frekvencija (0 - 500 Hz) i RMS pritiska vazduha.
 * 3. Filtrira govor i muziku proverom spektralne ravnosti i spektralnih pikova.
 * 4. Automatska kalibracija šuma prostorije (1.2s) za tačan bazni nivo.
 * 5. Ugrađeni Web Audio sintisajzer za zvučne efekte (gašenje, paljenje,
 *    slavljenička fanfara, ambijentalna melodija) bez zavisnosti od eksternih fajlova.
 */

export class AudioEngine {
  constructor(config = {}) {
    this.config = Object.assign({
      blowThreshold: 0.22,
      lowFreqMaxHz: 500,
      calibrationDurationMs: 1200,
      sensitivityMultiplier: 1.35,
      smoothingAlpha: 0.18,
      enableSynthMusic: true
    }, config);

    this.audioContext = null;
    this.mediaStream = null;
    this.analyser = null;
    this.source = null;

    // Bufferi za analizu
    this.timeData = null;
    this.freqData = null;

    // Stanja detekcije
    this.isRunning = false;
    this.isCalibrating = false;
    this.calibrationStartTime = 0;
    this.calibrationSamples = [];
    this.baselineRMS = 0.01;
    this.baselineLowFreq = 10;

    // Glatka vrednost intenziteta (0.0 do 1.0)
    this.currentIntensity = 0;
    this.smoothedIntensity = 0;
    this.peakHoldUntil = 0;

    // Listeneri i povratni pozivi
    this.onIntensityUpdate = null;
    this.onCalibrationProgress = null;
    this.onCalibrationComplete = null;
    this.onError = null;

    // Zvuk i sintisajzer
    this.isMuted = false;
    this.musicGainNode = null;
    this.sfxGainNode = null;
    this.isMusicPlaying = false;
    this.currentMusicNoteIndex = 0;
    this.musicTimer = null;

    this._rafId = null;
    this._processLoop = this._processLoop.bind(this);
  }

  /**
   * Inicijalizacija AudioContext-a i mikrofona nakon korisničkog klika (iOS kompatibilno)
   */
  async start() {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) {
        throw new Error('Vaš pretraživač ne podržava Web Audio API.');
      }

      if (!this.audioContext) {
        this.audioContext = new AudioCtxClass();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Kreiramo master gain čvorove za muziku i zvučne efekte
      if (!this.musicGainNode) {
        this.musicGainNode = this.audioContext.createGain();
        this.musicGainNode.gain.value = 0.18;
        this.musicGainNode.connect(this.audioContext.destination);

        this.sfxGainNode = this.audioContext.createGain();
        this.sfxGainNode.gain.value = 0.45;
        this.sfxGainNode.connect(this.audioContext.destination);
      }

      // Provera dostupnosti navigator.mediaDevices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Pristup mikrofonu nije podržan u ovom pregledaču ili zahteva bezbednu HTTPS vezu.');
      }

      // Važno: ISKLJUČUJEMO automatsko procesiranje zvuka da bismo uhvatili čist šum duvanja!
      const constraints = {
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1
        }
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

      // AnalyserNode podešavanja
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.1;

      this.source.connect(this.analyser);

      this.timeData = new Float32Array(this.analyser.fftSize);
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

      // Započni kalibraciju ambijentalnog šuma
      this.startCalibration();

      this.isRunning = true;
      this._rafId = requestAnimationFrame(this._processLoop);

      // Pokreni pozadinsku ambijentalnu rođendansku melodiju ako je omogućena
      if (this.config.enableSynthMusic && !this.isMuted) {
        this.startBirthdayMelody();
      }

      return true;
    } catch (err) {
      console.warn('Greška pri pristupu mikrofonu:', err);
      let userFriendlyMessage = 'Nije moguće pristupiti mikrofonu.';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        userFriendlyMessage = 'Dozvola za mikrofon je odbijena. Možeš ugasiti svećice dodirom!';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        userFriendlyMessage = 'Mikrofon nije pronađen na uređaju. Koristi gašenje dodirom.';
      } else if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        userFriendlyMessage = 'Pristup mikrofonu zahteva HTTPS bezbednu vezu. Koristi gašenje dodirom.';
      } else if (err.message) {
        userFriendlyMessage = err.message;
      }

      if (this.onError) {
        this.onError(userFriendlyMessage, err);
      }
      return false;
    }
  }

  /**
   * Započinje merenje buke u prostoriji (1.2 sekunde)
   */
  startCalibration() {
    this.isCalibrating = true;
    this.calibrationStartTime = performance.now();
    this.calibrationSamples = [];
  }

  /**
   * Glavna petlja za obradu audio podataka (60 FPS)
   */
  _processLoop() {
    if (!this.isRunning) return;

    this.analyser.getFloatTimeDomainData(this.timeData);
    this.analyser.getByteFrequencyData(this.freqData);

    const sampleRate = this.audioContext.sampleRate;
    const fftSize = this.analyser.fftSize;
    const binWidth = sampleRate / fftSize; // cca 21.5 Hz po binu na 44.1kHz

    // 1. RMS (Root Mean Square) - time domain jačina zvuka
    let sumSquares = 0;
    for (let i = 0; i < this.timeData.length; i++) {
      const val = this.timeData[i];
      sumSquares += val * val;
    }
    const rms = Math.sqrt(sumSquares / this.timeData.length);

    // 2. Niske frekvencije (0 do lowFreqMaxHz, npr. 500 Hz)
    const maxLowBin = Math.min(
      Math.floor(this.config.lowFreqMaxHz / binWidth),
      this.freqData.length - 1
    );

    let lowFreqSum = 0;
    let lowBinsCount = 0;
    // Preskačemo nulti bin (DC offset)
    for (let i = 1; i <= maxLowBin; i++) {
      lowFreqSum += this.freqData[i];
      lowBinsCount++;
    }
    const avgLowFreq = lowBinsCount > 0 ? (lowFreqSum / lowBinsCount) : 0; // 0 - 255

    // 3. Provera spektralnog pika u srednjim frekvencijama (karakteristika ljudskog glasa / pevanja)
    // Glas ima izražene formantne pikove (vokalni tonovi), dok je duvanje širokopojasni šum bez izraženog tona
    const voiceMinBin = Math.floor(600 / binWidth);
    const voiceMaxBin = Math.min(Math.floor(3500 / binWidth), this.freqData.length - 1);

    let midPeak = 0;
    let midSum = 0;
    let midCount = 0;
    for (let i = voiceMinBin; i <= voiceMaxBin; i++) {
      const val = this.freqData[i];
      if (val > midPeak) midPeak = val;
      midSum += val;
      midCount++;
    }
    const avgMidFreq = midCount > 0 ? (midSum / midCount) : 1;
    // Spektralni faktor pika: ako je pik drastično veći od proseka, u pitanju je pevanje ili govor
    const crestFactor = avgMidFreq > 8 ? (midPeak / avgMidFreq) : 1;

    // --- FAZA KALIBRACIJE ---
    if (this.isCalibrating) {
      const elapsed = performance.now() - this.calibrationStartTime;
      const progress = Math.min(1, elapsed / this.config.calibrationDurationMs);

      this.calibrationSamples.push({ rms, avgLowFreq });

      if (this.onCalibrationProgress) {
        this.onCalibrationProgress(progress);
      }

      if (elapsed >= this.config.calibrationDurationMs) {
        this.isCalibrating = false;

        // Računamo bazni šum prostorije
        if (this.calibrationSamples.length > 0) {
          const sumRMS = this.calibrationSamples.reduce((acc, s) => acc + s.rms, 0);
          const sumLow = this.calibrationSamples.reduce((acc, s) => acc + s.avgLowFreq, 0);

          this.baselineRMS = Math.max(0.005, sumRMS / this.calibrationSamples.length);
          this.baselineLowFreq = Math.max(5, sumLow / this.calibrationSamples.length);
        }

        if (this.onCalibrationComplete) {
          this.onCalibrationComplete({
            baselineRMS: this.baselineRMS,
            baselineLowFreq: this.baselineLowFreq
          });
        }
      }

      this._rafId = requestAnimationFrame(this._processLoop);
      return;
    }

    // --- FAZA DETEKCIJE DUVANJA ---
    // Oduzimamo bazni šum prostorije
    const activeRMS = Math.max(0, rms - this.baselineRMS);
    const activeLow = Math.max(0, avgLowFreq - this.baselineLowFreq);

    // Normalizujemo RMS (zahteva stabilan pritisak zvuka)
    const normRMS = Math.min(1, (activeRMS / 0.28) * this.config.sensitivityMultiplier);

    // Normalizujemo niskofrekventnu energiju (povećano na 215 za veći napor)
    const normLow = Math.min(1, (activeLow / 215) * this.config.sensitivityMultiplier);

    // Diskriminator govora: ako je prisutan oštar muzički/vokalni ton (crestFactor > 3.2),
    // umanjujemo intenzitet kako priča ili pevanje ne bi gasili svećice
    let voicePenalty = 1.0;
    if (crestFactor > 3.2 && normLow < 0.65) {
      voicePenalty = Math.max(0.12, 1.0 - (crestFactor - 3.2) * 0.35);
    }

    // Kombinovani sirovi intenzitet: duvanje stvara niski pritisak na membranu mikrofona (74%)
    // uz propratni RMS šum (26%)
    let rawIntensity = (normLow * 0.74 + normRMS * 0.26) * voicePenalty;

    // Prag šuma: ispod 0.10 se smatra tišinom
    if (rawIntensity < 0.10) {
      rawIntensity = 0;
    }

    const raw = Math.min(1, Math.max(0, rawIntensity));
    this.currentIntensity = raw;

    // Top-tier balistika analognog VU merača:
    // 1. Attack: brz, dinamičan uspon dok slavljenik duva
    // 2. Peak-Hold: kada dostigne vrh (preko 92% ili 100%), zadržava se stabilno ~420ms
    // 3. Decay: prirodno, meko opadanje pritiska vazduha
    const now = performance.now();

    if (raw >= this.smoothedIntensity) {
      // Uspon (Attack)
      const attackAlpha = 0.26;
      this.smoothedIntensity = (attackAlpha * raw) + ((1 - attackAlpha) * this.smoothedIntensity);

      // Ako je blizu maksimuma, produžavamo zadržavanje na vrhu
      if (this.smoothedIntensity >= 0.92) {
        this.peakHoldUntil = now + 420; // Drži vrh 420ms pre nego što krene da opada
      }
    } else {
      // Opadanje: proveravamo da li je aktivan peak-hold
      if (this.peakHoldUntil && now < this.peakHoldUntil) {
        // Zadržava se na vrhu (vrlo blago mikro-hlađenje)
        this.smoothedIntensity = Math.max(this.smoothedIntensity * 0.996, raw);
      } else {
        // Organsko, meko opadanje (Decay)
        const decayAlpha = 0.08;
        this.smoothedIntensity = (decayAlpha * raw) + ((1 - decayAlpha) * this.smoothedIntensity);
      }
    }

    if (this.smoothedIntensity < 0.01) {
      this.smoothedIntensity = 0;
    }

    if (this.onIntensityUpdate) {
      this.onIntensityUpdate({
        rawIntensity: this.currentIntensity,
        intensity: this.smoothedIntensity,
        rms: rms,
        lowFreq: avgLowFreq
      });
    }

    this._rafId = requestAnimationFrame(this._processLoop);
  }

  /**
   * Zvuk gašenja svećice: sintetički prigušeni šum vazduha (puff)
   */
  playPuffSound() {
    if (this.isMuted || !this.audioContext) return;

    try {
      const bufferSize = this.audioContext.sampleRate * 0.15; // 150 ms
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const output = buffer.getChannelData(0);

      // Generišemo mekani beli šum
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.35;
      }

      const whiteNoise = this.audioContext.createBufferSource();
      whiteNoise.buffer = buffer;

      // Band-pass filter koji simulira zvuk gašenja plamena
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.audioContext.currentTime);
      filter.Q.setValueAtTime(1.8, this.audioContext.currentTime);

      const gain = this.audioContext.createGain();
      gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.14);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGainNode);

      whiteNoise.start();
      whiteNoise.stop(this.audioContext.currentTime + 0.15);
    } catch (e) {
      console.warn('Puff sound error:', e);
    }
  }

  /**
   * Zvuk ponovnog paljenja svećica: magični zvučni arpeggio
   */
  playRelightSparkle() {
    if (this.isMuted || !this.audioContext) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.audioContext.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.36);
      });
    } catch (e) {
      console.warn('Sparkle sound error:', e);
    }
  }

  /**
   * Slavljenička fanfara pri uspešnom gašenju svih svećica
   */
  playSuccessFanfare() {
    if (this.isMuted || !this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      // Trijumfalni akordi i tonovi
      const fanfareNotes = [
        { f: 523.25, t: 0.0, d: 0.18 }, // C5
        { f: 523.25, t: 0.18, d: 0.18 }, // C5
        { f: 523.25, t: 0.36, d: 0.18 }, // C5
        { f: 659.25, t: 0.54, d: 0.45 }, // E5
        { f: 783.99, t: 0.90, d: 0.80 }, // G5
        { f: 1046.50, t: 1.40, d: 1.2 }  // C6 grand
      ];

      fanfareNotes.forEach(note => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0, now + note.t);
        gain.gain.linearRampToValueAtTime(0.35, now + note.t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.d + 0.05);
      });
    } catch (e) {
      console.warn('Fanfare sound error:', e);
    }
  }

  /**
   * Ugrađena nežna sintetička "Srećan rođendan" melodija
   */
  startBirthdayMelody() {
    if (this.isMusicPlaying || !this.audioContext) return;
    this.isMusicPlaying = true;

    // Note za "Danas nam je divan dan" / "Happy Birthday" (C-dur)
    const melody = [
      { f: 261.63, d: 350 }, // C4
      { f: 261.63, d: 350 }, // C4
      { f: 293.66, d: 700 }, // D4
      { f: 261.63, d: 700 }, // C4
      { f: 349.23, d: 700 }, // F4
      { f: 329.63, d: 1200 }, // E4
      { f: 0, d: 300 },      // Pauza

      { f: 261.63, d: 350 }, // C4
      { f: 261.63, d: 350 }, // C4
      { f: 293.66, d: 700 }, // D4
      { f: 261.63, d: 700 }, // C4
      { f: 392.00, d: 700 }, // G4
      { f: 349.23, d: 1200 }, // F4
      { f: 0, d: 300 },      // Pauza

      { f: 261.63, d: 350 }, // C4
      { f: 261.63, d: 350 }, // C4
      { f: 523.25, d: 700 }, // C5
      { f: 440.00, d: 700 }, // A4
      { f: 349.23, d: 700 }, // F4
      { f: 329.63, d: 700 }, // E4
      { f: 293.66, d: 900 }, // D4
      { f: 0, d: 300 },

      { f: 466.16, d: 350 }, // Bb4
      { f: 466.16, d: 350 }, // Bb4
      { f: 440.00, d: 700 }, // A4
      { f: 349.23, d: 700 }, // F4
      { f: 392.00, d: 700 }, // G4
      { f: 349.23, d: 1400 }, // F4
      { f: 0, d: 1200 }      // Pauza pre ponavljanja
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.audioContext || this.isMuted) return;

      const item = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      if (item.f > 0) {
        try {
          const now = this.audioContext.currentTime;
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();

          osc.type = 'sine'; // Nežan, topao ton zvona/vibrafona
          osc.frequency.setValueAtTime(item.f, now);

          const durSec = item.d / 1000;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + durSec);

          osc.connect(gain);
          gain.connect(this.musicGainNode);

          osc.start(now);
          osc.stop(now + durSec + 0.05);
        } catch (e) {
          console.warn('Melody error:', e);
        }
      }

      this.musicTimer = setTimeout(playNextNote, item.d);
    };

    playNextNote();
  }

  /**
   * Zaustavlja melodiju
   */
  stopBirthdayMelody() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  /**
   * Prebacivanje zvuka (Mute/Unmute)
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBirthdayMelody();
      if (this.musicGainNode) this.musicGainNode.gain.value = 0;
      if (this.sfxGainNode) this.sfxGainNode.gain.value = 0;
    } else {
      if (this.musicGainNode) this.musicGainNode.gain.value = 0.18;
      if (this.sfxGainNode) this.sfxGainNode.gain.value = 0.45;
      if (this.config.enableSynthMusic) {
        this.startBirthdayMelody();
      }
    }
    return this.isMuted;
  }

  /**
   * Zaustavlja sve audio procese i oslobađa mikrofon
   */
  destroy() {
    this.isRunning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.stopBirthdayMelody();

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }
}
