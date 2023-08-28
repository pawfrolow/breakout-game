import Ball from "./Ball";
import Brick from "./Brick";
import { TBrickInitParams, TLevel } from "./types";

class Bricks {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    bricks: Brick[][] = [];
    level: TLevel;

    constructor(canvas: HTMLCanvasElement, level: TLevel) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.level = level;
        this.init();
    }

    init = () => {
        this.bricks = [];
        this.level.matrix.forEach((row, rowIdx) => {
            this.bricks.push([]);
            row.forEach((isExist, colIdx) => {
                if (isExist) {
                    const params: TBrickInitParams = {
                        count: Math.max(...this.level.matrix.map(r => r.length)),
                        row: rowIdx,
                        col: colIdx,
                    };
                    this.bricks[rowIdx].push(new Brick(this.canvas, params));
                }
            });
        });
    };

    draw = () => {
        this.bricks.forEach(r => {
            r.forEach(c => c.draw());
        });
    };

    get isAllBricksHidden() {
        return this.bricks.every(row => row.every(brick => !brick.isShowed));
    }

    checkBallCollision = (ball: Ball) => {
        for (let idxRow = 0; idxRow < this.bricks.length; idxRow++) {
            for (let idxCol = 0; idxCol < this.bricks[idxRow].length; idxCol++) {
                const brick = this.bricks[idxRow][idxCol];
                const collisionSide = brick.checkBallCollision(ball);

                if (collisionSide) {
                    brick.isShowed = false;
                    return collisionSide;
                }
            }
        }

        return null;
    };
}

export default Bricks;
