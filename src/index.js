let GAME_WIDTH;
let GAME_HEIGHT;

let game;

let canvas;

let ctx;

let palettesList;

let slidesHiker = [];

let debug = false;


//**************************************************

function preload() {

  palettesList = {
    "dia": loadImage("./palettes/dia.png"),
    "atardecer": loadImage("./palettes/atardecer.png"),
    "noche": loadImage("./palettes/noche.png"),
    "otoño": loadImage("./palettes/otoño.png"),
    "bosque": loadImage("./palettes/bosque.png")
  };

  // cargo los slides del mochilero
  for (let i = 0; i < 35; i++) {
    let fileName = "./slides/Hiker_" + nf(i + 1, 4) + "-01.png";
    slidesHiker[i] = loadImage(fileName);
    slidesHiker[i].resize(0, int(0.5 * slidesHiker[i].height));
  }

}

//**************************************************

function setup() {

  GAME_WIDTH = windowWidth;
  GAME_HEIGHT = windowHeight;

  //createCanvas(1200, 600, WEBGL);
  //canvas = createCanvas(2090, 769, P2D);
  canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);

  ctx = canvas.elt.getContext('2d')

  frameRate(30);
  imageMode(CENTER);

  game = new Game(GAME_WIDTH, GAME_HEIGHT);

  game.setup();

}

//**************************************************

function draw() {

  game.draw();

}

//**************************************************

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
