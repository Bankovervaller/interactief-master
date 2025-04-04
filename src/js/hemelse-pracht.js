let stars = [];
let moonX, moonY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 100; i++) {
        stars.push({ x: random(width), y: random(height), size: random(2, 5) });
    }
    moonX = width / 2;
    moonY = height / 3;
}

function draw() {
    background(10, 10, 50);
    for (let star of stars) {
        fill(255);
        noStroke();
        ellipse(star.x, star.y, star.size);
    }
    
    fill(255, 235, 59);
    ellipse(moonX, moonY, 150, 150);
}
