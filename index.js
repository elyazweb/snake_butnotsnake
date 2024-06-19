document.addEventListener('DOMContentLoaded', () => {
    let snake = document.getElementById("snake");
    let food = document.getElementById("food");
    let x = 0;
    let y = 0;
    let direction = "right";
    let moving = false;
    let timeoutId;
    let startX;
    let updateX;
    let score = document.getElementById("score");
    let best = document.getElementById("best");
    let bestScore;
    let gameOverSign = document.getElementsByClassName("gameOver")[0];

    bestScore = localStorage.getItem("bestScore") || 0;
    best.innerText = bestScore;


    let settingColorOrLogo = parseInt(localStorage.getItem("settingColorOrLogo")) || 1;
    let speedMultiplier = parseFloat(localStorage.getItem("speedMultiplier")) || 1;
    let gradient = localStorage.getItem("gradient") || "transparent";
    let gradient2 = localStorage.getItem("gradient2") || "transparent";
    let grid = localStorage.getItem("grid") === "true" || false;
    let logo = localStorage.getItem("logo") || "the_snake.png";
    let colorLine = localStorage.getItem("colorLine") || "#000000";
    let colorOfBackground = localStorage.getItem("colorOfBackground") || "#000000";
    let backgroundColor = localStorage.getItem("backgroundColor") || "transparent";
    const square = document.getElementsByClassName("square")[0];
    const squares = document.getElementsByClassName("squares")[0];


    updateX = 800 / speedMultiplier;
    startX = 600 / speedMultiplier;

    document.getElementById("speed").value = speedMultiplier;
    document.getElementById("gradient").value = gradient;
    document.getElementById("gradient2").value = gradient2;
    document.getElementById("grid").checked = grid;
    document.getElementById("grid-color").value = colorOfBackground;
    document.getElementById("background").value = backgroundColor;

    function applySetting() {
        console.log("Applying setting");
        console.log("yeah, shit's bad",grid);
        if (grid) {
            console.log("Applying grid");
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor}  98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
        } else {
            console.log("Nope, not applying grid");
            square.style.background = "transparent";
            squares.style.background = "transparent";
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
        }

        if (backgroundColor) {
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor} 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            document.getElementById("background2").innerText = backgroundColor;
        }
        
        if (colorOfBackground) {
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor} 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            square.style.border = `1px solid ${colorOfBackground}`;
            document.getElementById("border").innerText = colorOfBackground;
        }


        
        if (settingColorOrLogo === 1) {
            logo = localStorage.getItem("logo") || "the_snake.png";
            snake.style.backgroundImage = `url(${logo})`;
            snake.style.backgroundColor = "transparent";
            snake.style.border = `2px solid black`;
            console.log("it's working");

        } else if (settingColorOrLogo === 2) {
            colorLine = localStorage.getItem("colorLine") || "#000000";
            snake.style.backgroundColor = colorLine;
            snake.style.backgroundImage = "none";
            snake.style.border = `2px solid black`;
            console.log("fuck yeah");

        } else if (settingColorOrLogo === 3) {
            gradient = localStorage.getItem("gradient") || "transparent";
            gradient2 = localStorage.getItem("gradient2") || "transparent";
            snake.style.background = `linear-gradient(to right, ${gradient}, ${gradient2})`;
            snake.style.backgroundImage = "none";
            snake.style.backgroundColor = "transparent";
            console.log("fuuuuuuuck");
        }
    }

    applySetting();

    // Event listener for speed change
    document.getElementById("speed").addEventListener("change", (e) => {
        speedMultiplier = parseFloat(e.target.value);
        updateX = 800 / speedMultiplier;
        startX = 600 / speedMultiplier;
        localStorage.setItem("speedMultiplier", speedMultiplier);
    });

    // Event listener for gradient change
    document.getElementById("gradientSubmit").addEventListener("click", (e) => {
        gradient = document.getElementById("gradient").value;
        gradient2 = document.getElementById("gradient2").value;
        snake.style.background = `linear-gradient(to right, ${gradient}, ${gradient2})`;
        localStorage.setItem("gradient", gradient);
        localStorage.setItem("gradient2", gradient2);
        settingColorOrLogo = 3;
        localStorage.setItem("settingColorOrLogo", settingColorOrLogo);
        console.log(settingColorOrLogo);
    });

    // Event listener for color selection
    document.querySelector('.singleColors').addEventListener("click", (e) => {
        if (e.target.classList.contains("color")) {
            color = e.target.value;
            snake.style.backgroundImage = `url("")`;
            snake.style.backgroundColor = color;
            localStorage.setItem("colorLine", color);
            settingColorOrLogo = 2;
            localStorage.setItem("settingColorOrLogo", settingColorOrLogo);
            console.log(settingColorOrLogo);
        }
    });

    // Event listener for logo selection
    document.querySelector(".logos").addEventListener("click", (e) => {
        if (e.target.classList.contains("logo")) {
            const clickedLogo = e.target;
            console.log(clickedLogo);
            logo = clickedLogo.style.backgroundImage.slice(4, -1).replace(/"/g, '');
            snake.style.backgroundImage = `url(${logo})`;
            console.log(logo);
            snake.style.backgroundColor = "transparent";
            localStorage.setItem("logo", logo);
            settingColorOrLogo = 1;
            localStorage.setItem("settingColorOrLogo", settingColorOrLogo);
            console.log(settingColorOrLogo);
        }
    });

    // Event listener for toggling the grid display
    document.getElementById("grid").addEventListener("change", (e) => {
        grid = e.target.checked;
        console.log(grid);
        const square = document.getElementsByClassName("square")[0];
        const squares = document.getElementsByClassName("squares")[0];

        if (grid) {
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor}  98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            square.style.border = "1px solid ${colorOfBackground}";
            console.log("Hell Yeah");
        } else {
            square.style.background = "transparent";
            squares.style.background = "transparent";
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            square.style.border = "1px solid ${colorOfBackground}";
            console.log("Shit, Fuck");
        }

        localStorage.setItem("grid", grid);
        console.log(grid);
    });

    // Event listener for grid color change
    document.getElementById("grid-color").addEventListener("change", (e) => {
        colorOfBackground = e.target.value;
        const square = document.getElementsByClassName("square")[0];
        const squares = document.getElementsByClassName("squares")[0];

        if (colorOfBackground) {
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor} 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            square.style.border = `1px solid ${colorOfBackground}`;
            document.getElementById("border").innerText = colorOfBackground;
        }
        localStorage.setItem("colorOfBackground", colorOfBackground);
    });

    // Event listener for background color change
    document.getElementById("background").addEventListener("change", (e) => {
        backgroundColor = e.target.value;
        const square = document.getElementsByClassName("square")[0];
        const squares = document.getElementsByClassName("squares")[0];

        if (backgroundColor) {
            square.style.background = `linear-gradient(to bottom, ${colorOfBackground} 0%, ${colorOfBackground} 2%, ${backgroundColor} 2%, ${backgroundColor} 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            squares.style.background = `linear-gradient(to right, ${colorOfBackground} 0%, ${colorOfBackground} 2%, transparent 2%, transparent 98%, ${colorOfBackground} 98%, ${colorOfBackground} 100%)`;
            square.style.backgroundSize = "50px 50px";
            squares.style.backgroundSize = "50px 50px";
            document.getElementById("background2").innerText = backgroundColor;
        }
        localStorage.setItem("backgroundColor", backgroundColor);
    });

    // Event listener for arrow keys to control the snake
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction !== "down") {
            direction = "up";
        } else if (e.key === "ArrowDown" && direction !== "up") {
            direction = "down";
        } else if (e.key === "ArrowLeft" && direction !== "right") {
            direction = "left";
        } else if (e.key === "ArrowRight" && direction !== "left") {
            direction = "right";
        } else if (e.key === " ") {
            if (moving) {
                pause();
            } else {
                resume();
            }
        }
    });



    let touchstartX = 0;
    let touchstartY = 0;
    document.addEventListener("touchstart", (e) => {
        touchstartX = e.touches[0].clientX;
        touchstartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
        if (!moving) {
            start();
            moving = true;
            body = document.getElementsByTagName("body")[0];
            body.style.overflow = "hidden";
        }
        let touchendX = e.changedTouches[0].clientX;
        let touchendY = e.changedTouches[0].clientY;
        let deltaX = touchendX - touchstartX;
        let deltaY = touchendY - touchstartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0 && direction !== "left") {
                direction = "right";
            } else if (deltaX < 0 && direction !== "right") {
                direction = "left";
            }
        } else {
            if (deltaY > 0 && direction !== "up") {
                direction = "down";
            } else if (deltaY < 0 && direction !== "down") {
                direction = "up";
            }
        }
    });

    function moveSnake() {
        if (direction === "up" && y > 0) {
            y -= 50;
        } else if (direction === "down" && y < 450) {
            y += 50;
        } else if (direction === "left" && x > 0) {
            x -= 50;
        } else if (direction === "right" && x < 450) {
            x += 50;
        } else {
            gameOver();
            return;
        }
        snake.style.transition = `transform ${updateX}ms`;
        snake.style.transform = `translate(${x}px, ${y}px)`;
        scoreUpdate();
        timeoutId = setTimeout(moveSnake, updateX);
    }

    function placeFood() {
        let foodX = Math.floor(Math.random() * 10) * 50;
        let foodY = Math.floor(Math.random() * 10) * 50;
        food.style.transform = `translate(${foodX}px, ${foodY}px)`;
        food.style.opacity = "0";
        food.style.opacity = "1";
    }

    function scoreUpdate() {
        let snakePosition = snake.style.transform;
        let foodPosition = food.style.transform;
        if (snakePosition === foodPosition) {
            score.innerText = parseInt(score.innerText) + 1;
            if (parseInt(score.innerText) > bestScore) {
                bestScore = parseInt(score.innerText);
                localStorage.setItem("bestScore", bestScore);
                best.innerText = bestScore;
            }
            setTimeout(() => {
                placeFood();
            }, startX); // Delay before creating new block and placing food
        }
    }

    function start() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        snake.style.transform = "translate(0px, 0px)";
        direction = "right";
        x = 0;
        y = 0;
        moving = true;
        clearTimeout(timeoutId);
        moveSnake();
        score.innerText = "0";
        gameOverSign.style.opacity = "0";
        placeFood();
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    function gameOver() {
        gameOverSign.style.opacity = "1";
        document.getElementsByTagName("body")[0].style.overflow = "scroll";
        setTimeout(() => {
            clearTimeout(timeoutId);
            moving = false;
            location.reload();
            gameOverSign.style.opacity = "0";
        }, 1000);
        applySetting();
    }

    // Start the game on any arrow key press if not already moving
    document.addEventListener("keydown", (e) => {
        if ((e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") && !moving) {
            moving = true;
            start();
        }
    });

    document.querySelector("#start").addEventListener("click", () => {
        moving = true;
        start();
    });

    document.querySelector("#pause").addEventListener("click", () => {
        pause();
        let pauseBtn = document.querySelector("#buttons");
        pauseBtn.innerHTML = `<button class="start" id="start">Start</button><button class="start" id="resume">Resume</button>`;
        document.querySelector("#resume").addEventListener("click", () => {
            resume();
            let resumeBtn = document.querySelector("#buttons");
            resumeBtn.innerHTML = `<button class="start" id="start">Start</button><button class="start" id="pause">Pause</button>`;
        });
    });



    function pause() {
        clearTimeout(timeoutId);
        moving = false;
    }

    function resume() {
        if (!moving) {
            moving = true;
            moveSnake();
        }
        if (food.style.opacity === "0") {
            placeFood();
        }
    }
});




const fileInput = document.getElementById('text');
const downloadBtn = document.getElementById('submit');

downloadBtn.addEventListener('click', (e) => {
    snake.style.background = `url(${fileInput.value})`;
    snake.style.backgroundColor = "transparent";
    snake.style.backgroundSize = "cover";
    console.log(fileInput.value);
});
