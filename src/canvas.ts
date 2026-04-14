window.addEventListener("DOMContentLoaded", () => {
  //Variables that are important
  let dvdSubtract: number = 5;
  let oldTimeStamp: number = 0;
  let dx: number = 0;
  let dy: number = 0;
  let speedAmt = 0.2;
  let speedX: number = speedAmt;
  let speedY: number = speedAmt;
  let hue: number = 0;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log("Width: " + window.innerWidth);
  console.log("Height: " + window.innerHeight);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const dvd = new Image();
  dvd.src = "../src/assets/dvd-logo.svg";

  dvd.onload = () => {
    function animation(timeStamp: number) {
      console.log(hue);
      let deltaTime = timeStamp - oldTimeStamp;
      oldTimeStamp = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dx = dx + speedX * deltaTime;
      dy = dy + speedY * deltaTime;

      //Calculating movement
      if (dx + dvd.width / dvdSubtract >= canvas.width || dx < 0) {
        randomizeColor();
        speedX = speedX * -1;
      }
      if (dx <= 0 && speedX < 0) {
        dx = 0;
        speedX *= -1;
      }
      if (dy + dvd.height / dvdSubtract >= canvas.height || dy < 0) {
        randomizeColor();
        speedY = speedY * -1;
      }
      if (dy <= 0 && speedY < 0) {
        dy = 0;
        speedY *= -1;
      }

      ctx.filter = `hue-rotate(${hue}deg) saturate(1.5)`;
      ctx.drawImage(
        dvd,
        dx,
        dy,
        dvd.width / dvdSubtract,
        dvd.height / dvdSubtract,
      );
      ctx.filter = "none";

      requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      oldTimeStamp = performance.now();
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dx = 0;
      dy = 0;
      oldTimeStamp = performance.now();
    });
  };

  function randomizeColor() {
    const rValue = Math.round(Math.random() * 360);
    hue = rValue;
  }
});
