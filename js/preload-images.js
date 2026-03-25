// Preload all images on the page automatically
function preloadAllImages() {
    const images = document.querySelectorAll('img');
    let preloadedCount = 0;

    images.forEach(img => {
        const preloadImg = new Image();
        preloadImg.onload = () => {
            preloadedCount++;
            console.log(`Image preloaded: ${img.src} (${preloadedCount}/${images.length})`);
        };
        preloadImg.onerror = () => {
            console.warn(`Failed to preload: ${img.src}`);
        };
        preloadImg.src = img.src;
    });

    console.log(`Started preloading ${images.length} images...`);
}

// Run preloading when the page has finished loading
window.addEventListener('load', preloadAllImages);
