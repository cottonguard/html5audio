const ctx = new window.AudioContext()

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

const playingOscs = {}

document.addEventListener('keydown', (e) => {
  const keyNo = keyMap[e.key]
  if (keyNo !== undefined) {
    const osc = ctx.createOscillator()
    osc.frequency.value = freqs[keyNo]
    osc.type = document.getElementById('wave').value
    osc.connect(ctx.destination)
    osc.start()
    playingOscs[keyNo] = osc
  }
})

document.addEventListener('keyup', (e) => {
  const keyNo = keyMap[e.key]
  if (keyNo !== undefined) {
    const osc = playingOscs[keyNo]
    if (osc !== undefined) {
      osc.stop()
      playingOscs[keyNo] = undefined
    }
  }
})
