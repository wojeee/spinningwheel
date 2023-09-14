/*let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);

/*btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}*/
/*btn.onclick = function () {
    console.log("Button clicked!");  // This should print in the console when the button is clicked
    container.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 1000);
}*/

let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);
let winningNumberDisplay = document.getElementById("winningNumber");

btn.onclick = function() {
    console.log("Button clicked!");
    container.style.transform = "rotate(" + number + "deg)";

    // Once the transition is over, calculate the winning number
    container.addEventListener("transitionend", function() {
        let effectiveDeg = number % 360;
        let winSegment = Math.floor(effectiveDeg / 45);  // Find the segment index
        let winningNumbers = [8, 1, 2, 3, 4, 5, 6, 7];   // Arranged based on rotation & segment
        winningNumberDisplay.textContent = winningNumbers[winSegment];
    });

    number += Math.ceil(Math.random() * 1000);
}

