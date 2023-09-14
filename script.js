const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const data = Array(6).fill(16);
const pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"];
/*const values = [1, 2, 3, 4, 5, 6];*/
const values = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig"];  // Changed from numbers to words


let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: values,
    datasets: [{
      backgroundColor: pieColors,
      data: data,
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const getSegmentFromDegree = (degree) => {
  let segments = data.length;
  let segmentAngle = 360 / segments;
  for (let i = 0; i < segments; i++) {
    if (degree >= i * segmentAngle && degree < (i + 1) * segmentAngle) {
      return values[i];
    }
  }
  return null;
};

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  
  let totalRotations = 5 * 360; // 5 complete rotations for dramatic effect
  let randomDegree = Math.floor(Math.random() * 360);
  let endRotation = totalRotations + randomDegree;

  let currentRotation = 0;
  let increment = 10;

  const rotationInterval = setInterval(() => {
    currentRotation += increment;
    
    myChart.options.rotation = currentRotation;
    myChart.update();

    if (currentRotation >= endRotation) {
      clearInterval(rotationInterval);
      let segmentValue = getSegmentFromDegree(randomDegree);
      finalValue.innerHTML = `<p>Value: ${segmentValue}</p>`;
      spinBtn.disabled = false;
    }
  }, 10);
});
