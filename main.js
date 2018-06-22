const ctx = new window.AudioContext()

const sec = 1.0
const rate = ctx.sampleRate
const frameSize = rate * sec
const buf = ctx.createBuffer(2, frameSize, rate)

const freqs = [
  261.626, 277.183,
  293.665, 311.127, 
  329.628,
  349.228, 369.994,
  391.995, 415.303,
  440.000, 466.164,
  493.883
]

const keyMap = {
  'z': 0, 's': 1,
  'x': 2, 'd': 3,
  'c': 4, 
  'v': 5, 'g': 6,
  'b': 7, 'h': 8,
  'n': 9, 'j': 10,
  'm': 11
}

const sin = (t, freq, amp) => {
  return amp * Math.sin(2 * Math.PI * freq * t)
}

const square = (t, freq, amp) => {
  return amp * Math.sign(sin(t, freq, amp))
}

const waves = {
  'sin': sin,
  'square': square
}

document.addEventListener('keydown', (e) => {
  const keyNo = keyMap[e.key]
  if (keyNo !== undefined) {
    const lch = buf.getChannelData(0)
    const rch = buf.getChannelData(1)
    const wave = waves[document.getElementById('wave').value]
    const freq = freqs[keyNo]
    for (let f = 0; f < frameSize; ++f) {
       lch[f] = rch[f] = wave(f / rate, freq, 0.5)
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start()
  }
})

