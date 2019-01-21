class Boid {
  constructor() {
    this.positionX = Math.random() * 1400;
    this.positionY = Math.random() * 600;
    this.velocity = [(Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5];
  }

  draw(ctx) {
    ctx.fillRect(this.positionX, this.positionY, 10, 10);
  }

  alignment(boids) {
    let localDetection = 15;
    let average = [0,0];
    let total = 0;
    boids.forEach(boid => {
      let distance = Math.sqrt(Math.pow((this.positionX - boid.positionX),2) + Math.pow((this.positionY - boid.positionY),2));
      if(boid != this && distance < localDetection) {
        average[0] += boid.velocity[0];
        average[1] += boid.velocity[1];
        total ++;
      }
    });
    if(total > 0) {
      average[0] /= total;
      average[1] /= total;
      average[0] -= this.velocity[0];
      average[1] -= this.velocity[1];
      this.velocity[0] += average[0];
      this.velocity[1] += average[1];
    }
  }

  update() {
      if(this.positionX > 1400) {
        this.positionX = 0;
      }
      if(this.positionX < 0) {
        this.positionX = 1400;
      }
      if(this.positionY > 600) {
        this.positionY = 0;
      }
      if(this.positionY < 0) {
        this.positionY = 600;
      }
      this.positionX += this.velocity[0];
      this.positionY += this.velocity[1];
  }
}

export default Boid;
