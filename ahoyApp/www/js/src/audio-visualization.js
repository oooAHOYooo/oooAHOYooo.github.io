// Initialize audio context and analyser node
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyserNode = audioContext.createAnalyser();
analyserNode.fftSize = 2048; // Set the FFT size for frequency analysis

// Connect virtual audio device to analyser node
async function connectVirtualAudioToAnalyser() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

        // Assuming the virtual audio device is the first audio input device
        const virtualAudioDeviceId = audioInputDevices[0]?.deviceId;

        if (virtualAudioDeviceId) {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { deviceId: virtualAudioDeviceId }
            });
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyserNode);
        } else {
            console.error('No virtual audio device found.');
        }
    } catch (err) {
        console.error('Error accessing virtual audio device:', err);
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

        // Use the CSS variable for the background color
        const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
        canvasContext.fillStyle = backgroundColor.trim(); // Ensure no extra spaces
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'green');

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = gradient;
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
async function initAudioVisualization() {
    await connectVirtualAudioToAnalyser();
    drawWaveform();
}

// Add event listener for the start button
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-visualization');
    startButton.addEventListener('click', initAudioVisualization);
});