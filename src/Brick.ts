import Ball from "./Ball";
import GameUnit from "./GameUnit";
import config from "./config";
import { ECollisionSides, TBrickInitParams, TPosition, TSize } from "./types";

class Brick extends GameUnit {
    isShowed = true;
    count: number;
    row: number;
    col: number;

    constructor(canvas: HTMLCanvasElement, params: TBrickInitParams) {
        super(canvas);
        const { count, row, col } = params;
        this.count = count;
        this.row = row;
        this.col = col;
        this.init();
    }

    init = () => {
        const { width, height } = this.getSize();
        this.width = width;
        this.height = height;

        const { x, y } = this.getInitialPosition();
        this.x = x;
        this.y = y;
    };

    draw = () => {
        if (this.isShowed) {
            const { x, y, width, height } = this;
            this.ctx.fillStyle = config.brick.color;
            this.ctx.fillRect(x, y, width, height);
        }
    };

    getSize(): TSize {
        const offset = Math.round(this.canvas.width / (this.count + 1) / 5);
        const width = Math.round((this.canvas.width - offset * (this.count + 1)) / this.count);
        const height = Math.round(width / config.brick.widthToHeightRatio);
        return { width, height };
    }

    getInitialPosition = () => {
        const offset = Math.round(this.canvas.width / (this.count + 1) / 5);
        return {
            x: offset + this.col * (this.width + offset),
            y: offset + this.row * (this.height + offset),
        };
    };

    setSides = ({ x, y }: TPosition) => {
        this.sides = {
            top: y,
            right: x + this.width,
            bottom: y + this.height,
            left: x,
        };
    };

    checkBallCollision = (ball: Ball) => {
        if (this.isShowed) {
            // distance from ball to
            const distX = Math.abs(ball.x - this.x - this.width / 2);
            const distY = Math.abs(ball.y - this.y - this.height / 2);

            if (distX > this.width / 2 + ball.radius) {
                return null;
            }
            if (distY > this.height / 2 + ball.radius) {
                return null;
            }
            if (distX <= this.width / 2) {
                return ECollisionSides.vertical;
            }
            if (distY <= this.height / 2) {
                return ECollisionSides.horizontal;
            }
        }
        return null;
    };
}

export default Brick;
