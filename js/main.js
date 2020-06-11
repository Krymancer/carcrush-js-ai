import { drawBackground, loadAssets } from "./image.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js"
import { random } from "./util.js";
import { createPopulation, nextGeneration } from "./aiUtil.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

/* Game variables */
let gameOver = false;

let gameTick = 101;
let newCarTick = 100;
/* End of game variables */

/* AI variables */
const totalPopulation = 1000;
let generation = 0;
let bestScore = 0;
/* End of variables */

const enemys = [];

document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowLeft') {
        player.move('LEFT');
    }

    if (event.key === 'ArrowRight') {
        player.move('RIGHT');
    }
});

loadAssets();

let { allCars, activeCars } = createPopulation(totalPopulation);

context.font = '30px Roboto-Bold';
context.fillStyle = 'white';
function update() {
    drawBackground(context);

    if (gameTick > newCarTick) {
        enemys.push(new Enemy(context));
        enemys.push(new Enemy(context));
        enemys.push(new Enemy(context));
        gameTick = random(0, 100);
    }

    enemys.forEach((enemy, index) => {
        enemy.update();

        activeCars.forEach((car, index) => {
            if (car.collide(enemy)) {
                activeCars.splice(index, 1);
            }else if(enemy.die()){
                car.score++;
            }

            car.think(enemys);
        });

        if (enemy.die()) {
            enemy.reset();
            //enemys.splice(index, 1);
        }
    });

    if(activeCars.length === 0){
        let ret = nextGeneration(allCars,activeCars,generation,enemys);
        allCars = ret.allCars;
        activeCars = ret.activeCars;
        generation = ret.generation;
    }

    enemys.forEach((enemy, index) => {
        enemy.show();
    });

    activeCars.forEach((car, index) => {
        car.show(context);
        if(car.score > bestScore){
            bestScore = car.score;
        }
    });

    if (!gameOver) {
        requestAnimationFrame(update);
    }

    context.fillText(`Generation: ${generation}`, 30,60);
    context.fillText(`Best Score: ${bestScore}`, 30,90);
    context.fillText(`Population: ${activeCars.length}`, 30,120);


}

update();