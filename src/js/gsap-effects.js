
gsap.fromTo("#breathing-circle", {
    scale: 1
}, {
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "power1.inOut"
});

gsap.to("#abstract-shape", {
    x: 500,
    rotation: 360,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});
