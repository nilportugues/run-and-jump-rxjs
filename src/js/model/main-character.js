import {Circle} from "./circle";
import {Rectangle} from "./rectangle";
import {Sprite} from "./sprite";

const maxJumpHeight = 160;
const sourceConfig = {
    width: 74,
    height: 96,
    image: '../../../assets/sprites/bonk.png',
    frameSpeed: 10,
    actions: {
        jump: {length: 3, y: 203, auto: false},
        run: {length: 4, y: 103, auto: true}
    },
    defaultAction: 'run'
};

export class MainCharacter extends Sprite {
    constructor(canvas) {
        super(
            canvas,
            70,
            80,
            sourceConfig
        );
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.setAction('jump');
            this.currentJumpHeight = 0.0;
            this.currentDirection = 'up';
        }
    }

    moveToNextPosition(deltaTime) {
        if (this.jumping) {
            let movement;
            if (this.currentJumpHeight >= maxJumpHeight) {
                this.currentDirection = 'down';
                this.currentFrame = 2;
            }

            if (this.currentDirection == 'up') {
                movement = -200 * deltaTime;

                if (this.currentJumpHeight >= 20 && this.currentFrame != 1) {
                    this.currentFrame = 1;
                }
            } else {
                movement = +200 * deltaTime;
            }

            movement = Math.floor(movement);
            this.move(0, movement);
            this.currentJumpHeight -= movement;

            if (this.currentJumpHeight <= 0) {
                this.jumping = false;
                this.setAction('run');
                this.y = this.canvas.height - this.height - 20;
            }

        }
    }
}