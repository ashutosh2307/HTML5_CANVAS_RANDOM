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

//starting point
let x = Math.random() * innerWidth;
let y = Math.random() * innerHeight;

//velocity of cirle
let dx = (Math.random() - 0.5) * 4;
let dy = (Math.random() - 0.5) * 4;
let radius = 30;

//putting infinite loop
function animate() {
  requestAnimationFrame(animate);
  //clearing the canvas
  c.clearRect(0, 0, innerWidth, innerHeight);

  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.fillStyle = 'purple';
  c.fill();
  c.stroke();

  //to bounce back from the left & right side
  if(x + radius > innerWidth || x - radius < 0) {
    dx = -dx;
  }

  //to bounce back from the top & bottom
  if(y + radius > innerHeight || y - radius < 0) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}

animate();
