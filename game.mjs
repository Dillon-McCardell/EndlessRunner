import * as THREE from 'three';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, 600 / 300, 0.1, 1000);
camera.position.z = 5;

// Set up the renderer with white background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(600, 300);
renderer.setClearColor(0xffffff, 1); // Set the background color to white
document.body.appendChild(renderer.domElement);

// Create blocks
const blockGeometry = new THREE.BoxGeometry(1, 1, 0);
const blockMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const blocks = [];

for (let i = 0; i < 5; i++) {
    const block = new THREE.Mesh(blockGeometry, blockMaterial);
    block.position.x = i * 1.5; // Adjust spacing between blocks
    scene.add(block);
    blocks.push(block);
}

// Create player object
const playerGeometry = new THREE.BoxGeometry(1, 1, 0);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// Set up animation
const animate = function () {
    requestAnimationFrame(animate);

    // Move blocks from right to left
    blocks.forEach((block) => {
        block.position.x -= 0.01; // Adjust speed
        if (block.position.x < -5) {
            block.position.x = 7; // Reset block position when it goes out of view
        }
    });

    // Update player position based on arrow key input
    const speed = 0.05;

    // Check arrow key status
    const leftArrow = 37;
    const rightArrow = 39;
    const isLeftArrowPressed = keys[leftArrow];
    const isRightArrowPressed = keys[rightArrow];

    // Update player position
    if (isLeftArrowPressed && player.position.x > -2.5) {
        player.position.x -= speed;
    }
    if (isRightArrowPressed && player.position.x < 2.5) {
        player.position.x += speed;
    }

    // Render the scene
    renderer.render(scene, camera);
};

// Start the animation loop
animate();

// Track pressed keys
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.keyCode] = false;
});
