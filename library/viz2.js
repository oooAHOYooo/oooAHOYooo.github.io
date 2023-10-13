
const audio = document.getElementById("audio");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let audioContext;
let analyser;
let source;
let dataArray;

function initialize() {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
}

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < dataArray.length; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = dataArray[i] / 10;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

audio.addEventListener("play", () => {
  if (!audioContext) {
    initialize();
  }
});
