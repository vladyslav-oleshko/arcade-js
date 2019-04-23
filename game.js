let gameContainer;
let gameContext;
let ball;
let engineConfig;
let leftPlatform;
let rightPlatform;
let gameField;

class Platform {
    constructor(positionX, positionY, width, height) {
        this.posX = positionX;
        this.posY = positionY;
        this.width = width;
        this.height = height;
    }
}

class Ball {
    constructor(positionX, positionY, radius, angle, speedX, speedY) {
        this.posX = positionX;
        this.posY = positionY;
        this.radius = radius;
        this.angle = angle;
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

const initDefaultValues = () => {
    engineConfig = {
        fps: 30
    }

    ball = new Ball(gameContainer.width / 2, gameContainer.height / 2, 5, 0, 10, 5);
    gameField = new Platform(0, 0, gameContainer.width, gameContainer.height);
    leftPlatform = new Platform(10,(gameContainer.height - 70) / 2, 5, 70);
    rightPlatform = new Platform(gameContainer.width - 10, (gameContainer.height - 70) / 2, 5, 70);
}

const calculateGame = () => {
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    if (ball.posX > (gameContainer.width - ball.radius) || (ball.posX - ball.radius) < 0) {
        ball.speedX *= -1;
    }

    if (ball.posY > (gameContainer.height - ball.radius) || (ball.posY - ball.radius) < 0) {
        ball.speedY *= -1;
    }
}

const drawRect = (color, {posX, posY, width, height}) => {
    gameContext.fillStyle = color;
    gameContext.fillRect(posX, posY, width, height);
}

const drawCircle = (color, {posX, posY, radius, angle}) => {
    gameContext.fillStyle = color;
    gameContext.beginPath();
    gameContext.arc(posX, posY, radius, angle, Math.PI * 2, true);
    gameContext.fill();
}

const drawGame = () => {
    drawRect('yellow', leftPlatform); // Left platform
    drawRect('yellow', rightPlatform); // Right platform
    drawCircle('yellow', ball); // Ball
}

const gameEngine = () => {
    drawRect('black', gameField); // Initial field
    calculateGame();
    drawGame();
}

window.onload = () => {
    gameContainer = document.getElementById('gameContainer');
    gameContext = gameContainer.getContext('2d');
    initDefaultValues();
    // Run animation
    setInterval(gameEngine, 1000 / engineConfig.fps);
}
