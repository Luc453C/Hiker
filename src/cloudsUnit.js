class CloudsUnit {

  constructor () {

  this.imgCloudList = Array.from({length: 5}, (v, i) => i);
  this.cloud;
  this.index;
  this.op;
  this.vel;
  this.x;
  this.y;
  this.kill;
  
    for (let i = 0; i < this.imgCloudList.length; i++) {

      let fileName = "../clouds/nube_" + nf(i+1, 2) + ".png";

      this.imgCloudList[i] = loadImage(fileName);
      
    }
    this.index = int(random(this.imgCloudList.length));
    this.cloud = this.imgCloudList[this.index];
    this.cloud.resize(int(random(100,300)),0);
    this.x = random(width, width*5/4);
    this.y = random(height/3);
    this.op = random(10, 50);
    this.kill = false;
  }

  move() {
    this.vel = random(0.5, 1.5);
    this.x -= this.vel;

    if (this.x < - width/4)
      this.kill = true;
  }

  draw(tinta) {
    push();
    tint(tinta, this.op);
    image(this.cloud, this.x, this.y);
    pop();
  }
}