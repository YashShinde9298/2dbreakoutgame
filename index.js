const grid = document.querySelector('.grid');
const score = document.querySelector('#score');
const refreshBtn = document.getElementById('refreshBtn');

const blockWidth = 100;
const blockHeight = 20;
const boardHeight = 400;
const boardWidth = 680;
const ballDia = 20;

let directionX = -2;
let directionY = 2;
let scores = 0;
let timerId;


const userPos = [280, 10];
let currentPos = userPos;

const ballPos = [300, 30];
let ballCurrentPos = ballPos;



class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 370),
    new Block(120, 370),
    new Block(230, 370),
    new Block(340, 370),
    new Block(450, 370),
    new Block(560, 370),
    new Block(10, 340),
    new Block(120, 340),
    new Block(230, 340),
    new Block(340, 340),
    new Block(450, 340),
    new Block(560, 340),
    new Block(10, 310),
    new Block(120, 310),
    new Block(230, 310),
    new Block(340, 310),
    new Block(450, 310),
    new Block(560, 310),
    new Block(10, 280),
    new Block(120, 280),
    new Block(230, 280),
    new Block(340, 280),
    new Block(450, 280),
    new Block(560, 280),
    new Block(230, 250),
    new Block(340, 250)
]

function createBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

createBlocks();


const user = document.createElement('div');
user.classList.add('user');

function drawUser() {
    user.style.left = currentPos[0] + 'px';
    user.style.bottom = currentPos[1] + 'px';
}
drawUser();
grid.appendChild(user);


const ball = document.createElement('div');
ball.classList.add('ball');

function drawBall() {
    ball.style.left = ballCurrentPos[0] + 'px';
    ball.style.bottom = ballCurrentPos[1] + 'px';
}
drawBall();
grid.appendChild(ball);


function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPos[0] > 0) {
                currentPos[0] -= 10;
                drawUser();
            }
            break;

        case 'ArrowRight':
            if (currentPos[0] < boardWidth - blockWidth) {
                currentPos[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

function moveBall() {
    ballCurrentPos[0] += directionX;
    ballCurrentPos[1] += directionY;
    drawBall();
    checkForCollision();
}

timerId = setInterval(moveBall, 20);


function checkForCollision() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPos[0] > blocks[i].bottomLeft[0]
                && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDia) > blocks[i].bottomLeft[1]
                && ballCurrentPos[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            scores++;
            score.innerHTML = `Score : ${scores}`;


            if (blocks.length === 0) {
                score.innerHTML = `You won!`;
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    if (ballCurrentPos[0] >= (boardWidth - ballDia) || ballCurrentPos[1] >= (boardHeight - ballDia) || ballCurrentPos[0] <= 0) {
        changeDirection();
    }

    if ((ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0] < currentPos[0] + blockWidth)
        && (ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] + blockHeight)) {
        changeDirection()
    }

    if (ballCurrentPos[1] <= 0) {
        clearInterval(timerId);
        score.innerHTML = "You lose!";
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection() {
    if (directionX === 2 && directionY === 2) {
        directionY = -2;
        return;
    }
    if (directionX === 2 && directionY === -2) {
        directionX = -2;
        return;
    }
    if (directionX === -2 && directionY === -2) {
        directionY = 2;
        return;
    }
    if (directionX === -2 && directionY === 2) {
        directionX = 2;
        return;
    }
}

refreshBtn.addEventListener('click', function () {
    location.reload();
});