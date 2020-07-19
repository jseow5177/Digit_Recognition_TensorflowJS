import { submitInput } from './api/predict.js';

const drawCanvas = document.getElementById('digit-canvas');
const resultCanvas = document.getElementById('result-canvas');
const submitBtn = document.querySelector('.submit');
const clearBtn = document.querySelector('.clear');

const drawCtx = drawCanvas.getContext('2d');
const resultCtx = resultCanvas.getContext('2d');

const drawBoard = document.getElementById('draw-board');
const drawBoardStyles = getComputedStyle(drawBoard); // Get all the styles of drawBoard

const resultBoard = document.getElementById('result-board');
const resultBoardStyles = getComputedStyle(resultBoard);

drawCanvas.width = parseInt(drawBoardStyles.getPropertyValue('width'));
drawCanvas.height = parseInt(drawBoardStyles.getPropertyValue('height'));

resultCanvas.width = parseInt(resultBoardStyles.getPropertyValue('width'));
resultCanvas.height = parseInt(resultBoardStyles.getPropertyValue('height'));

// Initialize mouse position
const mouse = {
    x: 0,
    y: 0
}

// Calculate mouse position
drawCanvas.addEventListener('mousemove', function (e) {
    // Take mouse position and subtract from the parent div's offset position
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
});

drawCtx.lineWidth = 5;
drawCtx.lineJoin = 'round'; // Create a rounded corner when two lines meet
drawCtx.lineCap = 'round'; // Draw a line with rounded end caps
drawCtx.strokeStyle = 'rgb(13, 152, 186)';

resultCtx.font = "100px Georgia";

drawCanvas.addEventListener('mousedown', function () {
    drawCtx.moveTo(mouse.x, mouse.y); // Move to initial position
    drawCtx.beginPath(); // Begin a path
    drawCanvas.addEventListener('mousemove', onPaint);
});

drawCanvas.addEventListener('mouseup', function () {
  drawCanvas.removeEventListener('mousemove', onPaint);
});

submitBtn.addEventListener('click', function () {
  const img = new Image();
  // async function that runs after image is loaded
  img.onload = async function () {
    drawCtx.drawImage(img, 0, 0, 28, 28); // Draw image at position (0, 0) of canvas. Scale to 28 by 28
    const imgPixels = drawCtx.getImageData(0, 0, 28, 28);
    const input = [];
    // imgData is in the form of rgba. Hence, each pixel has 4 values
    for (let c = 0; c < imgPixels.data.length; c += 4) {
      // Convert img to grayscale by calculating the average of rgb values
      const avgPixel = (imgPixels.data[c] + imgPixels.data[c + 1] + imgPixels.data[c + 2]) / 3;
      input.push(avgPixel / 255.0); // Normalize pixel
    }
    // Send prediction to trained model
    submitInput(input).then(data => {
      if (data && data.error) {
        alert(data.error);
        return;
      } else {
        resultCtx.fillText(`${data.prediction}`, 150, 200);
      }
    })
  }
  img.src = drawCanvas.toDataURL('image/png');
});

clearBtn.addEventListener('click', function () {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  resultCtx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
});

function onPaint() {
    drawCtx.lineTo(mouse.x, mouse.y);
    drawCtx.stroke();
}
