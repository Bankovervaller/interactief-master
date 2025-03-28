let bolletjes = [];
let maxBollen = 50; // Maximale hoeveelheid bollen op het scherm

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start met 20 bollen
  for (let i = 0; i < 20; i++) {
    bolletjes.push(new Bol(random(width), random(height)));
  }
}

function draw() {
  background(15, 20, 40); // Donkerblauwe achtergrond
  
  for (let bol of bolletjes) {
    bol.bewegen();
    bol.tonen();
  }
}

function touchMoved() {
  let nieuweBollen = [];

  for (let bol of bolletjes) {
    for (let t of touches) {
      bol.ontsnap(t.x, t.y); // Bollen reageren altijd op aanraking
      
      // Alleen nieuwe bollen spawnen als het limiet niet is bereikt
      if (bolletjes.length + nieuweBollen.length < maxBollen) {
        nieuweBollen.push(new Bol(random(width), random(height)));
      }
    }
  }

  bolletjes = bolletjes.concat(nieuweBollen);
  return false; // Voorkomt standaard scrollen bij touchscreens
}

class Bol {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = 30;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.kleur = color(random(100, 255), random(100, 255), random(100, 255), 180); // Random kleur
  }

  bewegen() {
    this.x += this.vx;
    this.y += this.vy;

    // Zorg ervoor dat de bolletjes binnen het canvas blijven
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  ontsnap(tx, ty) {
    let d = dist(tx, ty, this.x, this.y);
    if (d < 50) {
      let angle = atan2(this.y - ty, this.x - tx);
      this.vx = cos(angle) * 5;
      this.vy = sin(angle) * 5;
    }
  }

  tonen() {
    fill(this.kleur); // Gebruik de willekeurige kleur
    noStroke();
    ellipse(this.x, this.y, this.d);
  }
}
