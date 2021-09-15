class Game {
  constructor(gameWidth_, gameHeight_) {
    this.gameWidth = gameWidth_;
    this.gameHeight = gameHeight_;

    new InputHandler(this);

    // Lista de objetos
    this.objectList = [];

    // paletas de colores
    this.palettesList = palettesList;

    //variables para las nubes
    this.clouds;
    this.cloudColor;
    this.tripClouds = false;

    //variables para Tabanos
    this.flys;
    this.tripFlys = true;
    this.flyTarget_x;
    this.flyTarget_y;

    //variables para lluvia
    this.rain;
    this.tripRain = false;
    this.rainColor;

    //variables para estrellas
    this.stars;
    this.tripStars = true;

    //variables para el mochilero
    this.slidesHiker = slidesHiker;
    this.hiker;
    this.x_hiker;
    this.y_hiker;
    this.hikerColor;

    //Variables para sol/luna
    this.sun;
    this.moon;
    this.sun_x;
    this.sun_y;

    //variables del escenario
    this.img_bg = Array.from({
      length: 7
    }, (v, i) => i);
    this.bgList = [];

    this.director;

    this.y_floor;
    this.y_bg_offset;
    this.y_img_offset;

    //fuente
    this.f;
    this.f_small;

    this.lastStage;

  }


  setup() {

    this.f = loadFont("./fonts/ARACNE-CONDENSED_light.otf");
    this.f_small = loadFont("./fonts/ARACNE-CONDENSED_light.otf");
    textFont('Helvetica'); // fijo la fuente

    this.sun = new Sun(this); // creo un objeto Sun
    this.moon = new Moon(this); // creo un objeto Moon
    this.hiker = new Hiker(this); // creo un objeto Hiker

    this.x_hiker = this.gameWidth / 2;
    this.y_hiker = this.gameHeight * 2 / 3;
    this.y_floor = this.y_hiker + this.hiker.returnH() / 2 - 0.05 * this.gameHeight;
    this.y_bg_offset = this.gameHeight - this.y_floor;
    this.y_img_offset = this.hiker.returnH() / 2;

    //variables para el enjambre de tabanos
    this.flyTarget_x = this.x_hiker;
    this.flyTarget_y = this.y_hiker - this.hiker.returnH() / 3;


    this.director = new ColorDirector(6); //paletas de 6 colores
    this.director.setFont(this.f);
    this.director.setSmallFont(this.f_small);
    this.director.loadPalette(palettesList);

    this.director.addStage("dia", 10000);
    this.director.addStage("noche", 10000);
    this.director.addStage("atardecer", 10000);
    this.director.addStage("noche", 10000);
    this.director.addStage("otoño", 10000);
    this.director.addStage("noche", 10000);
    this.director.addStage("bosque", 10000);
    this.director.addStage("noche", 10000);

    this.director.setTransitionTime(4000);
    this.director.setLoop();
    this.director.start();

    this.sky = new Sky(this);
    this.hills = new Hills(this);
    this.floor = new Floor(this);
    this.rain = new Rain(this);
    this.stars = new Stars(this);
    this.clouds = new Clouds(this);
    this.flys = new Flys(this);

    this.objectList = [
      this.sky,
      this.stars,
      this.moon,
      this.sun,
      this.clouds,
      this.hills,
      this.floor,
      this.hiker,
      this.rain,
      this.flys
    ]
  }

  draw() {
    background(255);
    updateSun(this);
    //animateSun();

    this.color0 = this.director.getCurrentColorAtIndex(0)
    this.color1 = this.director.getCurrentColorAtIndex(1);
    this.color2 = lerpColor(color(this.director.getCurrentColorAtIndex(1)), color(this.director.getCurrentColorAtIndex(2)), 0.5)
    this.color3 = this.director.getCurrentColorAtIndex(2);
    this.color4 = this.director.getCurrentColorAtIndex(3);
    this.color5 = this.director.getCurrentColorAtIndex(4);
    this.color6 = lerpColor(color(this.director.getCurrentColorAtIndex(4)), color(this.director.getCurrentColorAtIndex(5)), 0.5);
    this.color7 = this.director.getCurrentColorAtIndex(5);

    this.hikerColor = this.color1;
    this.cloudColor = this.color3;
    this.rainColor = this.color4;

    for (let i = 0; i < this.objectList.length; i++) {
      this.objectList[i].draw();
    }

    /*this.sky.draw();
    this.stars.draw();
    this.moon.draw();
    this.sun.draw();
    this.clouds.draw();
    this.hills.draw();
    this.floor.draw();
    this.hiker.draw();
    this.rain.draw();
    this.flys.draw();*/

    drawShadow(this);
    this.director.update();

    this.lastStage = this.director.getCurrentStage();
  }
}