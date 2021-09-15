class Hill {
  
  constructor(bg_) {
    this.bg = bg_;
    this.x = width/2;
    this.y = height/2;

    this.vel;
  }

  move(vel_) {
    this.vel = vel_;
    this.x -= this.vel;
    if (this.x < -width/2) { //arreglar
      this.x = width/2;
    }
  }

  draw(tint) {
    this.bg(tint, this.x);
    this.bg(tint, this.x + width); // arreglar
    this.bg(tint, this.x - width); // arreglar
  }
}

