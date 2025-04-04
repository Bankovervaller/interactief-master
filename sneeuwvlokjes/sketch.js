// Array om alle sneeuwvlok objecten te bewaren
      let sneeuwvlokken = [];

      // Setup functie om het canvas te initialiseren en sneeuwvlokken te maken
      function setup() {
        createCanvas(windowWidth, windowHeight);
        // Maak 20 sneeuwvlokken op willekeurige posities
        for (let i = 0; i < 20; i++) {
          sneeuwvlokken.push(new Sneeuwvlok(random(width), random(height)));
        }
      }

      // Draw functie om de sneeuwvlokken op het canvas te tekenen
      function draw() {
        background(30, 30, 50); // Stel de achtergrondkleur in
        // Update en toon elke sneeuwvlok
        for (let vlok of sneeuwvlokken) {
          vlok.bewegen();
          vlok.tonen();
        }
      }

      // Functie om touch events te verwerken en sneeuwvlokken te laten ontsnappen van touch punten
      function touchMoved() {
        for (let vlok of sneeuwvlokken) {
          for (let t of touches) {
            vlok.ontsnap(t.x, t.y);
          }
        }
        return false; // Voorkom standaard touch gedrag
      }

      // Functie om meer sneeuwvlokken toe te voegen bij een muisklik
      function mousePressed() {
        sneeuwvlokken.push(new Sneeuwvlok(mouseX, mouseY));
      }

      // Klasse die een sneeuwvlok representeert
      class Sneeuwvlok {
        constructor(x, y) {
          this.x = x; // X positie
          this.y = y; // Y positie
          this.d = random(9, 10); // Diameter
          this.vx = random(-0.5, 0.5); // X snelheid
          this.vy = random(0.5, 1.5); // Y snelheid
          this.hue = random(360); // Kleurtoon
        }

        // Methode om de positie van de sneeuwvlok te updaten
        bewegen() {
          this.x += this.vx + sin(frameCount * 0.01); // Voeg wind effect toe
          this.y += this.vy;

          // Reset positie als de sneeuwvlok onderaan het canvas gaat
          if (this.y > height) {
            this.y = 0;
            this.x = random(width);
          }

          // Verander de kleurtoon over tijd
          this.hue = (this.hue + 0.5) % 360;
        }

        // Methode om de sneeuwvlok te laten ontsnappen van een touch punt
        ontsnap(tx, ty) {
          let d = dist(tx, ty, this.x, this.y);
          if (d < 50) {
            let angle = atan2(this.y - ty, this.x - tx);
            this.vx = cos(angle) * 2;
            this.vy = sin(angle) * 2;
          }
        }

        // Methode om de sneeuwvlok te tonen
        tonen() {
          push();
          translate(this.x, this.y);
          // Kleur en stijl van de sneeuwvlok
          stroke(color(`hsl(${this.hue}, 100%, 75%)`));
          strokeWeight(2);
          noFill();

          // Teken een sneeuwvlok met een fractale structuur
          for (let a = 0; a < TWO_PI; a += PI / 3) {
            push();
            rotate(a);
            this.tekenTak(0, 0, this.d);
            pop();
          }

          pop();
        }

        // Recursieve methode om een tak van de sneeuwvlok te tekenen
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