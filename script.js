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
let winningNumberDisplay = document.querySelector("#winningNumberDisplay span");

btn.onclick = function() {
    console.log("Button clicked!");
    container.style.transform = "rotate(" + number + "deg)";

    // Hide the winning number display initially
    document.querySelector("#winningNumberDisplay").style.display = 'none';

    setTimeout(function() {
        let effectiveDeg = number % 360;
        let winSegment;

        if (effectiveDeg >= 0 && effectiveDeg < 45) winSegment = 1;
        else if (effectiveDeg >= 45 && effectiveDeg < 90) winSegment = 2;
        else if (effectiveDeg >= 90 && effectiveDeg < 135) winSegment = 3;
        else if (effectiveDeg >= 135 && effectiveDeg < 180) winSegment = 4;
        else if (effectiveDeg >= 180 && effectiveDeg < 225) winSegment = 5;
        else if (effectiveDeg >= 225 && effectiveDeg < 270) winSegment = 6;
        else if (effectiveDeg >= 270 && effectiveDeg < 315) winSegment = 7;
        else if (effectiveDeg >= 315 && effectiveDeg < 360) winSegment = 8;

        winningNumberDisplay.textContent = winSegment;

        // Display the winning number
        document.querySelector("#winningNumberDisplay").style.display = 'block';

    }, 5100);  // A bit more than your CSS transition duration

    number += Math.ceil(Math.random() * 1000);
}