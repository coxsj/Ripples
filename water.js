class Water {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.damping = 0.99;
    this.ripple = [];
    this.canvasPixels = this.rows * this.cols;
    this.baseRipple = 10;
    this.baseWaterLevel = 300;
    this.touchLevel =     this.baseWaterLevel*this.damping;
    this.minRipple = 35;
    this.initWater();
    this.flip = false;
  }
  initWater() {
    for (let i = 0; i < this.canvasPixels * 2; i++) {
      this.ripple[i] = this.baseRipple;
    }
  }
  touch() {
    let ring = this.touchLevel * this.damping;
    this.ripple[mouseX + mouseY * cols] = this.touchLevel;
    this.ripple[mouseX + mouseY * cols + 1] = ring;
    this.ripple[mouseX + mouseY * cols - 1] = ring;
    this.ripple[mouseX + (mouseY + 1) * cols] = ring;
    this.ripple[mouseX + (mouseY - 1) * cols] = ring;
  }
  update() {
    // Alternate operations between bankA and bankB
    let bankA = 0;
    let bankB = this.canvasPixels;
    if (this.flip) {
      bankA = this.canvasPixels;
      bankB = 0;
    }
    loadPixels();
    for (let i = 1; i < this.cols - 1; i++) {
      for (let j = 1; j < this.rows - 1; j++) {
        let iPlusjCols = i + j * this.cols;
        let bankAPlusiPlusjCols = bankA + iPlusjCols;
        let bankBPlusiPlusjCols = bankB + iPlusjCols;
        // Wave extent limtation
        // If the last update was small and the current update
        // is also small with the same sign, then set the
        // update value to 0
        if (
          abs(this.ripple[bankBPlusiPlusjCols]) < 
          this.minRipple &&
          abs(this.ripple[bankAPlusiPlusjCols]) <
          this.minRipple &&
          abs(this.ripple[bankAPlusiPlusjCols + 1]) <
          this.minRipple &&
          abs(this.ripple[bankAPlusiPlusjCols - 1]) <
          this.minRipple &&
          abs(this.ripple[bankAPlusiPlusjCols + this.cols]) <
          this.minRipple &&
          abs(this.ripple[bankAPlusiPlusjCols - this.cols]) <
          this.minRipple
        )
          continue;

        // Calc ripple
        this.ripple[bankBPlusiPlusjCols] =
          (this.ripple[bankAPlusiPlusjCols - 1] +
            this.ripple[bankAPlusiPlusjCols + 1] +
            this.ripple[bankAPlusiPlusjCols - this.cols] +
            this.ripple[bankAPlusiPlusjCols + this.cols]) /
            2 -
          this.ripple[bankBPlusiPlusjCols];
        this.ripple[bankBPlusiPlusjCols] *= this.damping;

        display.setPixel(
          i,
          j,
          color(
            0,
            this.ripple[bankBPlusiPlusjCols]*2,
            this.ripple[bankBPlusiPlusjCols] + this.baseWaterLevel,
            255-this.ripple[bankBPlusiPlusjCols]
          )
        );
      }
    }
    updatePixels();
    // Swap buffers
    this.flip = this.flip ? false : true;
  }
}
