export default {


  getRandomInt(min, max){
    return Math.abs(Math.floor(Math.random() * (max - min + 1) - min))
  },
  getRandomRGB(){

    let rgbArr = []
    for (let i = 0; i < 3; i ++){
      rgbArr.push(this.getRandomInt(0, 255))
    }


    const rgbString = `rgb(${rgbArr.join(', ')})`

    return (rgbString)

  },


  getRandomRgbLightBlue(){
    
  },

  getRandomRgbLightGreen(){
    let r = 0;
    let g = this.getRandomInt(209, 255);
    let b = 0;

    let newRgb = `${r} ${g} ${b}`
    return newRgb
  },

  getRandomRgbLightGrey(){
    
  },

  getRandomRgbBackgroundDark(){
    let r = this.getRandomInt(0, 50);
    let g = this.getRandomInt(0, 50);
    let b = this.getRandomInt(0, 50);

    if(g < 20 && b < 20){
      r = this.getRandomInt(50, 80);
    } 
    else if(b < 20 && r < 20){
      g = this.getRandomInt(50, 80);
    } 
    else if(r < 20 && g < 20){
      b = this.getRandomInt(50, 80);
    } 

    let newRgb = `rgb(${r}, ${g}, ${b})`
    return newRgb
  },


}