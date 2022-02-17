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
    const livesDisplay = document.querySelector("#lives");
    const scoreInput = document.querySelector("#user_score")
    const livesInput = document.querySelector("#user_lives")
    const width = 28; //28 x 28 = 784 squares
    let score = 0;
    let lives = 3;
    let remove_ghost_classes = ['blinky-up','blinky-down','blinky-left','blinky-right','pinky-up','pinky-down','pinky-left','pinky-right','inky-up','inky-down','inky-left','inky-right','clyde-up','clyde-down','clyde-right','clyde-right']
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
        1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
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
    squares[pacmanCurrentIndex].classList.add("pac-man-left")


    function playerMoveLeft(){
        if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex -= 1
                    squares[pacmanCurrentIndex].classList.add("pac-man-left")
                    squares[pacmanCurrentIndex+1].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-down", "pac-man-left")
                }
    }


    function playerMoveRight() {
        if (pacmanCurrentIndex % width < width-1 && !squares[pacmanCurrentIndex +1].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex += 1
                    squares[pacmanCurrentIndex].classList.add("pac-man-right")
                    squares[pacmanCurrentIndex-1].classList.remove("pac-man-left", "pac-man-up",
                        "pac-man-down", "pac-man-right")
                }
    }


    function playerMoveUp() {
        if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex -= width
                    squares[pacmanCurrentIndex].classList.add("pac-man-up")
                    squares[pacmanCurrentIndex+width].classList.remove("pac-man-right", "pac-man-left",
                        "pac-man-down", "pac-man-up")
                }
    }


    function playerMoveDown() {
        if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains("wall")
                    && !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex += width
                    squares[pacmanCurrentIndex].classList.add("pac-man-down")
                    squares[pacmanCurrentIndex-width].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-left", "pac-man-down")
                }
    }


    //move pac-man
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove("pac-man")
        //move pac-man with arrows

        switch (e.keyCode){
            case 37:  // left arrow key
                playerMoveLeft()
                //check if pacman is in the left exit
                if(pacmanCurrentIndex -1 === 363){
                    squares[pacmanCurrentIndex].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-left", "pac-man-down")
                    pacmanCurrentIndex = 391;
                    squares[pacmanCurrentIndex].classList.add("pac-man-left")
                }
                break
            case 38: // up arrow key
                playerMoveUp()
                break
            case 39: // right arrow key
                playerMoveRight()
                //check if pacman is in the right exit
                if(pacmanCurrentIndex +1 === 392) {
                    squares[pacmanCurrentIndex].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-left", "pac-man-down")
                    pacmanCurrentIndex = 364
                    squares[pacmanCurrentIndex].classList.add("pac-man-right")

                }
                break
            case 40: // down arrow key
                playerMoveDown()
                break
            //move pac-man with AWSD
            case 65:  // a key
                playerMoveLeft()
                //check if pacman is in the left exit
                if(pacmanCurrentIndex -1 === 363){
                    squares[pacmanCurrentIndex].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-left", "pac-man-down")
                    pacmanCurrentIndex = 391;
                    squares[pacmanCurrentIndex].classList.add("pac-man-left")
                }
                break
            case 87: // w key
                playerMoveUp()
                break
            case 68: // d key
                playerMoveRight()
                //check if pacman is in the right exit
                if(pacmanCurrentIndex +1 === 392) {
                    squares[pacmanCurrentIndex].classList.remove("pac-man-right", "pac-man-up",
                        "pac-man-left", "pac-man-down")
                    pacmanCurrentIndex = 364
                    squares[pacmanCurrentIndex].classList.add("pac-man-right")
                }
                break
            case 83: // s key
                playerMoveDown()
                break
        }

        squares[pacmanCurrentIndex].classList.add("pac-man")

        pacDotEaten()
        powerPelletEaten()
        getDamage()
        getNewMap()
    }


    document.addEventListener("keydown",  movePacman)

    //create ghost template
    class Ghost{
        constructor(className,startIndex,speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

    let ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('inky', 351, 300),
        new Ghost('pinky', 376, 400),
        new Ghost('clyde', 379, 500)

    ]

    //draw my ghosts on the table
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })

    //move the Ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //if the next square your ghost is going to go to does not have a ghost and does not have a wall
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          if(ghost.className == 'blinky') {
              changeGhostImg(direction,ghost)
          }
          if(ghost.className == 'pinky') {
              changeGhostImg(direction,ghost)
          }
          if(ghost.className == 'inky') {
              changeGhostImg(direction,ghost)
          }
          if(ghost.className == 'clyde') {
              changeGhostImg(direction,ghost)
          }

          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

        if (ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
            squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score+=200
            scoreDisplay.innerHTML = score.toString()
            scoreInput.value = score.toString()
            squares[ghost.currentIndex].classList.add(ghost.className,'ghost')
        }
        getDamage()
        }, ghost.speed)
     }
      function changeGhostImg(direction,ghost){
              if (direction === -1){
                  squares[ghost.currentIndex].classList.remove(`${ghost.className}-up`,`${ghost.className}-down`,`${ghost.className}-left`,`${ghost.className}-right`)
                  ghost.currentIndex += direction
                  squares[ghost.currentIndex].classList.add(`${ghost.className}-left`)
              }
              if (direction === 1){
                  squares[ghost.currentIndex].classList.remove(`${ghost.className}-up`,`${ghost.className}-down`,`${ghost.className}-left`,`${ghost.className}-right`)
                  ghost.currentIndex += direction
                  squares[ghost.currentIndex].classList.add(`${ghost.className}-right`)
              }
              if (direction === width){
                  squares[ghost.currentIndex].classList.remove(`${ghost.className}-up`,`${ghost.className}-down`,`${ghost.className}-left`,`${ghost.className}-right`)
                  ghost.currentIndex += direction
                  squares[ghost.currentIndex].classList.add(`${ghost.className}-down`)
              }
              if (direction === -width){
                  squares[ghost.currentIndex].classList.remove(`${ghost.className}-up`,`${ghost.className}-down`,`${ghost.className}-left`,`${ghost.className}-right`)
                  ghost.currentIndex += direction
                  squares[ghost.currentIndex].classList.add(`${ghost.className}-up`)
              }
          }

    // what happens when you eat a pac-dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            score += 10
            if (scoreDisplay.innerHTML === "10000"){
                lives++
                livesDisplay.innerHTML = lives.toString()
                livesInput.value = lives.toString()
            }
            scoreDisplay.innerHTML = score.toString()
            scoreInput.value = score.toString()
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
        }
    }


    function getDamage() {
        if (squares[pacmanCurrentIndex].classList.contains("ghost") && lives !== 0 &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            lives--
            restoreMap()
        } else if (lives === 0){
            checkForGameOver()
        }
    }


    function checkForGameOver() {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keydown",  movePacman)
        livesDisplay.innerHTML = "GAME OVER"
        livesInput.value = "0"
    }


    function restoreMap() {
        squares[pacmanCurrentIndex].classList.remove("pac-man-left", "pac-man-up",
                        "pac-man-down", "pac-man-right")
        livesDisplay.innerHTML = lives.toString()
        livesInput.value = lives.toString()
        pacmanCurrentIndex = 490
        squares[pacmanCurrentIndex].classList.add("pac-man-left")
        ghosts.forEach(ghost => squares[ghost.currentIndex].classList.remove("ghost", ghost.className, ...remove_ghost_classes))
        ghosts.forEach(ghost => ghost.currentIndex = ghost.startIndex)
        ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add("ghost", ghost.className))
    }


    function getNewMap(){
        const square = document.getElementsByClassName("pac-dot");
        if (square["length"] === 0){
            restoreMap()
            createBoard()

        }
    }


    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
    }

     function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score +=200
        ghosts.forEach(ghost => ghost.isScared = true)
        scoreDisplay.innerHTML = score.toString()
        scoreInput.value = score.toString()
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }


})