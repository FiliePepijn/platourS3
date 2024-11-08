import Swup from 'swup';
const swup = new Swup({
    containers: ["#swup"]
  });
  swup.hooks.on('visit:start', () => {
    console.log(window.location.href);
  })
