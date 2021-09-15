class FlysUnit {
  constructor() {
    this.margin = 50;
    this.x = random(-this.margin, this.margin);
    this.y = random(-this.margin, this.margin);
    this.kill = false;
    this.life = int(random(100, 500));

    this.side = int(random(0, 3));

    if (this.side == 0) {
      this.x = random(0 - this.margin, width + this.margin);
      this.y = random(0 - this.margin, 0);
    } else if (this.side == 1) {
      this.x = random(width, width + this.margin);
      this.y = random(0 - this.margin, height + this.margin);
    } else if (this.side == 2) {
      this.x = random(0, 0 - this.margin);
      this.y = random(0 - this.margin, height + this.margin);
    }

    this.location = createVector(this.x, this.y);
    this.velocity = createVector(0, 0);
    this.topspeed = 15;
    this.x_target;
    this.y_target;
    this.location;
    this.acceleration;
  }

  update(x_target_, y_target_) {

    this.x_target = x_target_;
    this.y_target = y_target_;

    this.life--;

    if (this.life < 0) this.kill = true;

    let variancia = 100;
    let target = createVector(this.x_target + random(-variancia, variancia), this.y_target + random(-variancia, variancia));
    let dir = target.sub(this.location);

    dir.normalize();

    dir.mult(4);

    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
  }

  draw() {
    noStroke();
    fill("#A62F01");
    ellipse(this.location.x + 2, this.location.y, 4, 4);
    fill("#201910");
    ellipse(this.location.x, this.location.y, 4, 4);
  }
}