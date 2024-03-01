let can = document.querySelector('canvas')

let ctx = can.getContext('2d');

// each cell size is 50 harr row and column k cell ki height and width
let cellSize = 50;


let arr = [[0, 0]]; // storing the starting position 

let direction = 'right';


let gameOver = false;
// wall se touch hote hi value true ho jaye or game ruk jaye



// generating a food for snake 

let foodCordinates = generateFood(); //return me a array of axis value x and y



// calculating score
let score = 1;





// keydown ek event hai jo help kr rha hai jab tk key neeche(key down) pressed rhegi tb tk event chlega
let event = document.addEventListener('keydown', (e) => {

    // ab console karte time event k object k andr ek value hai 'key' naam se jo bata rahi hai humne konsi key press kari hai 
    // console.log(e.key)

    let key = e.key;
    if (key == 'ArrowDown') {
        direction = 'down';
    }
    else if (key == 'ArrowUp') {
        direction = 'up';

    }
    else if (key == 'ArrowLeft') {
        direction = 'left'
    }
    else {
        direction = 'right'
    }
})

function draw() {
    if (gameOver == true) {
        clearInterval(intervalID); // accept an ID to stop the setInterval function

        ctx.fillStyle = 'red'
        ctx.font = '55px monospace'
        ctx.fillText(`GAME OVER !!\n SCORE = ${score}`, 335, 335)
        return;
    }
    ctx.clearRect(0, 0, 1350, 750)
    for (let i of arr) {
        ctx.fillStyle = 'red';
        ctx.fillRect(i[0], i[1], cellSize, cellSize)
        ctx.strokeStyle = 'orange'
        ctx.strokeRect(i[0], i[1], cellSize, cellSize);
    }
    // draw food
    ctx.fillStyle = 'green'
    ctx.fillRect(foodCordinates[0], foodCordinates[1], 50, 50)

    // displaying score
    ctx.font = '24px monospace'
    ctx.fillText(`Score : ${score}`, 20, 20)
}

function update() {
    let headx = arr[arr.length - 1][0];
    let heady = arr[arr.length - 1][1];
    // // horizontal move kar rahe hain 
    // let newheadX = headx + cellSize;
    // let newHeadY = heady;

    let newheadX;
    let newHeadY;

    if (direction === 'right') {
        newheadX = headx + cellSize;
        newHeadY = heady;
        if (newheadX == 1350 || khudsetouch(newheadX, newHeadY)) {
            gameOver = true;
        }
    }
    else if (direction === 'left') {
        newheadX = headx - cellSize;
        newHeadY = heady;
        if (newheadX < 0 || khudsetouch(newheadX, newHeadY))
            gameOver = true
    }
    else if (direction === 'up') {
        newheadX = headx;
        newHeadY = heady - cellSize;
        if (newHeadY < 0 || khudsetouch(newheadX, newHeadY)) {
            gameOver = true;
        }
    }
    else {
        newheadX = headx;
        newHeadY = heady + cellSize;
        if (newHeadY == 750 || khudsetouch(newheadX, newHeadY)) {
            gameOver = true;
        }
    }


    // hum kidhr gaye vo position yaad rakhega 
    arr.push([newheadX, newHeadY]);

    if (newheadX == foodCordinates[0] && newHeadY == foodCordinates[1]) {
        foodCordinates = generateFood();
        score += 1;
    }
    else {
        // or phle wali ko chodh denge
        arr.shift();

    }


}




let intervalID = setInterval(() => {

    update();
    draw();

}, 100)






function generateFood() {

    return [
        Math.round((Math.random() * 1300) / 50) * 50,
        Math.round((Math.random() * 700) / 50) * 50

    ]

}

function khudsetouch(newheadX, newHeadY) {
    for (let i of arr) {
        if (i[0] === newheadX && i[1] == newHeadY)
            return true
    }
    return false;
}