class Boid {
  constructor(width, height) {
    this.canvasW = width;
    this.canvasH = height;
    this.positionX = Math.random() * this.canvasW;
    this.positionY = Math.random() * this.canvasH;
    this.velocity = [(Math.random() * 6) - 3, (Math.random() * 6) - 3];
    this.speed = 0.1;
    this.execute = 0;
    this.frame = Math.floor((Math.random() * 3) + 1);
    this.bird = new Image();
    this.bird.src = './assets/images/bird.png';
    this.maxVelocity = this.maxVelocity.bind(this);

    //position 1: 50,0
    //position 2:780,0 sw: 670
    //position 3: 0,800
    this.data ={
      sx: 0,
      sy: 0,
      sw: 700,
      sh: 670,
      cx: this.positionX,
      cy: this.positionY,
      dw: 50,
      dh: 50
    };
  }

  draw(ctx) {
    if(this.velocity[0] < 0) {
      ctx.save();
      ctx.scale(-1,1);
      ctx.translate(-this.canvasW, 0);
      ctx.drawImage(this.bird, this.data.sx, this.data.sy,
        this.data.sw, this.data.sh,this.canvasW - 50 - this.positionX, this.positionY, this.data.dw, this.data.dh
      );
      ctx.restore();
    } else {
      ctx.save();
      // ctx.scale(1,1);
      // ctx.translate(this.canvasW,0);
      ctx.drawImage(this.bird, this.data.sx, this.data.sy,
        this.data.sw, this.data.sh,this.positionX, this.positionY, this.data.dw, this.data.dh
      );
      ctx.restore();
    }
  }

  alignment(boids,detectionRadius = 50) {
    let localDetection = detectionRadius;
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

  cohesion(boids,detectionRadius = 50) {
    let localDetection = detectionRadius;
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

  separation(boids,detectionRadius = 30) {
    let localDetection = detectionRadius;
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

  update(deltaTime) {
    this.execute += deltaTime;
    if(this.positionX > this.canvasW-50) {
      // this.positionX = 0;
      this.velocity[0] += -1 * (this.canvasW - this.positionX)/10;
    }
    if(this.positionX < 50) {
      this.velocity[0] += this.positionX/10;
    }
    if(this.positionY > this.canvasH-50) {
      this.velocity[1] += -1 * (this.canvasH - this.positionY)/10;
    }
    if(this.positionY < 50) {
      this.velocity[1] += this.positionY/20;
    }
    if (this.execute > 300) {
      if(this.frame === 1){
        this.data.sx = 0;
        this.data.sy = 0;
        this.frame += 1;
      } else if (this.frame === 2) {
        this.data.sx = 780;
        this.data.sy = 0;
        this.frame += 1;
      } else if (this.frame === 3) {
        this.data.sx = 0;
        this.data.sy = 800;
        this.frame = 1;
      }
    }
    if (this.execute > 300) {
      this.execute = 0;
    }
    this.positionX += this.velocity[0];
    this.positionY += this.velocity[1];
  }
}

export default Boid;
