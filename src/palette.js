class Palette {

  constructor(img_) {
    this.img = img_;
    this.colors = [];
    this.size;
    this.id = "id";
    this.process();
  }

  process() {
    for (let i = 0; i < this.img.width; i++) {
      let aux = this.img.get(i, 0);
      this.colors.push(aux);
    }
    this.size = this.colors.length;
  }

  getColorsAmount() {
    return this.size;
  }

  getColorAtIndex(i) {
    if (i<this.colors.length)
      return this.colors[i];
    else
      return color(0);
  }

  getColors() {
    return this.colors;
  }

  getId() {
    return this.id;
  }

  setId(id_) {
    this.id = id_;
  }
}
