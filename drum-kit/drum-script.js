// storing all drum elements in array
const allDrums = document.querySelectorAll(".drum-btn");
const totDrums = allDrums.length;

// creating a dictionary of keyboard keys and drum sounds
// change the keys as required
const keys = ["q", "w", "e", "r", "a", "s", "d", "x"]
let keysDict = {}
for (let j = 0; j < totDrums; j++) {
    keysDict[keys[j]] = allDrums[j].innerHTML;
}

console.log(totDrums)
console.log(keysDict)

//adding mouse click events
for (let i = 0; i < totDrums; i++) {
    allDrums[i].addEventListener("click", function(){
        const drumName = this.innerHTML;
        playSound(drumName);
        console.log("clicked " + drumName)
    }
    );
    // adding sounds to key presses
    allDrums[i].addEventListener("keypress", function(event){
        const drumName = keysDict[event.key]
        playSound(drumName)
        console.log("pressed " + drumName)
    })
}

function playSound(key) {
    switch (key) {
      case "bass":
        var sound1 = new Audio("sounds/bass.mp3");
        sound1.play();
        break;
    
      case "crash-cymbal":
        var sound2 = new Audio("sounds/crash-cymbal.mp3");
        sound2.play();
        break;
    
      case "floor-tom-right":
        var sound3 = new Audio('sounds/floor-tom-right.mp3');
        sound3.play();
        break;
    
      case "hi-hats":
        var sound4 = new Audio('sounds/hi-hat.mp3');
        sound4.play();
        break;
    
      case "ride-cymbal":
        var sound5 = new Audio('sounds/ride-cymbal.mp3');
        sound5.play();
        break;
    
      case "snare-left":
        var sound6 = new Audio('sounds/snare.mp3');
        sound6.play();
        break;
    
      case "tom1":
        var sound7 = new Audio('sounds/tom1.mp3');
        sound7.play();
        break;
    
      case "tom2":
        var sound8 = new Audio('sounds/tom2.mp3');
        sound8.play();
        break;
    
      default: console.log(key);
    }
  }
  