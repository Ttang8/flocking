import Boid from './boid';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  let myReq;
  let flock = [];
  let numBoids = 500;

  for(let i=0; i < numBoids; i++) {
    flock.push(new Boid());
  }

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flock.forEach(boid => {
      boid.draw(ctx);
      boid.update();
      boid.alignment(flock);
    });
  };

  const animate = () => {
    myReq = requestAnimationFrame(animate);
    update();
  };

  animate();
});
