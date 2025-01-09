import Swup from 'swup';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import { gsap } from 'gsap';



const swup = new Swup({
    containers: ['#swup'], 
    plugins: [
        new SwupScriptsPlugin({
            head: true,
            body: true,
        }),
    ],
});

//overlay function
function initializeOverlay() {
    console.log('Initializing overlay');
    const img = document.querySelector('.detail-img img');
    if (img) {
        console.log('Image found:', img);
        

        if (!document.getElementById('overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'overlay';
            overlay.className = 'overlay';
            overlay.innerHTML = '<img id="overlay-img" src="" alt="Overlay Image">';
            document.body.appendChild(overlay);
        }

        const overlay = document.getElementById('overlay');
        const overlayImg = document.getElementById('overlay-img');

        document.querySelectorAll('.detail-img img').forEach(img => {
            img.addEventListener('click', () => {
                overlayImg.src = img.src;
                gsap.to(overlay, { duration: 0.5, display: 'flex', opacity: 1 });
            });
        });

        overlay.addEventListener('click', () => {
            gsap.to(overlay, { duration: 0.5, opacity: 0, onComplete: () => {
                overlay.style.display = 'none';
            }});
        });
    }
}



swup.hooks.on('page:view', () => {
    
    console.log('Page view detected');
    initializeOverlay();

    
});

initializeOverlay();
