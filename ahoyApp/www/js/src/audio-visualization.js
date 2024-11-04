// Initialize audio context and analyser node
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyserNode = audioContext.createAnalyser();
analyserNode.fftSize = 2048; // Set the FFT size for frequency analysis

// Connect audio element to analyser node
function connectAudioElementToAnalyser(audioElementId) {
    const audioElement = document.getElementById(audioElementId);
    if (audioElement) {
        const track = audioContext.createMediaElementSource(audioElement);
        track.connect(analyserNode);
        analyserNode.connect(audioContext.destination);
    }
}

// Function to draw the waveform
function drawWaveform() {
    const canvas = document.getElementById('audio-visualization');
    const canvasContext = canvas.getContext('2d');
    const bufferLength = analyserNode.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyserNode.getByteTimeDomainData(dataArray);

        canvasContext.fillStyle = 'rgb(200, 200, 200)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        canvasContext.beginPath();

        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    }

    draw();
}

// Initialize visualization
function initAudioVisualization(audioElementId) {
    connectAudioElementToAnalyser(audioElementId);
    drawWaveform();
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    initAudioVisualization('musicAudioPlayer');
});