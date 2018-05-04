const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// for(let i = 0; i < 10; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = 'blue';
//   c.stroke();
// // }

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

var maxRadius = 30;
var minRadius = 5;

//Circle Object having indepedent x & y value
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;

  this.color = color;


  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'red';
    c.fillStyle = color;
    c.fill();
    // c.stroke();
  }

  this.update = function() {
    //to bounce back from the left & right side
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    //to bounce back from the top & bottom
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //inneractivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if(this.radius < maxRadius) {
          this.radius +=1;
        }
    }
    else if(this.radius > this.minRadius) {
      this.radius -=1;
    }

    this.draw();
  }

}

  var circleArray = [];

// console.log(circleArray);
function init() {

  circleArray = [];
  for(let i = 0; i < 800; i++) {

    let radius = Math.random() * 3 + 1;
    //starting point
    let x = Math.random() * (innerWidth - radius * 2) - radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;

    //velocity of cirle
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    let color = randomColor();

      circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}

//putting infinite loop
function animate() {
  requestAnimationFrame(animate);
  //clearing the canvas
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}
init();

//Random color
function randomColor(){
	//pick red from 0-255
  let r = Math.floor(Math.random() * 256);
	//pick green from 0-255
	let g = Math.floor(Math.random() * 256);
	//pick blue from 0-255
	let b = Math.floor(Math.random() * 256);

  var color = "rgb(" + r + ", " + g + ", " + b + ")";
  return color;
}

animate();
