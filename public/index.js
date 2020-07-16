const canvas = document.getElementById('digit-canvas');

const ctx = canvas.getContext('2d');
const drawBoard = document.getElementById('draw-board');
const drawBoardStyles = getComputedStyle(drawBoard); // Get all the styles of drawBoard

canvas.width = parseInt(drawBoardStyles.getPropertyValue('width'));
canvas.height = parseInt(drawBoardStyles.getPropertyValue('height'));

// Initialize mouse position
const mouse = {
    x: 0,
    y: 0
}

// Calculate mouse position
canvas.addEventListener('mousemove', function (e) {
    // Take mouse position and subtract from the parent div's offset position
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
});

ctx.lineWidth = 5;
ctx.lineJoin = 'round'; // Create a rounded corner when two lines meet
ctx.lineCap = 'round'; // Draw a line with rounded end caps
ctx.strokeStyle = '#0000FF';

canvas.addEventListener('mousedown', function () {
    ctx.moveTo(mouse.x, mouse.y); // Move to click position
    ctx.beginPath(); // Begin a path
    canvas.addEventListener('mousemove', onPaint);
});

canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint);
    const img = new Image();
    img.onload = async function () {
        ctx.drawImage(img, 0, 0, 28, 28); // Draw image on canvas. Scale down image to 28 by 28
        const imgData = ctx.getImageData(0, 0, 28, 28).data;
        const input = [];
        // Data is in the form of rgba
        // Since the canvas is drawn with blue color, we need to extract the data in the third channel only (think 0 to 255 as grayscale)
        for (let c = 0; c < imgData.length; c += 4) {
            input.push(imgData[c + 2] / 255);
        }
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: input
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data && data.error) {
                alert(data.error);
            } else {
                console.log(data.prediction);
            }
        });
    }
    img.src = canvas.toDataURL('image/png');
});

function onPaint() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
}