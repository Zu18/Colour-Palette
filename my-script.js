
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

function openColorPickerAndSetBackground(tile, colorNameElement, colorPicker) {

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
    const container = document.querySelector('.container');
  
    for (let i = 0; i < 5; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
  
      // Create the color buttons container
      const colorBtns = document.createElement('div');
      colorBtns.classList.add('color-btns');
  
      // Create the remove button
      const removeBtn = document.createElement('div');
      removeBtn.classList.add('remove-btn');
      removeBtn.innerHTML = '<i class="fa fa-times"></i>';
  
      // Create the add-tile button
      const addTileBtn = document.createElement('div');
      addTileBtn.classList.add('add-tile');
      addTileBtn.innerHTML = '<i class="fa fa-plus"></i>';
  
      // Create the drag button
      const dragBtn = document.createElement('div');
      dragBtn.classList.add('drag-btn');
      dragBtn.innerHTML = '<i class="fa fa-arrows-h"></i>';
  
      // Append color buttons to the tile
      colorBtns.appendChild(removeBtn);
      colorBtns.appendChild(addTileBtn);
      colorBtns.appendChild(dragBtn);
  
      // Create the color picker input
      const colorPicker = document.createElement('input');
      colorPicker.type = 'color';
      colorPicker.classList.add('color-picker');
  
      // Create the color name div
      const colorNameElement = document.createElement('div');
      colorNameElement.classList.add('color-name');

      // Set random background colors for each tile
      const randomColor = getRandomColour();
      setTileBackgroundColor(tile, randomColor);

      // Set the color name at the bottom of the tile
      setColorName(colorNameElement, randomColor);

      // Add functionality to change the color of tile
      openColorPickerAndSetBackground(tile, colorNameElement, colorPicker)
  
      // Append all elements to the tile
      tile.appendChild(colorBtns);
      tile.appendChild(colorPicker);
      tile.appendChild(colorNameElement);

      // Append the tile to the container
      container.appendChild(tile);
    }

  }
  

// Main code
document.addEventListener('DOMContentLoaded', function () {
    initializeTiles();

    // Add the buttons that allows to remove tiles
    removeTile();

    // Swap tiles by moving the tiles, drag-btn is informational
    const tiles = document.querySelectorAll('.tile');
    dragAndDropTiles(tiles);
    

    // addTile();
});

