


document.querySelector('#start-button').onclick = function() {
  this.remove()  //removes start button
  startGame() //calls startGame
}


document.onclick = boxClick

function boxClick(e) {
  console.log('holla');
}

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = 400; //Set canvas width and height
canvas.height = 550

const ctx = canvas.getContext('2d'); //Get the context 
// document.querySelector('#start-button').click(); // starts the game automatically
let lines = [];
let obstacles = [];
let line = {
  x: canvas.width/2-5,
  y: 0,
  width:10,
  height:20,
}

// randomize the obstacle

let obstacle = {
  x: Math.floor(Math.random() * (canvas.width - 25)),
  y: 0,
  width: Math.floor(Math.random() * (canvas.width - 200)),
  height:15,
}
// function to draw obstacles
function drawObstacle() {
  ctx.fillStyle = 'red'
  obstacles.forEach(obstacle=>{
  ctx.fillRect(obstacle.x, obstacle.y+=3, obstacle.width, obstacle.height)
  })
}


setTimerLine = setInterval(() => {
  let line = {
    x: canvas.width/2-5,
    y: 0,
    width:10,
    height:20,
  }
  lines.push(line);
},400)


//randomize obstacle timing
setTimerObstacle = setInterval(() => {
let obstacle = {
  x: Math.floor(Math.random() * (canvas.width - 25)),
  y: 0,
  width: Math.floor(Math.random() * (canvas.width - 200)),
  height:15,
  }
  obstacles.push(obstacle);
}, 1150)


//draw the dividing line
function drawLine() {
  ctx.fillStyle = 'white'
  lines.forEach(line=>{
  ctx.fillRect(line.x, line.y+=3, line.width, line.height)
  })
}



function startGame(){  
  console.log("START") 
  img.onload = function() {  //Load the car for the first time 
     ctx.drawImage(img, car.x, car.y, car.width, car.height); 
  }
  img.src = "./images/car.png";

  window.requestAnimationFrame(animate) //Starts the animation infinite loop
}


function drawBoard() {
  ctx.fillStyle = 'green'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  ctx.fillStyle = 'grey'
  ctx.fillRect(80,0,canvas.width-165, canvas.height) //draws the road 
}

let car = {  //Car object - also can be converted to a Class 
  x:175,
  y:450,
  width: 50,
  height: 80
}

function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}


document.onkeydown = function(e) { //controls -- up down left and right ... 
  switch (e.keyCode) { //changes the car object 
    case 37: 
      if (car.x > 0) {
        car.x-=10;
        console.log('left',);
      }
    break;
    case 39: 
      if (car.x < 350) {
        car.x+=10;
        console.log('right');
      }
    break;
  }
  
}
let frameId;

// collision detection, game ending

function crash() {
  obstacles.forEach(obstacle => {
    if (car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.y + car.height > obstacle.y) {
        // alert("GAME OVER MAN! GAME OVER!");
        // document.location.reload();
        // clearInterval(interval);
        window.cancelAnimationFrame(frameId); // stop the animation, must put frameId as global variable
    }
  })
  
}

function animate(){
  let loop = window.requestAnimationFrame(animate) //continues the loop
  
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  drawBoard()  //redraws the board over and over and over again
  drawLine()
  drawObstacle()
  drawCar()   //redraws the car over and over and over again
  crash()
}