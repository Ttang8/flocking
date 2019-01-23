class Boid {
  constructor() {
    this.positionX = Math.random() * 1400;
    this.positionY = Math.random() * 600;
    this.velocity = [(Math.random() * 6) - 3, (Math.random() * 6) - 3];
    this.speed = 0.1;
    this.maxVelocity = this.maxVelocity.bind(this);
  }

  draw(ctx) {
    ctx.fillRect(this.positionX, this.positionY, 10, 10);
  }

  alignment(boids) {
    let localDetection = 50;
    let average = [0,0];
    let total = 0;
    boids.forEach(boid => {
      let disX = this.positionX - boid.positionX;
      let disY = this.positionY - boid.positionY;
      let distance = Math.sqrt(disX*disX + disY*disY);
      if(boid !== this && distance < localDetection) {
        average[0] += boid.velocity[0];
        average[1] += boid.velocity[1];
        total ++;
      }
    });
    if(total > 0) {
      average[0] /= total;
      average[1] /= total;
      this.velocity[0] = this.velocity[0] + (average[0] - this.velocity[0]);
      this.velocity[1] = this.velocity[1] + (average[1] - this.velocity[1]);
    }
  }

  cohesion(boids) {
    let localDetection = 50;
    let average = [0,0];
    let total = 0;
    boids.forEach(boid => {
      let disX = this.positionX - boid.positionX;
      let disY = this.positionY - boid.positionY;
      let distance = Math.sqrt(disX*disX + disY*disY);
      if(boid !== this && distance < localDetection) {
        average[0] += boid.positionX;
        average[1] += boid.positionY;
        total ++;
      }
    });
    if(total > 0) {
      average[0] /= total;
      average[1] /= total;
      // console.log((average[0] - this.positionX)/localDetection * 0.2);
      this.velocity[0] = this.velocity[0] + (average[0] - this.positionX)/localDetection;
      this.velocity[1] = this.velocity[1] + (average[1] - this.positionY)/localDetection;
      this.velocity[0] = this.maxVelocity(this.velocity[0]);
      this.velocity[1] = this.maxVelocity(this.velocity[1]);
      // console.log(this.velocity);
    }
  }

  separation(boids) {
    let localDetection = 10;
    let c = [0,0];
    boids.forEach(boid => {
      let disX = this.positionX - boid.positionX;
      let disY = this.positionY - boid.positionY;
      let distance = Math.sqrt(disX*disX + disY*disY);
      if(boid !== this && distance < localDetection) {
        c[0] = c[0] - (boid.positionX - this.positionX);
        c[1] = c[1] - (boid.positionY - this.positionY);
        this.velocity[0] = this.velocity[0] + c[0]/distance;
        this.velocity[1] = this.velocity[1] + c[1]/distance;
        this.velocity[0] = this.maxVelocity(this.velocity[0]);
        this.velocity[1] = this.maxVelocity(this.velocity[1]);
      }
    });
  }

  maxVelocity(velocity) {
    if(velocity > 3) {
      velocity = velocity / 3;
    } else if (velocity < -3) {
      velocity = velocity / 3;
    }
    return velocity;
  }

  avoidMouse(x,y){
    let localDetection = 100;
    let c = [0,0];
      let disX = this.positionX - x;
      let disY = this.positionY - y;
      let distance = Math.sqrt(disX*disX + disY*disY);
      if(distance < localDetection) {
        c[0] = c[0] - (x - this.positionX);
        c[1] = c[1] - (y - this.positionY);
        this.velocity[0] = this.velocity[0] + c[0]/distance;
        this.velocity[1] = this.velocity[1] + c[1]/distance;
        this.velocity[0] = this.maxVelocity(this.velocity[0]);
        this.velocity[1] = this.maxVelocity(this.velocity[1]);
      }
  }

  update() {
      if(this.positionX > 1350) {
        // this.positionX = 0;
        this.velocity[0] += -1 * (1400 - this.positionX)/25;
      }
      if(this.positionX < 50) {
        this.velocity[0] += this.positionX/25;
      }
      if(this.positionY > 550) {
        this.velocity[1] += -1 * (600 - this.positionY)/25;
      }
      if(this.positionY < 50) {
        this.velocity[1] += this.positionY/25;
      }
      this.positionX += this.velocity[0];
      this.positionY += this.velocity[1];
  }
}

export default Boid;
