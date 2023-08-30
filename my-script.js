// Create an array with palette variations
// I want to add this functional later
const colourValues = [
    '#EDEEC9', '#DDE7C7', '#BFD8BD', '#98C9A3', '#77BFA3'
];

// Get the palette container element
const memoryGameContainer = document.querySelector('.container');
// Get the array of tiles
const tiles = document.querySelectorAll('.tile')

window.addEventListener('load', () => {
    // Set random background colors for each tile
    tiles.forEach(tile => {
        const randomColor = getRandomColour()
        tile.style.backgroundColor = randomColor;

        // Set the color name at the bottom of the tile
        const colorNameElement = tile.querySelector('.color-name');
        colorNameElement.textContent = randomColor;

        const colorPicker = tile.querySelector('input[type="color"]');
        colorNameElement.addEventListener('click', function() {
            colorPicker.click(); // Automatically open color picker

            colorPicker.addEventListener('input', function() {
                tile.style.backgroundColor = colorPicker.value;
                colorNameElement.textContent = colorPicker.value;
            }); // Set tile background color
        });
    });
});

// Function to generate a random colour
function getRandomColour() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

