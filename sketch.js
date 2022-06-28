let water;
let display;
const rows = 600;
const cols = 600;
let loop = 0;
let fr = 0;
let drawTimer;

function setup() {
  display = new Display(rows, cols);
  display.setPixelDensity(1);
  water = new Water(rows, cols);
}

function draw() {
  background(0, 55, 255, 50);
  water.update();
  drawShapes();
  showFrameRate();
  //noLoop();
}
function drawShapes(){
  noStroke();
  fill(random(255), random(255), random(255));
  circle(20, 20, 40)
}
function mouseDragged(){
  water.touch();
}
function mousePressed(){
  water.touch();
}
function showFrameRate(){
  if(loop++ > fr*2){
    loop = 0;
    fr = frameRate();
    console.log(fr);
  }
}