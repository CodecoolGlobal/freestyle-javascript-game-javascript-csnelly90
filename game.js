// initGame();
//
// function initGame() {
//
//     // Your game can start here, but define separate functions, don't write everything in here :)
//
// }

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const width = 28; //28 x 28 = 784

    // game board layout
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = [];

    // Legend
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 power-pellet
    // 4 - empty

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);

            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot");
            } else if (layout[i] === 1) {
                squares[i].classList.add("wall");
            } else if(layout[i] === 2) {
                squares[i].classList.add("ghost-lair");
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellet");
            }
        }
    }
    createBoard()

    //starting position of pac-man
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")


    //move pac-man
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove("pac-man")
        //move pac-man with arrows
        switch (e.keyCode){
            case 37:  // left arrow key
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -= 1
                //check if pacman is in the left exit
                if(pacmanCurrentIndex -1 === 363){
                    pacmanCurrentIndex = 391;
                }
                break
            case 38: // up arrow key
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair")) pacmanCurrentIndex -= width
                break
            case 39: // right arrow key
                if (pacmanCurrentIndex % width < width-1 && !squares[pacmanCurrentIndex +1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) pacmanCurrentIndex += 1
                //check if pacman is in the right exit
                if(pacmanCurrentIndex +1 === 392) {
                    pacmanCurrentIndex = 364
                }
                break
            case 40: // down arrow key
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) pacmanCurrentIndex += width
                break
            //move pac-man with awsd
            case 65:  // a key
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -= 1
                //check if pacman is in the left exit
                if(pacmanCurrentIndex -1 === 363){
                    pacmanCurrentIndex = 391;
                }
                break
            case 87: // w key
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair")) pacmanCurrentIndex -= width
                break
            case 68: // d key
                if (pacmanCurrentIndex % width < width-1 && !squares[pacmanCurrentIndex +1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) pacmanCurrentIndex += 1
                //check if pacman is in the right exit
                if(pacmanCurrentIndex +1 === 392) {
                    pacmanCurrentIndex = 364
                }
                break
            case 83: // s key
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) pacmanCurrentIndex += width
                break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        //pacDotEaten()
        //powerPelletEaten()
        //checkForGameOver()
        //checkForWin()
    }
    document.addEventListener("keyup", movePacman)

})