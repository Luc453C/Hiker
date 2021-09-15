class RainUnit {

  constructor() {

    this.x = random(width + 200);
    this.y = random(-500, 0);
    this.dir = radians(random(100, 90));
    this.vel = random(15, 20);
    this.kill = false;

    this.x_record = Array.from({length: 5}, (v, i) => i);
    this.y_record = Array.from({length: 5}, (v, i) => i);

    for (let i = 0; i < this.x_record.length; i++) {
      this.x_record[i] = this.x;
      this.x_record[i] = this.y;
    }
  }

  update() {

    for (let i = this.x_record.length - 1; i > 0; i--) {
      this.x_record[i] = this.x_record[i - 1];
      this.y_record[i] = this.y_record[i - 1];
    }

    this.x_record[0] = this.x;
    this.y_record[0] = this.y;

    this.x += this.vel * cos(this.dir);
    this.y += this.vel * sin(this.dir);

    if (this.y > height)
      this.kill = true;
  }

  draw() {
    push();
    let c = color('rgba(224, 245, 255, 0.5)');
    for (let i = 1; i < this.x_record.length; i++) {
      stroke(c, map(i, 0, this.x_record.length, 150, 0));
      line(this.x_record[i], this.y_record[i], this.x_record[i - 1], this.y_record[i - 1]);
    }
    pop();
  }
}