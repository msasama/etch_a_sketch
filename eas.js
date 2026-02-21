let container = document.querySelector('.container');
let btn = document.querySelector('.size');
let clearBtn = document.querySelector('.clear');

/*
Generates a random RGB color string
*/
function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

/*
Builds the grid based on the size provided
*/
function createGrid(size) {
    // Wipe the container clean first
    container.innerHTML = ""; 
    let totalCells = size * size;

    for (let i = 0; i < totalCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Flexbox math: 100% divided by the number of columns/rows
        cell.style.width = `calc(100% / ${size})`;
        cell.style.height = `calc(100% / ${size})`;
        
        // Add the random color on hover
        cell.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = getRandomColor();
        });
        
        container.appendChild(cell);
    }
}

/*
Initialize the default 16x16 grid as soon as the page loads
*/
createGrid(16);

/*
Prompt for new grid size when NxM button is clicked
*/
btn.addEventListener('click', () => {
    let newSize = prompt("Enter number of squares per side (max 100):");
    
    // Check if user clicked Cancel or left it blank
    if (newSize !== null && newSize !== "") {
        newSize = parseInt(newSize);
        
        // TOP requirement: Cap it at 100 to prevent crashing
        if (newSize > 100) {
            alert("Please enter a number 100 or less!");
        } else if (newSize > 0) {
            createGrid(newSize);
        } else {
            alert("Please enter a valid positive number.");
        }
    }
});

/*
Clear the board by removing the background colors
*/
clearBtn.addEventListener('click', () => {
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = ''; 
    });
});




/*
Exactly. When you use a percentage in CSS for width and height, it is calculated relative to the content box of the parent element.

In my project, the parent is the .container div. Since I set the container to a fixed 600px by 600px, 100% in the child elements (.cell) refers to those 600 pixels.

How the math works
When I use calc(100% / ${size}), the browser does the following:

Identifies the Parent: It sees that .cell is inside .container.
Gets the Pixels: It looks at .container and sees it is 600px.
Does the Division:
If I chose 16 squares: 600 / 16 = 37.5px. Each cell becomes 37.5px wide.
If I chose 64 squares: 600 / 64 = 9.375px. Each cell shrinks to fit.
If I chose 100 squares: 600 / 100 = 6px. The cells become tiny "pixels."

Why flex-wrap: wrap is necessary
By default, Flexbox tries to put all items in one single line (the "row"). If I have 256 cells (for a 16x16 grid), Flexbox would try to squish all 256 of them into one horizontal line, making them incredibly skinny.

By adding flex-wrap: wrap; to the .container, I am telling the browser:
"If a cell is too wide to fit in the remaining space of the current row, push it down to the next line."

Because I set the width of each cell to exactly 1/16th (or 1/Nth) of the container's width, exactly 16 cells will fit perfectly on one line before the 17th cell is forced to "wrap" to the next row. This creates the perfect grid look without needing to create separate "row" divs.

Important: The "Box-Sizing" Rule
In the CSS, I included box-sizing: border-box;. This is vital for the math to stay perfect.

Without it: If my cell is 10% wide + a 1px border, the total width is 10% + 2px. That extra 2px will make the 10th cell too wide to fit, and it will drop to the next line, ruining my grid.
With it: The 1px border is included inside the width. So the cell stays exactly 10% wide, and the grid stays perfectly aligned.
*/
