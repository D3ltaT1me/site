const backgrounds = [
    'white', // White bg
    'url("win-xp.webp")', // Win XP bg
    'url("dababy-car.jpg")', // Dababy car bg
    'url("minecraft.webp")', // Minecraft bg
    'url("low-tier-god.png")', // Low Tier God bg
];

let currentIndex = 0; // Start with the first bg

document.getElementById("change-bg-btn").addEventListener("click", function() {
    // Cycle through bgs
    currentIndex = (currentIndex + 1) % backgrounds.length;

    // If background is white, apply a white background
    if (backgrounds[currentIndex] === 'white') {
        document.body.style.backgroundColor = 'white';
        document.body.style.backgroundImage = ''; // Ensure no image is displayed
    } else { // Otherwise, uhhh
        document.body.style.backgroundColor = ''; // Reset the background color
        document.body.style.backgroundImage = backgrounds[currentIndex]; // Apply the image
        document.body.style.backgroundSize = 'cover'; // Ensure it covers the screen
        document.body.style.backgroundPosition = 'center'; // Center the image
    }
    
    document.body.style.transition = 'background 0.5s ease'; // Smooth transition
});