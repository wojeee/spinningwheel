const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
const totalItems = items.length;
const sliceAngle = 2 * Math.PI / totalItems;
let currentRotation = 0;

function adjustCanvasForDPI() {
    const dpi = window.devicePixelRatio;
    const styleWidth = +getComputedStyle(canvas).getPropertyValue("width").slice(0,-2);
    const styleHeight = +getComputedStyle(canvas).getPropertyValue("height").slice(0,-2);
    canvas.setAttribute('width', styleWidth * dpi);
    canvas.setAttribute('height', styleHeight * dpi);
    ctx.scale(dpi, dpi);
}

window.addEventListener('resize', () => {
    adjustCanvasForDPI();
    drawWheel();
});

/* ... rest of the script ... */


function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(currentRotation);
    
    for(let i = 0; i < totalItems; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 200, i * sliceAngle, (i+1) * sliceAngle, false);
        ctx.fillStyle = i % 2 == 0 ? '#FFDD00' : '#FF6600';
        ctx.fill();
        ctx.stroke();

        ctx.save();
        /*ctx.rotate(i * sliceAngle + sliceAngle / 2);*/
        ctx.rotate(currentRotation - sliceAngle/2);
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(items[i], 120, 0);
        ctx.restore();
    }
    
    ctx.restore();
}

function easeOutQuad(t) {
    return t * (2 - t);
}

/*function spinWheel() {
    const spins = Math.floor(Math.random() * 10) + 3; 
    const targetRotation = currentRotation + (spins * 2 * Math.PI + Math.random() * 2 * Math.PI);
    const startRotation = currentRotation;
    const changeInRotation = targetRotation - startRotation;
    const duration = 4000; 
    const startTime = Date.now();

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = easeOutQuad(progress);

        currentRotation = startRotation + easeVal * changeInRotation;

        drawWheel();

        if(progress < 1) {
            requestAnimationFrame(animate);
        } else {
            displayWinner();
        }
    }

    animate();
}*/
function spinWheel() {
    const spins = Math.floor(Math.random() * 10) + 3; 
    const randomOffset = Math.random() * sliceAngle;  // A random offset within a slice
    const finalRotationForWinner = sliceAngle / 2;  // To stop at the middle of a slice
    const targetRotation = currentRotation + spins * 2 * Math.PI + randomOffset - (currentRotation + randomOffset) % sliceAngle + finalRotationForWinner;
    const startRotation = currentRotation;
    const changeInRotation = targetRotation - startRotation;
    const duration = 4000; 
    const startTime = Date.now();

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = easeOutQuad(progress);

        currentRotation = startRotation + easeVal * changeInRotation;

        drawWheel();

        if(progress < 1) {
            requestAnimationFrame(animate);
        } else {
            displayWinner();
        }
    }

    animate();
}


function displayWinner() {
    const landedItem = Math.floor((totalItems - (currentRotation / sliceAngle) % totalItems) % totalItems);
    document.getElementById('result').textContent = 'Winner: ' + items[landedItem];
}

adjustCanvasForDPI();
drawWheel();
