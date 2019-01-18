class Boid {
  constructor(props) {

    this.state = {
    };
    this.boids = [];
    this.numberOfBoids = 100;
  }

  createBoids() {
    let i = 0;
    while(i < this.numberOfBoids) {
      this.boids.push({
        x: Math.random() * 1400,
        y: Math.random() * 600
      });
      i++;
    }
  }

  draw(ctx) {
    this.boids.forEach(boid => {
      ctx.fillRect(boid.x, boid.y, 10, 10);
    });
  }

  update() {
    this.boids.forEach(boid => {
      if(boid.x > 1400) {
        boid.x = 0;
      }
      if(boid.y > 600) {
        boid.y = 0;
      }
      boid.x += Math.random() * 6;
      boid.y += Math.random() * 6;
    });
  }

}

export default Boid;
