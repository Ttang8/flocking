import Boid from './boid';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  let ctxH = canvas.height;
  let ctxW = canvas.width;

  const backgroundImage = new Image();
  backgroundImage.src = './assets/images/sky_background.jpg';

  const drawBg = () => {
    ctx.drawImage(backgroundImage,0,0,ctxW,ctxH);
  };

  let myReq;
  let flock = [];
  let numBoids = 100;
  let mouseX;
  let mouseY;
  let lastTime = 0;
  let deltaTime;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.onload = () => {
    drawBg();
  };

  for(let i=0; i < numBoids; i++) {
    flock.push(new Boid(ctxW,ctxH));
  }

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBg();
    flock.forEach(boid => {
      boid.draw(ctx);
      boid.alignment(flock);
      boid.cohesion(flock);
      boid.separation(flock);
      boid.avoidMouse(mouseX,mouseY);
      boid.update(deltaTime);
    });
  };

  const animate = (time = 0) => {
    deltaTime = time - lastTime;
    lastTime = time;
    myReq = requestAnimationFrame(animate);
    update();
  };

  animate();
});
