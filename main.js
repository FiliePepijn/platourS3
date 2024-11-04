import './assets/css/style.css';  



import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector('#container');
let psvg = document.querySelector('#last-path');

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

gsap.to(psvg, {
  rotation: 360,
  duration: 1,
  scale: 20,

  scrollTrigger: {
    trigger: psvg,
    start: '-=15',
    end: '+=600',
    scrub: 1,
    pin: '.background-svg',
    onLeave: () => {
      gsap.to('document.body',
        {
          backgroundColor: '#f05454',
          duration: 1,
          scrub: 1,
        });
      
    },
  },
});








