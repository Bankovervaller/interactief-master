let sensorElement = document.getElementById("app");

sensorElement.addEventListener("touchstart", function() {
    alert("Touchscreen aangeraakt!");
});

window.addEventListener('deviceorientation', function(event) {
    let tilt = event.gamma;  
    let rotation = event.beta; 
    

    if (tilt > 10) {
    }
}, true);

