let pixDensity;
class Display {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    createCanvas(w, h);
    this.setPixelDensity();
  }
  setPixel(x, y, val) {
    for (let i = 0; i < this.pixDensity; i++) {
      for (let j = 0; j < this.pixDensity; j++) {
        let index =
          4 * ((y * this.pixDensity + j) * this.w * this.pixDensity +
               (x * this.pixDensity + i));
        pixels[index] = red(val);
        pixels[index + 1] = green(val);
        pixels[index + 2] = blue(val);
        pixels[index + 3] = alpha(val);
      }
    }
  }
  setPixelDensity(val){
    if(val) pixelDensity(val);
    this.pixDensity = pixelDensity();
    console.log("pixel density:",this.pixDensity);
    return;
  }
}