class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case 'd':
          // Activo/Desactivo el modo Debug
          debug = !debug;
          game.director.render_debug = !game.director.render_debug;
          break;

        case 'r':
          // Activo/Desactivo el renderizado de lluvia 
          game.tripRain = !game.tripRain;
          console.log(`tripRain: ${game.tripRain}`)
          break;

        case 'f':
          // Activo/Desactivo el renderizado de tabanos
          game.flys.create();
          console.log(`making flys`)
          break;

        case 'c':
          // Activo/Desactivo el renderizado de nubes
          game.tripClouds = !game.tripClouds;
          console.log(`tripClouds: ${game.tripClouds}`)
          break;

        case 's':
          // Activo/Desactivo el renderizado de estrellas
          game.tripStars = !game.tripStars;
          console.log(`tripStars: ${game.tripStars}`)
          break;

      }
    });
  }
}