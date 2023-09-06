
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

    colorNameElement.addEventListener('click', function () {
        colorPicker.click(); // Automatically open color picker
    });

    // Set tile background color
    colorPicker.addEventListener('input', function () {
        const selectedColor = colorPicker.value.toUpperCase();
        setTileBackgroundColor(tile, selectedColor);
        setColorName(colorNameElement, selectedColor);
    });
}
// Remove the tile if there are more than 2 tiles left
function removeTile() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tileToRemove = button.closest('.tile');
            const tiles = document.querySelectorAll('.tile');
            if (tiles.length > 2) {
                tileToRemove.remove();
            }
        });
    });
}

// Swap tiles
function dragAndDropTiles(tiles) {
    tiles.forEach(function (tile) {
        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', handleDragStart);
        tile.addEventListener('dragover', handleDragOver);
        tile.addEventListener('dragenter', handleDragEnter);
        tile.addEventListener('dragleave', handleDragLeave);
        tile.addEventListener('dragend', handleDragEnd);
        tile.addEventListener('drop', handleDrop);
    });
}
// Swap elements (tiles)
function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';

    const items = document.querySelectorAll('.tile')
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation();

    if (dragSrcEl !== this) {
        // Swap the background colors
        const dragSrcColor = dragSrcEl.style.backgroundColor;
        const dropTargetColor = this.style.backgroundColor;

        dragSrcEl.style.backgroundColor = dropTargetColor;
        this.style.backgroundColor = dragSrcColor;

        // Swap the color names
        const dragSrcName = dragSrcEl.querySelector('.color-name').textContent;
        const dropTargetName = this.querySelector('.color-name').textContent;

        dragSrcEl.querySelector('.color-name').textContent = dropTargetName;
        this.querySelector('.color-name').textContent = dragSrcName;
    }

    return false;
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

        // Add the buttons that allows to remove tiles
        removeTile();

        // Swap tiles by moving the tiles, drag-btn is informational
        dragAndDropTiles(tiles);

    });
}

// Main code
document.addEventListener('DOMContentLoaded', function () {
    initializeTiles();
});


function addTile() {
    // Get an existing color tile to clone
    const sampleTile = document.querySelector('.tile');

    // Clone the sample tile, including child divs, classes, and styles
    const newTile = sampleTile.cloneNode(true);


    // Add the new color tile to the palette
    const palette = document.querySelector('.container')
    palette.appendChild(newTile);
}



