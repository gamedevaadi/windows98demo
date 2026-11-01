/**
 * Synthetic Windows 98 Sound Engine using Web Audio API
 * Generates faithful retro sounds and tunes with zero external audio assets
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SoundEngine = {
  // Classic Windows 98 Startup Sound
  playStartup: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Chord progression frequencies (Eb Major / Bb / Eb 98 chime)
      const notes = [155.56, 233.08, 311.13, 392.00, 466.16, 622.25, 783.99, 932.33];
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Warm synth tone (mixture of sine and triangle)
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.1 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + 3.5);
      });
    } catch (e) {
      console.warn('Audio not initialized yet', e);
    }
  },

  // Classic Ding / Asterisk
  playDing: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now); // C6
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.35); // C5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // ignore
    }
  },

  // Classic Windows Chord
  playChord: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const chord = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch {
      // ignore
    }
  },

  // Classic Critical Stop / Error (punchy retro low clank)
  playError: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.28);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // ignore
    }
  },

  // Classic Exclamation
  playExclamation: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // ignore
    }
  },

  // Recycle Bin Trash Empty
  playTrash: () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      // Noise burst for paper crumpling
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
    } catch {
      // ignore
    }
  },

  // 56k Dial-Up Modem Handshake sequence
  playModem: (onComplete?: () => void) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // 1. Dial tone (350Hz + 440Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const dtGain = ctx.createGain();
      osc1.frequency.value = 350;
      osc2.frequency.value = 440;
      dtGain.gain.setValueAtTime(0.08, now);
      dtGain.gain.setValueAtTime(0, now + 0.8);
      osc1.connect(dtGain);
      osc2.connect(dtGain);
      dtGain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.85);
      osc2.stop(now + 0.85);

      // 2. DTMF dialing beeps
      const dtmfFreqs = [
        [697, 1209], [770, 1336], [852, 1477], [697, 1336],
        [770, 1209], [852, 1336], [941, 1336]
      ];
      dtmfFreqs.forEach((freqPair, i) => {
        const t = now + 1.0 + i * 0.12;
        const d1 = ctx.createOscillator();
        const d2 = ctx.createOscillator();
        const g = ctx.createGain();
        d1.frequency.value = freqPair[0];
        d2.frequency.value = freqPair[1];
        g.gain.setValueAtTime(0.07, t);
        g.gain.setValueAtTime(0, t + 0.08);
        d1.connect(g);
        d2.connect(g);
        g.connect(ctx.destination);
        d1.start(t);
        d2.start(t);
        d1.stop(t + 0.09);
        d2.stop(t + 0.09);
      });

      // 3. Ringing & Screeching Carrier Handshake
      const screechStart = now + 2.2;
      const noiseLength = 3.5;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * noiseLength, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        // Pseudo 56k static chirp modulation
        const modulation = Math.sin(i / 15) * Math.cos(i / 230);
        data[i] = (Math.random() * 2 - 1) * 0.5 + modulation * 0.3;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const screechFilter = ctx.createBiquadFilter();
      screechFilter.type = 'bandpass';
      screechFilter.frequency.setValueAtTime(1800, screechStart);
      screechFilter.frequency.linearRampToValueAtTime(2400, screechStart + 1.5);
      screechFilter.frequency.linearRampToValueAtTime(1200, screechStart + 3.0);

      const screechGain = ctx.createGain();
      screechGain.gain.setValueAtTime(0.12, screechStart);
      screechGain.gain.exponentialRampToValueAtTime(0.001, screechStart + noiseLength);

      noiseSource.connect(screechFilter);
      screechFilter.connect(screechGain);
      screechGain.connect(ctx.destination);
      noiseSource.start(screechStart);

      setTimeout(() => {
        onComplete?.();
      }, (screechStart + noiseLength - now) * 1000);

    } catch (e) {
      console.warn('Modem sound error', e);
      onComplete?.();
    }
  }
};

// Retro Winamp Jukebox Synthesizer
let currentWinampStop: (() => void) | null = null;

export interface WinampTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
}

export const WINAMP_PLAYLIST: WinampTrack[] = [
  { id: 'without_me', title: 'Without Me (128kbps)', artist: 'Eminem', duration: '0:32', durationSec: 32 },
  { id: 'sandstorm', title: 'Sandstorm (1999 Club Mix)', artist: 'Darude', duration: '0:28', durationSec: 28 },
  { id: 'blue', title: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', duration: '0:30', durationSec: 30 },
  { id: 'canyon', title: 'Canyon.mid (Windows 98 Default)', artist: 'George Stone', duration: '0:24', durationSec: 24 }
];

export function stopWinampMusic() {
  if (currentWinampStop) {
    currentWinampStop();
    currentWinampStop = null;
  }
}

export function playWinampTrack(trackId: string, onEnded?: () => void): () => void {
  stopWinampMusic();

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    let isCancelled = false;

    // Define chiptune melodies for each track
    let notes: { freq: number; dur: number; type?: OscillatorType }[] = [];

    if (trackId === 'sandstorm') {
      // Iconic B - B - B - B - B - B - B - B - B - B - B - B - E - E - E ...
      const B = 246.94;
      const E = 329.63;
      const D = 293.66;
      const Fs = 369.99;
      const subNotes = [
        B, B, B, B, B,
        B, B, B, B, B, B, B,
        E, E, E, E, E, E, E,
        D, D, D, D, D, D, D,
        Fs, Fs, Fs, Fs, Fs
      ];
      for (let rep = 0; rep < 3; rep++) {
        subNotes.forEach(f => notes.push({ freq: f, dur: 0.11, type: 'sawtooth' }));
      }
    } else if (trackId === 'without_me') {
      // Eminem Without Me funky bass riff: C - C - Bb - C - Eb - F - Eb - C
      const riff = [
        { f: 130.81, d: 0.25 }, { f: 130.81, d: 0.25 }, { f: 116.54, d: 0.25 }, { f: 130.81, d: 0.3 },
        { f: 155.56, d: 0.25 }, { f: 174.61, d: 0.25 }, { f: 155.56, d: 0.25 }, { f: 130.81, d: 0.4 }
      ];
      for (let rep = 0; rep < 4; rep++) {
        riff.forEach(r => notes.push({ freq: r.f, dur: r.d, type: 'square' }));
      }
    } else if (trackId === 'blue') {
      // Eiffel 65 Blue synth lead
      const melody = [
        370.0, 440.0, 493.9, 370.0, 440.0, 493.9, 440.0, 370.0,
        329.6, 370.0, 440.0, 329.6, 370.0, 440.0, 370.0, 293.7
      ];
      for (let rep = 0; rep < 3; rep++) {
        melody.forEach(f => notes.push({ freq: f, dur: 0.16, type: 'square' }));
      }
    } else {
      // Canyon.mid retro MIDI adventure
      const canyon = [
        261.6, 329.6, 392.0, 523.3, 440.0, 392.0, 329.6, 261.6,
        293.7, 370.0, 440.0, 587.3, 493.9, 440.0, 370.0, 293.7
      ];
      for (let rep = 0; rep < 3; rep++) {
        canyon.forEach(f => notes.push({ freq: f, dur: 0.22, type: 'triangle' }));
      }
    }

    let timeCursor = now;
    const activeNodes: OscillatorNode[] = [];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = note.type || 'sawtooth';
      osc.frequency.setValueAtTime(note.freq, timeCursor);

      gain.gain.setValueAtTime(0.08, timeCursor);
      gain.gain.exponentialRampToValueAtTime(0.001, timeCursor + note.dur * 0.95);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(timeCursor);
      osc.stop(timeCursor + note.dur);
      activeNodes.push(osc);

      timeCursor += note.dur;
    });

    const totalDurMs = (timeCursor - now) * 1000;
    const timer = setTimeout(() => {
      if (!isCancelled) {
        onEnded?.();
      }
    }, totalDurMs);

    const stopFunc = () => {
      isCancelled = true;
      clearTimeout(timer);
      activeNodes.forEach(node => {
        try { node.stop(); } catch { /* ignore */ }
      });
    };

    currentWinampStop = stopFunc;
    return stopFunc;

  } catch (err) {
    console.error('Failed to play winamp track', err);
    return () => {};
  }
}
