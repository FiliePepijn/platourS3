import './assets/css/style.css';   
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);




function initializeAnimations() {
  let container = document.querySelector('#container');
  let psvg = document.querySelector('#last-path');
  let home = document.querySelector('#home');
  let about = document.querySelector('#about');
  let contact = document.querySelector('#contact');
  let body = document.querySelector('body');

  // Set initial properties for SVG and background
  gsap.set('.background-svg', {
    transformOrigin: 'center',
    margin: '0',
    padding: '0',
    height: '100vh',
  });

  gsap.set(psvg, {
    transformOrigin: 'center',
    margin: '0',
    justifySelf: 'center',
    padding: '0',
  });

  // GSAP timeline for SVG animations
  const svgTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: '.background-svg',
    },
  });

  svgTimeline
    .to(psvg, {
      duration: 0.5,
      scale: 10,
      y: '-=200',
      rotate: 360,
      ease: 'power1.inOut',
    })  
    .to(body, {
      backgroundColor: '#f05454',
      duration: 1,
      ease: 'power2.inOut',
    },"<")
    .to(psvg, {
      y: '+=500',
      duration: 1,
      ease: 'power2.inOut',
    });

  // ScrollTrigger sections to emulate scroll snapping
  const sections = [lo,projects, about, contact];

  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(window, { scrollTo: section, duration: 0.5, ease: "power2.inOut" });
      },
      onEnterBack: () => {
        gsap.to(window, { scrollTo: section, duration: 0.5, ease: "power2.inOut" });
      },
    });
  });
}

// Initialize animations on page load
initializeAnimations();


