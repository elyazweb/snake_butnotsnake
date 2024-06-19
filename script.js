let snakeElement = document.getElementById("snake");
let delayTime = 500;
let foodElement = document.getElementById("food");
let posX = 0;
let posY = 0;
let currentDirection = "right";
let isMoving = false;
let moveInterval;
let initialStartX = 1000;
let updateIntervalX = 300;
let dividerValue = 1;
let multiplierValue = 0.5;
let scoreElement = document.getElementById("score");
let bestScoreElement = document.getElementById("best");
let highestScore;
let gameOverElements = document.getElementsByClassName("gameOver");
highestScore = localStorage.getItem("highestScore") || 0;
console.log(highestScore);
bestScoreElement.innerText = highestScore;

let snakePartsArray = [{ element: snakeElement, x: 0, y: 0 }];

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && currentDirection !== "down") {
        currentDirection = "up";
    } else if (e.key === "ArrowDown" && currentDirection !== "up") {
        currentDirection = "down";
    } else if (e.key === "ArrowLeft" && currentDirection !== "right") {
        currentDirection = "left";
    } else if (e.key === "ArrowRight" && currentDirection !== "left") {
        currentDirection = "right";
    }
});

function moveTheSnake() {
    let newHeadPosition = { x: posX, y: posY };
    if (currentDirection === "up") {
        newHeadPosition.y -= 50;
    } else if (currentDirection === "down") {
        newHeadPosition.y += 50;
    } else if (currentDirection === "left") {
        newHeadPosition.x -= 50;
    } else if (currentDirection === "right") {
        newHeadPosition.x += 50;
    }

    if (newHeadPosition.x < 0 || newHeadPosition.x > 450 || newHeadPosition.y < 0 || newHeadPosition.y > 450) {
        gameOver();
        return;
    }

    snakePartsArray.unshift({ element: null, x: newHeadPosition.x, y: newHeadPosition.y });
    posX = newHeadPosition.x;
    posY = newHeadPosition.y;

    if (!hasEatenFood(newHeadPosition)) {
        let tailEnd = snakePartsArray.pop();
        tailEnd.element.remove();
    }

    updateSnakePositions();

    if (parseInt(scoreElement.innerText) === 10 * multiplierValue * dividerValue) {
        dividerValue++;
        multiplierValue *= 2;
        updateIntervalX /= 2;
        initialStartX /= 2;
        clearInterval(moveInterval);
        moveInterval = setInterval(moveTheSnake, initialStartX);
    }

    console.log(initialStartX, updateIntervalX);
}

function updateSnakePositions() {
    snakePartsArray.forEach((part, index) => {
        if (index === 0) {
            part.element = snakeElement;
        } else if (part.element === null) {
            part.element = document.createElement("div");
            part.element.classList.add("snake");
            document.body.appendChild(part.element);
        }
        part.element.style.transform = `translate(${part.x}px, ${part.y}px)`;
    });
    updateScore();
}

function hasEatenFood(head) {
    let foodXPosition = parseInt(foodElement.style.transform.split('(')[1].split(',')[0]);
    let foodYPosition = parseInt(foodElement.style.transform.split(' ')[1]);
    if (head.x === foodXPosition && head.y === foodYPosition) {
        scoreElement.innerText = parseInt(scoreElement.innerText) + 1;
        if (parseInt(scoreElement.innerText) > highestScore) {
            highestScore = parseInt(scoreElement.innerText);
            localStorage.setItem("highestScore", highestScore);
            bestScoreElement.innerText = highestScore;
        }
        placeTheFood();
        createNewBlocks();
        return true;
    }
    return false;
}

function placeTheFood() {
    let foodXPosition = Math.floor(Math.random() * 10) * 50;
    let foodYPosition = Math.floor(Math.random() * 10) * 50;
    console.log("food", foodXPosition, foodYPosition);
    foodElement.style.transform = `translate(${foodXPosition}px, ${foodYPosition}px)`;
    foodElement.style.opacity = "0";
    foodElement.style.opacity = "1";
}

function startTheGame() { 
    snakePartsArray = [{ element: snakeElement, x: 0, y: 0 }];
    posX = 0;
    posY = 0;
    currentDirection = "right";
    isMoving = true;
    clearInterval(moveInterval);
    moveInterval = setInterval(moveTheSnake, initialStartX);
    scoreElement.innerText = "0";
    gameOverElements[0].style.opacity = "0";
    placeTheFood();
}

function gameOver() {
    gameOverElements[0].style.opacity = "1";
    clearInterval(moveInterval);
    isMoving = false;
    location.reload();
}

document.addEventListener("keydown", (e) => {
    if ((e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") && !isMoving) {
        isMoving = true;
        startTheGame();
    }
});


function updateScore() {
    let snakePosition = snake.style.transform;
    let foodPosition = food.style.transform;
    console.log(snakePosition, foodPosition);
    if (snakePosition === foodPosition) {
        newBlocks();
        score.innerText = parseInt(score.innerText) + 1;
        console.log(score.innerText);
        if (parseInt(score.innerText) > bestScore) {
            bestScore = parseInt(score.innerText);
            localStorage.setItem("bestScore", bestScore);
            best.innerText = bestScore;
        }
        setTimeout(() => {
            placeFood();
        }, updateX);
    }
}