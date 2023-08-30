// Create an array with palette variations
// I want to add this functional later
const colourValues = [
    '#EDEEC9', '#DDE7C7', '#BFD8BD', '#98C9A3', '#77BFA3'
];

function setTileBackgroundColor(tile, color) {
    tile.style.backgroundColor = color;
}

function getRandomColour() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setColorName(element, color) {
    element.textContent = color;
}

function openColorPickerAndSetBackground(tile, colorNameElement) {
    const colorPicker = tile.querySelector('input[type="color"]');

    colorNameElement.addEventListener('click', function() {
        colorPicker.click(); // Automatically open color picker
    });

    // Set tile background color
    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;
        setTileBackgroundColor(tile, selectedColor);
        setColorName(colorNameElement, selectedColor);
    });
}

function initializeTiles() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        // Set random background colors for each tile
        const randomColor = getRandomColour();
        setTileBackgroundColor(tile, randomColor);

        // Set the color name at the bottom of the tile
        const colorNameElement = tile.querySelector('.color-name');
        setColorName(colorNameElement, randomColor);

        openColorPickerAndSetBackground(tile, colorNameElement);
    });
}

// Main code
document.addEventListener('DOMContentLoaded', function() {
    initializeTiles();
});


