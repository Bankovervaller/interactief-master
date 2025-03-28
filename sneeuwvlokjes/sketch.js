let sneeuwvlokken = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    sneeuwvlokken.push(new Sneeuwvlok(random(width), random(height)));
  }
}

function draw() {
  background(30, 30, 50);
  for (let vlok of sneeuwvlokken) {
    vlok.bewegen();
    vlok.tonen();
  }
}

function touchMoved() {
  for (let vlok of sneeuwvlokken) {
    for (let t of touches) {
      vlok.ontsnap(t.x, t.y);
    }
  }
  return false;
}

class Sneeuwvlok {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(9, 10);
    this.vx = random(-0.5, 0.5);
    this.vy = random(0.5, 1.5);
  }

  bewegen() {
    this.x += this.vx;
    this.y += this.vy;

    // Reset als de vlok uit beeld valt
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  ontsnap(tx, ty) {
    let d = dist(tx, ty, this.x, this.y);
    if (d < 50) {
      let angle = atan2(this.y - ty, this.x - tx);
      this.vx = cos(angle) * 2;
      this.vy = sin(angle) * 2;
    }
  }

  tonen() {
    push();
    translate(this.x, this.y);
    stroke(255);
    strokeWeight(2);
    noFill();
    
    // Teken een sneeuwvlok met fractale structuur
    for (let a = 0; a < TWO_PI; a += PI / 3) {
      push();
      rotate(a);
      this.tekenTak(0, 0, this.d);
      pop();
    }

    pop();
  }

  tekenTak(x, y, lengte) {
    if (lengte < 2) return;
    
    line(x, y, x, y - lengte);
    let nieuweLengte = lengte * 0.6;

    push();
    translate(x, y - lengte);
    rotate(PI / 6);
    this.tekenTak(0, 0, nieuweLengte);
    pop();

    push();
    translate(x, y - lengte);
    rotate(-PI / 6);
    this.tekenTak(0, 0, nieuweLengte);
    pop();
  }
}
