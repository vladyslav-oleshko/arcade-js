let gameContainer;
let gameContext;
let ball;
let engineConfig;
let userPlatform;
let AIPlatform;
let gameField;

class Platform {
    constructor(positionX, positionY, width, height, AISpeed, score) {
        this.posX = positionX;
        this.posY = positionY;
        this.width = width;
        this.height = height;
        this.AISpeed = AISpeed;
        this.score = score;
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
        fps: 30,
        AIPlatformPadding: 35
    }

    ball = new Ball(gameContainer.width / 2, gameContainer.height / 2, 5, 0, 15, 5);
    gameField = new Platform(0, 0, gameContainer.width, gameContainer.height);
    userPlatform = new Platform(0,(gameContainer.height - 70) / 2, 5, 70, 0, 0);
    AIPlatform = new Platform(gameContainer.width - 5, (gameContainer.height - 70) / 2, 5, 100, 5, 0);
}

const resetBall = () => {
    ball.posX = gameContainer.width / 2;
    ball.posY = gameContainer.height / 2;
    ball.speedX *= -1;
}

const AIMovement = () => {
    const platformCenter = AIPlatform.posY + (AIPlatform.height / 2);

    if (platformCenter < (ball.posY - engineConfig.AIPlatformPadding)) {
        AIPlatform.posY += AIPlatform.AISpeed;
    } else if (platformCenter > (ball.posY + engineConfig.AIPlatformPadding)) {
        AIPlatform.posY -= AIPlatform.AISpeed;
    }
}

const calculateGame = () => {
    AIMovement();

    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    if (ball.posX > gameContainer.width) {
        if (ball.posY > AIPlatform.posY && ball.posY < (AIPlatform.posY + AIPlatform.height)) {
            ball.speedX *= -1;
        } else {
            userPlatform.score += 1;
            resetBall();
        }
    }

    if (ball.posX < 0) {
        if (ball.posY > userPlatform.posY && ball.posY < (userPlatform.posY + userPlatform.height)) {
            ball.speedX *= -1;
        } else {
            AIPlatform.score += 1;
            resetBall();
        }
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

const drawScore = () => {
    gameContext.fillText(userPlatform.score, 100, 100);
    gameContext.fillText(AIPlatform.score, gameContainer.width - 100, 100);
}

const drawGame = () => {
    drawRect('yellow', userPlatform); // User platform
    drawRect('yellow', AIPlatform); // AI platform
    drawCircle('yellow', ball); // Ball
    drawScore(); // Score
}

const gameEngine = () => {
    drawRect('black', gameField); // Initial field
    calculateGame();
    drawGame();
}

const calculateMousePosition = (event) => {
    const rect = gameContainer.getBoundingClientRect();
    const root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    }
}

window.onload = () => {
    gameContainer = document.getElementById('gameContainer');
    gameContext = gameContainer.getContext('2d');
    initDefaultValues();
    setInterval(gameEngine, 1000 / engineConfig.fps);
    gameContainer.addEventListener('mousemove', (event) => {
        userPlatform.posY = calculateMousePosition(event).y - userPlatform.height / 2;
    })
}
