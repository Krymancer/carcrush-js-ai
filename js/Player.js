import NeuralNetwork from './NeuralNetwork.js';
import { map, mutate, random } from './util.js';

export default class Player {
    constructor(brain) {
        this.x = 36;
        this.y = 720;
        this.colors = ['blue', 'gray', 'pinck', 'pruple', 'gray'];
        this.color = this.colors[random(0, 5)]
        this.asset = new Image();
        this.asset.src = `./assets/${this.color}.png`

        this.offset = 100;

        this.height = 138;
        this.width = 70;

        this.score = 0;
        this.lift = -12;
        this.fitness = 0;

        this.left = 0;
        this.right = 0;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new NeuralNetwork(5, 10, 2);
        }
    }

    collide(enemy) {
        if (this.x === enemy.x) {
            if (this.y <= (enemy.y + enemy.height) && (this.y + this.height) > enemy.y) {
                return true;
            }
        }
    }

    show(context) {
        context.drawImage(this.asset, this.x, this.y);
    }

    move(direction) {
        if (this.x !== 36) {
            if (direction === 'LEFT') {
                this.x -= this.offset;
                this.left++;
            }
        }

        if (this.x !== 336) {
            if (direction === 'RIGHT') {
                this.x += this.offset;
                this.right++;
            }
        }
    }

    copy() {
        return new Player(this.brain);
    }

    think(enemies) {
        let inputs = [0, 1, 1, 1,0];
        // x position of closest pipe
        inputs[0] = map(this.x, 0, 509, 0, 1);

        const positions = [36, 136, 236, 336];
        const cars = [0,0,0,0];

        positions.forEach((position, index) => {
            inputs[1] -= enemies[0].x == position ? 0.33 : 0
            inputs[2] -= enemies[1].x == position ? 0.33 : 0
            inputs[3] -= enemies[2].x == position ? 0.33 : 0

            cars[index] += enemies[0].x == position ? 0.33 : 0
            cars[index] += enemies[1].x == position ? 0.33 : 0
            cars[index] += enemies[2].x == position ? 0.33 : 0

        });

        let index;

        // BruteForce
        for(let i = 0;  i< cars.length; i++){
            if(cars[i] === 0){
               index = positions[i];
                break;
            }
        }

        inputs[4] = map(index,0,3,0,1); 

        let action = this.brain.predict(inputs);

        if (action[0] > action[1]) {
            this.move('RIGHT');
        } else {
            this.move('LEFT');
        }

    }
}