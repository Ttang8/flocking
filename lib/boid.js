class Boid {
  constructor(props) {

    this.state = {
    };
    this.boids = [];
    this.numberOfBoids = 10;
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

}

export default Boid;
