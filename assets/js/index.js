// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);



// Set initial properties for the SVG class
gsap.set(".cls-1-p", {
  scale: 1,
  rotation: -13,
  transformOrigin: "center center",
});

// Set initial properties for the container, rotate around its center
gsap.set(".img-container", {
  rotation: -10,
  transformOrigin: "center center", // Rotate around the center of the container
});

// Rotate the container back to 0 while scrolling
gsap.to(".img-container", {
  rotation: 0,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".img-container",
    scrub: true,  // Enable smooth scrolling interaction with the scrollbar
    start: "top top",
    end: "bottom top",
    scroller: document, // Ensure GSAP listens to the entire document scroll
  },
});

// Animate the SVG element within the container
gsap.to(".cls-1-p", {
  scale: 20,
  y: -1400,
  rotation: 0,
  ease: "power2.inOut",
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: ".img-container",
    pin: true, // Pins the container in place while animating
    scrub: true, // Enable smooth scrolling interaction with the scrollbar
    start: "top top",
    end: "bottom top",
    scroller: document, // Ensure GSAP listens to the entire document scroll
  },
});
