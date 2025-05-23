const video = document.getElementById("videoElement");
const canvas = document.getElementById("overlayCanvas");
const ctx = canvas.getContext("2d");

const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const xVal = document.getElementById("xVal");
const yVal = document.getElementById("yVal");

const rectWidth = 384;
const rectHeight = 512;

let rectX = parseInt(xSlider.value);
let rectY = parseInt(ySlider.value);

document.getElementById("videoInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    video.src = URL.createObjectURL(file);
    video.load();
    video.onloadedmetadata = () => {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      video.play();
      drawLoop();
    };
  }
});

xSlider.addEventListener("input", () => {
  rectX = parseInt(xSlider.value);
  xVal.textContent = rectX;
});

ySlider.addEventListener("input", () => {
  rectY = parseInt(ySlider.value);
  yVal.textContent = rectY;
});

function drawLoop() {
  const scaleX = canvas.width / video.videoWidth;
  const scaleY = canvas.height / video.videoHeight;

  function draw() {
    if (video.paused || video.ended) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#3fa9f5";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      rectX * scaleX,
      rectY * scaleY,
      rectWidth * scaleX,
      rectHeight * scaleY
    );

    requestAnimationFrame(draw);
  }

  draw();
}
