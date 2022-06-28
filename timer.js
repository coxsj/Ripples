class Timer{
  constructor(){
    this.startTime = 0;
    this.running = false;
  }
  end(){
    if(this.running){
      let elapsed = millis() - this.startTime;
      console.log("Elapsed", elapsed);
      this.running = false;
      return;
    }
    console.log("Timer not running");
  }
  start(){
    this.startTime = millis();
    this.running = true;
  }
  show(){
    if(this.running){
      console.log("Elapsed ", millis() - this.startTime);
      return;
    }
    console.log("Timer not running");
  }
  
}