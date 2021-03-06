/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/
// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
// Load the background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  // show the background image
  bgReady = true;
};
bgImage.src = "images/background.png";
// Load the hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  // show the here image
  heroReady = true;
};
heroImage.src = "images/hero.png";
// Load the monster image
var monster1Ready = false;
var monster1Image = new Image();
monster1Image.onload = function () {
  // show the monster image
  monster1Ready = true;
};
monster1Image.src = "images/monster.png";
var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
  // show the monster image
  monster2Ready = true;
};
monster2Image.src = "images/monster.png";
// Create the game objects
var hero = {
  speed: 256, // movement speed of hero in pixels per second
  height: 36,
  width: 31
};
var monster1 = {};
var monster2 = {};
var monstersCaught = 0;
// Handle keyboard controls
var keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);
// Reset the player and monster positions when player catches a monster
var reset = function () {
  // Reset player's position to centre of canvas
  hero.x = canvas.width /2;
  hero.y = canvas.height /2 ;
  // Place the monster somewhere on the canvas randomly
 monster1.x = 32 + (Math.random() * (canvas.width - 64));
  monster1.y = 32 + (Math.random() * (canvas.height - 64));
  monster2.x = 32 + (Math.random() * (canvas.width - 64));
  monster2.y = 32 + (Math.random() * (canvas.height - 64));
};
// Update game objects - change player position based on key pressed
var update = function (modifier) {
  if (38 in keysDown) { // Player is holding up key
   new_position =  hero.y - (hero.speed * modifier);
    if (new_position > 0) {
        hero.y = new_position;
    }
}
if (40 in keysDown) { // Player is holding down key
    new_position =  hero.y + (hero.speed * modifier);
    console.log(new_position)
    console.log(hero.height)
    if (new_position < (canvas.height - hero.height)) {
        hero.y = new_position;
    }
}
if (37 in keysDown) { // Player is holding left key
    new_position =  hero.x - (hero.speed * modifier);
    if (new_position > 0) {
        hero.x = new_position;
    }
}
if (39 in keysDown) { // Player is holding right key
    new_position =  hero.x + (hero.speed * modifier);
    console.log(new_position)
    console.log(hero.width)
    if (new_position < (canvas.width - hero.width)) {
        hero.x = new_position;
    }
}
  // Check if player and monster collider
  if (
    hero.x <= (monster1.x + 32)
    && monster1.x <= (hero.x + 32)
    && hero.y <= (monster1.y + 32)
    && monster1.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
   monster1Ready= false
  }
 if (
    hero.x <= (monster2.x + 32)
    && monster2.x <= (hero.x + 32)
    && hero.y <= (monster2.y + 32)
    && monster2.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
  monster2Ready= false
  }
if ((monster1Ready == false) && (monster2Ready == false)) {
   monster1Ready = true;
    monster2Ready = true;
    reset();
  }
};
// Draw everything on the canvas
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monster1Ready) {
    ctx.drawImage(monster1Image, monster1.x, monster1.y);
  }
  if (monster2Ready) {
    ctx.drawImage(monster2Image, monster2.x, monster2.y);
  }
  // Display score and time
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 20, 20);
  ctx.fillText("Time: " + count, 20, 50);
  // Display game over message when timer finished
  if(finished==true){
    ctx.fillText("Game over!", 200, 220);
  }
};
var count = 30; // how many seconds the game lasts for - default 30
var finished = false;
var counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide monster and
  // hero and finish the game
    if (count <= 0)
    {
      // stop the timer
       clearInterval(counter);
       // set game to finished
       finished = true;
       count=0;
       // hider monster and hero
       monster1Ready=false;
       monster2Ready=false;
       heroReady=false;
    }
}
// timer interval is every second (1000ms)
setInterval(counter, 1000);
// The main game loop
var main = function () {
  // run the update function
  update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
reset();
main();