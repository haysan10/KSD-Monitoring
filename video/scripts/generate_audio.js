const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '../public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function createWavFile(filename, durationSec, sampleRate, generatorFn) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const totalSamples = Math.floor(durationSec * sampleRate);
  const dataSize = totalSamples * numChannels * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28);
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, generatorFn(t, i, totalSamples)));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  fs.writeFileSync(path.join(audioDir, filename), buffer);
  console.log(`Generated ${filename} (${durationSec}s)`);
}

const sampleRate = 44100;

// 1. Dynamic Upbeat 60s BGM (62.0s at 120 BPM: 2 beats per sec)
createWavFile('bgm-upbeat.wav', 62.0, sampleRate, (t, i, total) => {
  const bpm = 120;
  const beat = (t * bpm) / 60;
  const beatPhase = beat % 1;
  const beatIndex = Math.floor(beat);

  // Kick on beats 0, 2 (downbeats)
  let kick = 0;
  if (beatIndex % 2 === 0 && beatPhase < 0.16) {
    const kt = beatPhase * 0.5;
    const freq = 130 * Math.exp(-kt * 28);
    kick = Math.sin(2 * Math.PI * freq * kt) * Math.exp(-kt * 18) * 0.5;
  }

  // Snare/Clap on beats 1, 3
  let snare = 0;
  if (beatIndex % 2 === 1 && beatPhase < 0.14) {
    const st = beatPhase * 0.5;
    const noise = (Math.random() * 2 - 1) * Math.exp(-st * 22);
    snare = noise * 0.28;
  }

  // Hi-hat groove on 8th notes
  let hihat = 0;
  const subBeat = (beat * 2) % 1;
  if (subBeat < 0.08) {
    hihat = (Math.random() * 2 - 1) * Math.exp(-subBeat * 40) * 0.12;
  }

  // Melodic synth progression (modern tech major/minor transitions)
  const progressions = [
    [330, 392, 440, 523], // Em / G chord
    [294, 370, 440, 587], // D chord
    [262, 330, 392, 523], // C chord
    [247, 330, 392, 493], // Bm / Em
  ];
  const barIndex = Math.floor(beatIndex / 8) % progressions.length;
  const chord = progressions[barIndex];
  const note = chord[beatIndex % chord.length];

  const synthEnv = Math.exp(-beatPhase * 6);
  const synth = (Math.sin(2 * Math.PI * note * t) + 0.35 * Math.sin(2 * Math.PI * note * 2 * t)) * synthEnv * 0.2;

  // Sub bass pulse
  const bassFreq = note / 4;
  const bass = Math.sin(2 * Math.PI * bassFreq * t) * Math.exp(-beatPhase * 3) * 0.22;

  // Master fade in (0-0.6s) & fade out (58-61s)
  let masterEnv = 1;
  if (t < 0.6) masterEnv = t / 0.6;
  if (t > 58) masterEnv = Math.max(0, (61 - t) / 3);

  return (kick + snare + hihat + synth + bass) * masterEnv * 0.75;
});

// 2. Click SFX
createWavFile('sfx-click.wav', 0.08, sampleRate, (t) => {
  return (Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 80) + (Math.random() * 2 - 1) * Math.exp(-t * 120)) * 0.5;
});

// 3. Pop SFX
createWavFile('sfx-pop.wav', 0.12, sampleRate, (t) => {
  const freq = 650 * Math.exp(-t * 15);
  return Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 25) * 0.6;
});

// 4. Chime SFX
createWavFile('sfx-chime.wav', 0.6, sampleRate, (t) => {
  const f1 = 880;
  const f2 = 1320;
  return (Math.sin(2 * Math.PI * f1 * t) * 0.5 + Math.sin(2 * Math.PI * f2 * t) * 0.5) * Math.exp(-t * 6) * 0.5;
});

// 5. Whoosh SFX (Camera / transition whip)
createWavFile('sfx-whoosh.wav', 0.4, sampleRate, (t) => {
  const env = Math.sin(Math.PI * (t / 0.4));
  return (Math.random() * 2 - 1) * env * 0.35;
});

// 6. Check SFX (Snappy inspection approval check)
createWavFile('sfx-check.wav', 0.15, sampleRate, (t) => {
  const f = t < 0.05 ? 1200 : 1760;
  return Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 20) * 0.55;
});

// 7. Shutter / Photo Flash SFX
createWavFile('sfx-shutter.wav', 0.2, sampleRate, (t) => {
  return (Math.sin(2 * Math.PI * 900 * t) * Math.exp(-t * 40) + (Math.random() * 2 - 1) * Math.exp(-t * 60)) * 0.45;
});

console.log('All 60-second audio placeholders & SFX generated successfully!');
