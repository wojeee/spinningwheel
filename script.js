const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
const totalItems = items.length;
const sliceAngle = 2 * Math.PI / totalItems;
let currentRotation = 0;

function drawWheel() {
    for(let i = 0; i < totalItems; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, i * sliceAngle, (i+1) * sliceAngle, false);
        ctx.lineTo(200, 200);
        ctx.fillStyle = i % 2 == 0 ? '#FFDD00' : '#FF6600';
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(i * sliceAngle + sliceAngle / 2);
        ctx.fillStyle = '#000';
        ctx.fillText(items[i], 120, 0);
        ctx.restore();
    }
}

function spinWheel() {
    const spins = Math.floor(Math.random() * 10) + 3; 
    const targetRotation = spins * 2 * Math.PI + Math.random() * 2 * Math.PI; 
    animateSpin(currentRotation, targetRotation);
}

function animateSpin(startRotation, targetRotation) {
    const duration = 2000; 
    const startTime = Date.now();

    function animate() {
        const now = Date.now();
        const progress = (now - startTime) / duration;
        if(progress < 1) {
            currentRotation = startRotation + (targetRotation - startRotation) * (progress - progress ** 3 / 2);
            drawWheel();
            requestAnimationFrame(animate);
        } else {
            currentRotation = targetRotation;
            drawWheel();
            displayWinner();
        }
    }

    animate();
}

function displayWinner() {
    const landedItem = Math.floor((totalItems - (currentRotation / sliceAngle) % totalItems) % totalItems);
    document.getElementById('result').textContent = 'Winner: ' + items[landedItem];
}

drawWheel();
