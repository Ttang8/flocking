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
        y: Math.random() * 600,
        velocity: [(Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5]
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
      if(boid.x < 0) {
        boid.x = 1400;
      }
      if(boid.y > 600) {
        boid.y = 0;
      }
      if(boid.y < 0) {
        boid.y = 600;
      }
      boid.x += boid.velocity[0];
      boid.y += boid.velocity[1];
    });
  }

}

export default Boid;
