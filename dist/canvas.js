window.addEventListener("DOMContentLoaded", () => {
    //Variables that are important
    let dvdSubtract = 6;
    let oldTimeStamp = 0;
    let dx = 0;
    let dy = 0;
    let speedX = 0.2;
    let speedY = 0.2;
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Width: " + window.innerWidth);
    console.log("Height: " + window.innerHeight);
    const ctx = canvas.getContext("2d");
    const dvd = new Image();
    dvd.src = "../src/assets/dvd-logo.png";
    dvd.onload = () => {
        function animation(timeStamp) {
            let deltaTime = timeStamp - oldTimeStamp;
            oldTimeStamp = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dx = dx + speedX * deltaTime;
            dy = dy + speedY * deltaTime;
            //Calculating movement
            if (dx + dvd.width / dvdSubtract >= canvas.width || dx < 0) {
                speedX = speedX * -1;
            }
            if (dx <= 0 && speedX < 0) {
                dx = 0;
                speedX *= -1;
            }
            if (dy + dvd.height / dvdSubtract >= canvas.height || dy < 0) {
                speedY = speedY * -1;
            }
            if (dy <= 0 && speedY < 0) {
                dy = 0;
                speedY *= -1;
            }
            ctx.drawImage(dvd, dx, dy, dvd.width / dvdSubtract, dvd.height / dvdSubtract);
            requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
        document.addEventListener("visibilitychange", () => {
            if (document.hidden)
                return;
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
});
export {};
//# sourceMappingURL=canvas.js.map