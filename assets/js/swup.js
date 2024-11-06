import Swup from 'swup';

const swup = new Swup({
  containers: ["#swup"]
});

swup.hooks.on('visit:start', () => {
  document.documentElement.classList.add('is-animating', 'is-leaving');
});

swup.hooks.on('visit:end', () => {
  document.documentElement.classList.remove('is-leaving');
  document.documentElement.classList.add('is-rendering');
});

swup.hooks.on('animationOutDone', () => {
  document.documentElement.classList.remove('is-animating');
});

swup.hooks.on('contentReplaced', () => {
  document.documentElement.classList.remove('is-rendering');
  // Trigger reflow to ensure the transition starts
  void document.documentElement.offsetWidth;
  document.documentElement.classList.add('is-rendering');
});

// Ensure the page animates on initial load
window.addEventListener('load', () => {
  document.documentElement.classList.add('is-rendering');
  setTimeout(() => {
    document.documentElement.classList.remove('is-rendering');
  }, 500); // Adjust the timeout to match your animation duration
});