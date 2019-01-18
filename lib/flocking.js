import Boid from './boid';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  let myReq;
  let boid = new Boid();
  boid.createBoids();
  console.log(boid.boids);

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boid.draw(ctx);
    boid.update();
  };

  const animate = () => {
    myReq = requestAnimationFrame(animate);
    update();
  };

  animate();
});
