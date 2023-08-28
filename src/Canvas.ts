import Ball from "./Ball";
import Bricks from "./Bricks";
import Platform from "./Platform";
import config from "./config";
import { ECollisionSides, ESides, TLevel, TPressedBtn } from "./types";

const levels: TLevel[] = [
    {
        matrix: [
            [true, true, true, true, true],
            [true, true, true, true, true],
            [false, true, true, true],
        ],
    },
];

/* document.addEventListener("mousemove", e => console.log(e.clientX, e.clientY)); */

class Canvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pressedBtn: TPressedBtn = null;
    animationId: number | null = null;
    bricks: Bricks;
    ball: Ball;
    platform: Platform;

    constructor() {
        this.canvas = this.getCanvas();
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ball = new Ball(this.canvas);
        this.platform = new Platform(this.canvas);
        this.bricks = new Bricks(this.canvas, levels[0]);

        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
        window.addEventListener("mousemove", this.mouseMoveHandler);
        this.init();
    }

    init = () => {
        this.canvas.focus();

        this.draw();
    };

    draw = () => {
        this.stopAnimation();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.pressedBtn) {
            this.platform.moveButton(this.pressedBtn);
        }

        if (this.ball.isMoving) {
            this.moveBall();
        }

        this.platform.draw();
        this.ball.draw();
        this.bricks.draw();

        this.animationId = requestAnimationFrame(this.draw);
    };

    moveBall = () => {
        const reachedWall = this.ball.getReachedWall();

        if (reachedWall === ESides.bottom || this.bricks.isAllBricksHidden) {
            this.stopGame();
            return;
        }

        if (reachedWall) {
            this.ball.switchDirectionBySide(reachedWall);
        }

        this.checkBrickReached();

        this.checkPlatformReached();

        this.ball.move();
    };

    checkPlatformReached = () => {
        const collisionSide = this.platform.checkBallCollision(this.ball);

        if (collisionSide) {
            this.ball.switchDirection(collisionSide);
            if (collisionSide === ECollisionSides.vertical) {
                // change speed & angle ball
                console.log(this.platform.speed);

                const speedFactor = () => {
                    let speed = Math.abs(this.platform.speed);
                    if (speed < 1) {
                        speed++;
                    }

                    if (speed > 1.7) return 1.7;

                    return speed;
                };

                // платформа двигалась влево и шар
                if (this.platform.speed < 0 && this.ball.direction.x === ESides.left) {
                    this.ball.dx = config.ball.dx;
                    this.ball.dy = 2;
                    this.ball.speed = speedFactor();
                }

                // платформа двигалась вправо и шар
                if (this.platform.speed > 0 && this.ball.direction.x === ESides.right) {
                    this.ball.dx = config.ball.dx;
                    this.ball.dy = 2;
                    this.ball.speed = speedFactor();
                }

                // платформа двигалась влево а шар вправо
                if (this.platform.speed < 0 && this.ball.direction.x === ESides.right) {
                    this.ball.dy = config.ball.dy;
                    this.ball.dx = 2;
                    this.ball.speed = config.ball.speed;
                }

                // платформа двигалась вправо а шар влево
                if (this.platform.speed > 0 && this.ball.direction.x === ESides.left) {
                    this.ball.dy = config.ball.dy;
                    this.ball.dx = 2;
                    this.ball.speed = config.ball.speed;
                }
            }
        }
    };

    checkBrickReached = () => {
        const collisionSide = this.bricks.checkBallCollision(this.ball);
        if (collisionSide) {
            this.ball.switchDirection(collisionSide);
        }
    };

    resizeHandler = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
    };

    keyDownHandler = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase().replace("arrow", "");

        if (key === "left" || key === "right") {
            if (this.pressedBtn || !this.ball.isMoving) return;
            this.pressedBtn = key === "left" ? ESides.left : ESides.right;
        }
        if (key === " ") {
            this.ball.isMoving = true;
        }
    };

    keyUpHandler = () => {
        this.pressedBtn = null;
    };

    mouseMoveHandler = (e: MouseEvent) => {
        if (!this.ball.isMoving) return;
        this.platform.moveMouse(e.x);
    };

    stopAnimation = () => {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    };

    stopGame = () => {
        this.ball.init();
        this.platform.init();
        this.bricks.init();
        this.draw();
    };

    getCanvas = () => document.querySelector("canvas") as HTMLCanvasElement;
}

export default Canvas;
