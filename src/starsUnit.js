class StarsUnit {

  constructor(x_, y_) {
    this.x= x_;
    this.y = y_;
    this.diam = 3;
    this.colorStar = lerpColor(color("#64888C"), color("#E0F5FF"), random(0, 1));
    this.opacity;
  }

  draw() {
    push();
    fill(this.colorStar, this.opacity);
    noStroke();
    ellipse(this.x, this.y, this.diam, this.diam);
    pop();
    this.opacity = map(this.y, 0, height/2, 200, 20);
  }

  changeSize() {
    this.diam = random(1, 6);
  }
}