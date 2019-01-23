import Boid from './boid';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  let myReq;
  let flock = [];
  let numBoids = 300;
  let mouseX;
  let mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    console.log(mouseX,mouseY);
  });

  for(let i=0; i < numBoids; i++) {
    flock.push(new Boid());
  }

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flock.forEach(boid => {
      boid.draw(ctx);
      boid.alignment(flock);
      boid.cohesion(flock);
      boid.separation(flock);
      boid.avoidMouse(mouseX,mouseY);
      boid.update();
    });
  };

  const animate = () => {
    myReq = requestAnimationFrame(animate);
    update();
  };

  animate();
});
