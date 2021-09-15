function drawShadow(game) {
  if (debug) { // si estoy en modo debug, dibujo una caja naranja alrededor de la animación
    push();
    rectMode(CENTER);
    strokeWeight(3);
    stroke(255, 128, 0);
    noFill();
    rect(game.x_hiker, game.y_hiker, game.hiker.returnW(), game.hiker.returnH() );
    // y dibujo una elipse roja en el punto que uso para calcular el ángulo del sol
    fill(255, 0, 0);
    noStroke();
    ellipse(game.x_hiker, game.y_hiker +  game.y_img_offset, 10, 10);
    pop();
  }

  // calculo el ángulo del sol, y armo una versión del ángulo en función de la vertical (ang_abs)
  let ang_sun = atan2(game.y_hiker +  game.y_img_offset - game.sun_y, game.x_hiker - game.sun_x); 
  let ang_abs = abs(90- int(degrees(game.ang_sun)));

  if (debug) {// si estoy en modo debug, dibujo una línea que indica el ángulo entre el sol y el personaje, 
    //  y además dibujo los dos ángulos como texto en pantalla
    push();
    translate(game.sun_x, game.sun_y);
    rotate(ang_sun);
    fill(0);
    textSize(30);
    text("|" +  int(degrees(ang_sun) )+ "°" + "| abs: " + ang_abs +"°"  + "|", 50, 25);
    stroke(0);
    let line_length = dist(game.sun_x, game.sun_y, game.x_hiker, game.y_hiker +  game.y_img_offset);
    line(0, 0, line_length, 0);
    pop();
  }

  //creo un arreglo de PVectors de cuatro posiciones, para guardar las coordenadas del polígono de la sombra
  let shadow_vertices = [];

  //calculo los dos primeros vértices
  shadow_vertices[0] = createVector(game.x_hiker - game.hiker.returnW()/2, game.y_hiker + game.hiker.returnH()/2 );
  shadow_vertices[1] = createVector(game.x_hiker + game.hiker.returnW()/2, game.y_hiker + game.hiker.returnH()/2 );
  //calculo el largo de la sombra, que es proporcional al ángulo absoluto
  let rad = map( ang_abs, 0, 90, game.hiker.returnH() * 0.8, game.hiker.returnH() * 2.5); 

  // fijo un offset en grados para el ángulo, para que los lados de la sombra no sean paralelos, 
  // sino que se abran a medida que se alejan del personale
  let angle_offset = radians(5);

  //calculo y cargo los otros dos vértices de la sombra (los que están más lejos del suelo)

  let dx_left = cos(ang_sun + angle_offset) * rad;
  let dy_left = sin(ang_sun + angle_offset) * rad;

  let dx_right = cos(ang_sun - angle_offset) * rad;
  let dy_right = sin(ang_sun - angle_offset) * rad;

  shadow_vertices[2] = createVector(shadow_vertices[1].x + dx_right, shadow_vertices[1].y + dy_right);
  shadow_vertices[3] = createVector(shadow_vertices[0].x + dx_left, shadow_vertices[0].y + dy_left);

  // empiezo a crear el polígono texturado de la sombra
  push();
  beginShape();
  // tiño la sombra de negro, con opacidad de 120
  tint(0, 0, 0, 120);
  // cargo el cuadro de animación actual como textura del polígono que voy a empezar a definir
  //texture(M.devolverSlideActual());
  // fijo el modo de textura como NORMAL (esto es, valores de 0 a 1)
  //textureMode(NORMAL);
  noStroke();
  noFill();
  if (debug) { // si estoy en modo debug, dibujo la sombra con un recuadro naranja
    strokeWeight(3);
    stroke(255, 128, 0);
  }

  // creo los vértices de la sombra, con su correspondiente coordenada normalizada de textura
  vertex(shadow_vertices[0].x, shadow_vertices[0].y);
  vertex(shadow_vertices[1].x, shadow_vertices[1].y);
  vertex(shadow_vertices[2].x, shadow_vertices[2].y);
  vertex(shadow_vertices[3].x, shadow_vertices[3].y);
/*
  vertex(shadow_vertices[0].x, shadow_vertices[0].y, 0, 1);
  vertex(shadow_vertices[1].x, shadow_vertices[1].y, 1, 1);
  vertex(shadow_vertices[2].x, shadow_vertices[2].y, 1, 0);
  vertex(shadow_vertices[3].x, shadow_vertices[3].y, 0, 0);
*/
  // cierro el polígono de la sombra
  endShape(CLOSE);
  noTint();
  pop();
  // apago la tintura, revierto las modificaciones de estilo por las dudas, y listo.
}

function updateSun(game) {
  // función para actualizar el sol en función de la posición del mouse
  game.sun_x = mouseX;  // pongo el sol adonde esté el mouse
  game.sun_y = mouseY;
  game.sun_y = constrain(game.sun_y, 0, game.y_floor - 20);  // no permito que el sol baje más alla del suelo (o el horizonte)
}

function animateSun(game) {  
  //función para hacer que el sol orbite alrededor del centro de la pantalla
  let rad_orbit = 600;
  let ang_sun = radians((-frameCount % -300));
  game.sun_x = game.gameWidth/2 + cos(ang_sun)*rad_orbit ;
  game.sun_y = game.gameHeight + 50 + sin(ang_sun)*rad_orbit ;
  game.sun_y = constrain(game.sun_y, -game.gameHeight, game.y_floor + 20);  // no permito que el sol baje más alla del suelo (o el horizonte)
}