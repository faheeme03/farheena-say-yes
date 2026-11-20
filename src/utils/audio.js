// Web Audio API Synthesizer for Romantic Music & SFX
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.25, gainVal = 0.15) {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Playful Boing / Whoosh when "No" runs away
  playEvasion(attempt = 1) {
    this.init();
    if (this.isMuted) return;
    const baseFreq = Math.max(160, 380 - attempt * 25);
    this.playTone(baseFreq, 'triangle', 0.18, 0.2);
    setTimeout(() => {
      this.playTone(baseFreq + 90, 'sine', 0.12, 0.15);
    }, 60);
  }

  // Happy celebration fanfare when "Yes" is clicked
  playVictory() {
    this.init();
    if (this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.5, 0.22);
      }, idx * 110);
    });
  }

  // Soft romantic background music loops
  startBGM() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const notes = [
      { f: 523.25, d: 0.8 }, // C5
      { f: 587.33, d: 0.8 }, // D5
      { f: 659.25, d: 1.2 }, // E5
      { f: 783.99, d: 0.9 }, // G5
      { f: 659.25, d: 0.8 }, // E5
      { f: 523.25, d: 1.4 }  // C5
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      if (!this.isMuted) {
        const item = notes[step % notes.length];
        this.playTone(item.f, 'sine', item.d * 0.9, 0.1);
      }
      step++;
      this.timer = setTimeout(playNext, 1200);
    };

    playNext();
  }

  stopBGM() {
    this.isPlayingMusic = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export const sounds = new SoundController();
