//overlay function
function initializeOverlay() {
    console.log('Initializing overlay');
    const img = document.querySelector('.detail-img img');
    if (img) {
        console.log('Image found:', img);
        
       //check if ther is an overlay active
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
                overlay.style.display = 'flex';
            });
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            overlayImg.src = ''; 
        });
    } else {
        console.error('No image found with the selector .detail-img img');
    }
}


swup.hooks.on('page:view', () => {
    
    console.log('Page view detected');
    initializeOverlay();

    
});

initializeOverlay();
