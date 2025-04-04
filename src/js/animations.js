let stars = [];
let bubbles = [];
let waveHeight = [];
let waveSpeed = 0.1;
let waveOffset = 0;
let touchX = 0;
let touchY = 0;
let bubbleSpeed = 1;
let moonX, moonY;
let moonRadius = 150;
let moonOpacity = 0;
let moonRotation = 0;
let shapes = [];
let circleSize = 100;
let breathingSpeed = 0.5;
let growing = true;
let plantHeight = 0;
let plantWidth = 20;
let sneeuwvlokken = [];



function setup() {
    createCanvas(windowWidth, windowHeight);

    if (window.location.pathname.includes("hemelse-pracht.html")) {
        createStars();
        moonX = width / 2;
        moonY = height / 3;
    } else if (window.location.pathname.includes("onderwater-rust.html")) {
        setGradient(0, 0, width, height, color('#81D4FA'), color('#00ACC1'));
        createWaves();
        createBubbles();
    } else if (window.location.pathname.includes("abstracte-vormen.html")) {
        createShapes();
    } else if (window.location.pathname.includes("ademhaling.html")) {
        setGradient(0, 0, width, height, color('#81D4FA'), color('#00ACC1'));
        createBreathingCircle();
    } else if (window.location.pathname.includes("groei-herstel.html")) {
        setGradient(0, 0, width, height, color('#81D4FA'), color('#00ACC1'));
    } else if (window.location.pathname.includes("sneeuwvlokjes.html")) {
        createSneeuwvlokken();
    }



    touchEventHandlers();
}

function draw() {
    if (window.location.pathname.includes("hemelse-pracht.html")) {
        setGradient(0, 0, width, height, color('#0D1B2A'), color('#3E206D'));
        drawStars();
        drawMoon();
    } else if (window.location.pathname.includes("onderwater-rust.html")) {
        background(0, 50);
        drawWaves();
        drawBubbles();
    } else if (window.location.pathname.includes("abstracte-vormen.html")) {
        background(30);
        drawShapes();
    } else if (window.location.pathname.includes("ademhaling.html")) {
        background(0, 50);
        drawBreathingCircle();
    } else if (window.location.pathname.includes("groei-herstel.html")) {
        background(0, 50);
        drawPlant();
    } else if (window.location.pathname.includes("sneeuwvlokjes.html")) {
        background(30, 30, 50);
        for (let vlok of sneeuwvlokken) {
            vlok.bewegen();
            vlok.tonen();
        }
    }
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}

function createStars() {
    for (let i = 0; i < 100; i++) {
        stars.push({ x: random(width), y: random(height), size: random(5, 10), speed: random(0.5, 2) });
    }
}

function drawStars() {
    for (let star of stars) {
        fill(255);
        ellipse(star.x, star.y, star.size);
        star.y -= star.speed;
        if (star.y < 0) star.y = height;
    }
}

function drawMoon() {
    if (moonOpacity > 0) {
        push();
        translate(moonX, moonY);
        rotate(moonRotation);
        fill(255, 235, 59, moonOpacity);
        noStroke();
        arc(0, 0, moonRadius * 2, moonRadius * 2, PI, 0, CHORD);
        pop();
    }
}

function createWaves() {
    for (let i = 0; i < width; i++) {
        waveHeight[i] = random(height / 3, height / 2);
    }
}

function drawWaves() {
    fill(255, 255, 255, 50);
    waveOffset += waveSpeed;

    beginShape();
    for (let i = 0; i < width; i += 10) {
        let wave = sin(TWO_PI * (waveSpeed * (i / width) + waveOffset)) * 20;
        vertex(i, height / 1.5 + wave);
    }
    endShape(CLOSE);
}

// 💨 Bubbels
function createBubbles() {
    for (let i = 0; i < 20; i++) {
        bubbles.push({ x: random(width), y: height + random(50, 200), size: random(20, 40), speed: random(0.5, 2) });
    }
}

function drawBubbles() {
    fill(255, 255, 255, 70);
    for (let bubble of bubbles) {
        ellipse(bubble.x, bubble.y, bubble.size);
        bubble.y -= bubble.speed;
        if (bubble.y < -50) bubble.y = height + 50;
    }
}

function createShapes() {
    for (let i = 0; i < 20; i++) {
        shapes.push({
            x: random(width),
            y: random(height),
            size: random(20, 100),
            type: int(random(3)),
            color: color(random(255), random(255), random(255)),
            speedX: random(-2, 2),
            speedY: random(-2, 2)
        });
    }
}

function drawShapes() {
    for (let shape of shapes) {
        fill(shape.color);
        noStroke();

        if (shape.type === 0) {
            ellipse(shape.x, shape.y, shape.size);
        } else if (shape.type === 1) {
            rect(shape.x, shape.y, shape.size, shape.size);
        } else {
            triangle(
                shape.x, shape.y - shape.size / 2,
                shape.x - shape.size / 2, shape.y + shape.size / 2,
                shape.x + shape.size / 2, shape.y + shape.size / 2
            );
        }

        shape.x += shape.speedX;
        shape.y += shape.speedY;

        if (shape.x < 0 || shape.x > width) shape.speedX *= -1;
        if (shape.y < 0 || shape.y > height) shape.speedY *= -1;
    }
}

function createBreathingCircle() {
    circleSize = 100;
}

function drawBreathingCircle() {
    fill(255, 255, 255, 100);
    noStroke();
    ellipse(width / 2, height / 2, circleSize);

    if (growing) {
        circleSize += breathingSpeed;
        if (circleSize >= 200) {
            growing = false;
        }
    } else {
        circleSize -= breathingSpeed;
        if (circleSize <= 100) {
            growing = true;
        }
    }
}


function createSneeuwvlokken() {
    for (let i = 0; i < 20; i++) {
        sneeuwvlokken.push(new Sneeuwvlok(random(width), random(height)));
    }
}

function createSneeuwvlokken() {
    for (let i = 0; i < 20; i++) {
        sneeuwvlokken.push(new Sneeuwvlok(random(width), random(height)));
    }
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



// 📱 Touch Events
function touchEventHandlers() {
    touchStarted = function() {
        touchX = mouseX;
        touchY = mouseY;

        if (window.location.pathname.includes("onderwater-rust.html")) {
            for (let bubble of bubbles) bubble.speed = random(1, 3);
        } else if (window.location.pathname.includes("hemelse-pracht.html")) {
            moonOpacity = 255;
            moonRotation = random(TWO_PI);
            setTimeout(() => moonOpacity = 0, 2000);
        } else if (window.location.pathname.includes("abstracte-vormen.html")) {
            shapes.push({
                x: touchX,
                y: touchY,
                size: random(20, 100),
                type: int(random(3)),
                color: color(random(255), random(255), random(255)),
                speedX: random(-2, 2),
                speedY: random(-2, 2)
            });
        } else if (window.location.pathname.includes("sneeuwvlokjes.html")) {
            for (let vlok of sneeuwvlokken) {
                vlok.ontsnap(touchX, touchY);
            }
        }
    };
}
