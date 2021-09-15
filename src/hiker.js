class Hiker {

  constructor(game) {
    this.game = game;
    this.x = width / 2;
    this.y = height / 2;
    this.index = 0;
    this.color; //color para teñir al mochilero
    this.currentSlide = this.game.slidesHiker[this.index];
  }

  draw() {
    this.color = this.game.hikerColor;
    this.currentSlide = this.game.slidesHiker[this.index]
    this.x = this.game.x_hiker;
    this.y = this.game.y_hiker;

    imageMode(CENTER);
    push();
    tint(this.color);
    image(this.currentSlide, this.x, this.y, this.currentSlide.width, this.currentSlide.height);
    pop();
    this.index++;

    if (this.index >= this.game.slidesHiker.length)
      this.index = 0;
  }
  returnH() {
    return this.currentSlide.height

  }
  returnW() {
    return this.currentSlide.width

  }
  index() {
    return this.index;
  }
  devolverSlideActual() {
    return this.currentSlide

  }
}