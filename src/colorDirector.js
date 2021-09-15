class ColorDirector {

  constructor(palette_size_) {
    this.palette_size = palette_size_;
    this.p = [];
    this.palettes_indexes = [];
    this.palettes_times = [];
    this.stage_ids = [];
    this.current_palette = Array.from({length: this.palette_size}, (v, i) => i);
    this.loop = false;
    this.transition_time = 800;
    this.running = false;
    this.prev_frame_time = 0;
    this.lerp_direction = "";
    this.render_debug = false;
    this.total_time = 0;
    this.stages = 0;
    this.lerp_factor = 0.5;
  }

  //••••••••••••••••••••••••••••••


  loadPalette(palettesList) {
    for (let key in palettesList) {
      let img_aux = palettesList[key]
      let aux = new Palette(img_aux);
      aux.setId(key);
      this.p.push(aux);
    }
  }

  //••••••••••••••••••••••••••••••

  getCurrentColors() {
    return this.current_palette;
  }

  //••••••••••••••••••••••••••••••

  getCurrentColorAtIndex(i) {
    if (i < this.palette_size )
      return this.current_palette[i];
    else {
      print("ERROR: el índice (" + i + ") es más grande que el tamaño de la paleta(" + this.palette_size + ")" );
      return color(0);
    }
  }

  //••••••••••••••••••••••••••••••

  update() {

    if (this.running) {

      this.abs_time += millis() - this.prev_frame_time;

      this.current_time = millis() - this.timer_trigger;

      if (this.current_time < this.palettes_times[this.current_index] / 2) {
        this.lerp_direction = "left";
        this.lerp_factor = map(this.current_time, 0, this.transition_time, 0.5, 1);
        this.lerp_factor = constrain(this.lerp_factor, 0.5, 1);

        let prev_index;
        if (this.current_index == 0) {
          if (this.loop)
            prev_index = this.palettes_indexes[this.stages-1];
          else
            prev_index = this.palettes_indexes[0];
        } else {
          prev_index = this.palettes_indexes[this.current_index-1] ;
        }

        for (let i = 0; i < this.current_palette.length; i++ ) {

          let or = color(this.p[prev_index].getColorAtIndex(i));
          let de = color(this.p[this.palettes_indexes[this.current_index]].getColorAtIndex(i));

          let aux = lerpColor(or, de, this.lerp_factor);

          this.current_palette[i] = aux;
        }
      } else {
        this.lerp_direction = "right";
        this.lerp_factor = map(this.current_time, this.palettes_times[this.current_index] - this.transition_time, this.palettes_times[this.current_index], 0, 0.5);
        this.lerp_factor = constrain(this.lerp_factor, 0, 0.5);

        let next_index;
        if (this.current_index == this.stages-1) {
          if (this.loop)
            next_index = this.palettes_indexes[0];
          else
            next_index = this.palettes_indexes[this.stages-1];
        } else {
          next_index = this.palettes_indexes[this.current_index+1];
        }

        for (let i = 0; i < this.current_palette.length; i++ ) {
          let or = color(this.p[this.palettes_indexes[this.current_index]].getColorAtIndex(i));
          let de =  color(this.p[next_index].getColorAtIndex(i));
          let aux = lerpColor(or, de, this.lerp_factor);
          this.current_palette[i] = aux;
        }
      }

      if (this.current_time > this.palettes_times[this.current_index] ) {
        if (this.current_index < this.stages-1 ) {
          this.current_index++;
          this.timer_trigger = millis();
        } else {
          if (this.loop)
            this.start();
          else
          this.running = false;
        }
      }
    }

    this.prev_frame_time = millis();

    if (this.render_debug)

      this.renderDebug();
  }

  //••••••••••••••••••••••••••••••

  setTransitionTime(t) {

    this.transition_time = t/2;
    this.checkTransitionTime();
  }

  //••••••••••••••••••••••••••••••

  checkTransitionTime() {
    if (this.palettes_times.length > 1) {
      let min_time = this.palettes_times[0];
      if (this.palettes_times.length > 2) {
        for (let i = 1; i < this.palettes_times.length; i++ ) {
          if (this.palettes_times[i] < min_time)
          min_time = this.palettes_times[i];
        }
      }
      if (this.transition_time > min_time/2.0) {
        this.transition_time = min_time/2;
        print("ADVERTENCIA: el tiempo de transición fue acortado en función de las duraciones de los escenarios. Tiempo de transición nuevo: " + this.transition_time * 2);
      }
    }
  }

  //••••••••••••••••••••••••••••••

  addStage(p_id, stage_time) {
    let index = 0;
    let found = false;
    for (let i = 0; i < this.p.length; i ++) {
      if (this.p[i].getId().toLowerCase() === p_id.toLowerCase()) {
        index = i;
        found = true;
        break;
      }
    }
    if (!found) {
      print("ERROR: no hay ninguna paleta con el id: " + p_id);
      return;
    } else {
      this.palettes_indexes.push(index);
      this.palettes_times.push(stage_time);
      this.stage_ids.push(p_id);
      this.stages ++;
      this.total_time = 0;
      for (let i = 0; i < this.palettes_times.length; i ++) {
        this.total_time +=  this.palettes_times[i];
      }
      this.checkTransitionTime();
    }
  }

  //••••••••••••••••••••••••••••••

  setFont(f) {
    this.font = f;
  }

  //••••••••••••••••••••••••••••••

  setSmallFont(f) {
    this.small = f;
  }

  //••••••••••••••••••••••••••••••

  start() {
    this.running = true;
    this.timer_trigger = millis();
    this.current_index = 0;
    this.abs_time = 0;
  }  

  //••••••••••••••••••••••••••••••

  setLoop() {
    this.loop = true;
  }

  //••••••••••••••••••••••••••••••

  setNoLoop() {
    this.loop = false;
  }

  //••••••••••••••••••••••••••••••

  renderDebug() {
    fill(255);
    if (this.font!==null)
      //textFont(this.font);
      textFont('Helvetica');

    text("running: " + this.running, 50, 50);
    text("loop: " + this.loop, 50, 70);
    text("current time: " + nf(this.current_time/1000.0, 0, 1), 50, 90 );
    text("current index: " + this.current_index, 50, 110 );
    text("lerp factor: " + this.lerp_factor.toFixed(2), 50, 130);
    text("stages: " + this.stages, 50, 150);
    text("stage id: " + this.stage_ids[this.current_index], 50, 170);
    text("lerp direction: " + this.lerp_direction, 50, 190);
    text("total time: " + this.total_time, 50, 210);

    this.renderTimeline();
  }
  
  //••••••••••••••••••••••••••••••

  renderTimeline() {
    push();
    textAlign(CENTER,CENTER);
    translate(0, height-21);
    fill(0);
    rect(0, 0, width, 20);
    let x_aux = 0;
    let transition_w = map(this.transition_time, 0, this.total_time, 0, width);
    for (let i = 0; i < this.palettes_times.length; i++) {
      let w = map(this.palettes_times[i], 0, this.total_time, 0, width);
      noStroke();
      fill(255, 128, 0, 128);
      rect(x_aux, 0, transition_w, 20);
      rect(x_aux + w, 0, -transition_w, 20);
      stroke(255);
      noFill();
      rect(x_aux, 0, w, 20);
      if (this.small!=null)
        //textFont(small);
        textFont('Helvetica');
        
      fill(255);
      text(this.stage_ids[i], x_aux + w/2, 10);
      x_aux += w;
    }
    let x_time = map(this.abs_time, 0, this.total_time, 0, width);
    strokeWeight(4);
    stroke(255, 0, 0);
    line(x_time, 0, x_time, 20);
    pop();
  }
  
  //••••••••••••••••••••••••••••••
  
  getCurrentStage(){
    return this.stage_ids[this.current_index];
  }
}