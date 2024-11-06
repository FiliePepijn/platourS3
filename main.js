import './assets/css/style.css';   
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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
  padding: '0',
});

// GSAP timeline for SVG animations
const svgTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: psvg,
    start: '-=15',
    end: '+=600',
    scrub: 1,
    pin: '.background-svg',
    onLeave: () => {
      console.log('onLeave');
    },
  },
});

svgTimeline
  .to(psvg, {
    duration: 2,
    scale: 20,
    y: '-=1700',
    ease: 'power1.inOut',
  })
  .to(psvg, {
    y: '+=500',
    duration: 1,
    ease: 'power2.inOut',
  })
  .to(body, {
    backgroundColor: '#f05454',
    duration: 1,
    ease: 'power2.inOut',
  })


// ScrollTrigger sections to emulate scroll snapping
const sections = [projects, about, contact];

sections.forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(window, { scrollTo: section, duration: 1, ease: "power2.inOut" });
    },
    onEnterBack: () => {
      gsap.to(window, { scrollTo: section, duration: 1, ease: "power2.inOut" });
    },
  });
});


