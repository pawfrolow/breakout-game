import GameUnit from "./GameUnit";
import config from "./config";
import {
    ECollisionSides,
    ESides,
    TBallDirection,
    TCollisionSide,
    TPosition,
    TSide,
    TSize,
} from "./types";

class Ball extends GameUnit {
    radius = 0;
    isMoving = false;
    speed = config.ball.speed;
    dx = config.ball.dx;
    dy = config.ball.dy;
    direction: TBallDirection = { x: ESides.right, y: ESides.top };

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.init();
    }

    init = () => {
        const { width, height } = this.getSize();
        this.width = width;
        this.height = height;

        this.radius = this.getBallRadius();
        const { x, y } = this.getInitialPosition();
        this.x = x;
        this.y = y;

        this.setSides({ x, y });
        this.direction = { x: ESides.right, y: ESides.top };
        this.isMoving = false;
    };

    draw = () => {
        const { x, y, radius } = this;
        this.ctx.fillStyle = config.ball.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    };

    move = () => {
        if (this.direction.x === ESides.left) {
            this.x -= this.dx * this.speed;
        }

        if (this.direction.x === ESides.right) {
            this.x += this.dx * this.speed;
        }

        if (this.direction.y === ESides.bottom) {
            this.y += this.dy * this.speed;
        }

        if (this.direction.y === ESides.top) {
            this.y -= this.dy * this.speed;
        }
    };

    getInitialPosition = () => {
        const x = this.getCenterCanvas().x;
        const width = Math.round(this.canvas.width / config.platform.widthRatio);
        const height = Math.round(width / config.platform.widthToHeightRatio);
        const y = this.canvas.height - height - this.radius;

        return { x, y };
    };

    setSides = ({ x, y }: TPosition) => {
        this.sides = {
            top: y - this.radius,
            right: x + this.radius,
            bottom: y + this.radius,
            left: x - this.radius,
        };
    };

    getSize(): TSize {
        const width = Math.round(this.canvas.width / config.ball.widthRatio);
        const height = Math.round(width / config.ball.widthToHeightRatio);
        return { height, width: height };
    }

    getBallRadius = () => {
        return Math.round(this.width / 2);
    };

    switchDirectionBySide = (side: TSide) => {
        //bottom нет, тк это конец игры
        if (side === ESides.right) this.direction.x = ESides.left;
        if (side === ESides.left) this.direction.x = ESides.right;
        if (side === ESides.top) this.direction.y = ESides.bottom;
    };

    getReachedWall = () => {
        if (this.sides.right >= this.canvas.width) {
            return ESides.right;
        }

        if (this.sides.left <= 0) {
            return ESides.left;
        }

        if (this.sides.top <= 0) {
            return ESides.top;
        }

        if (this.sides.bottom >= this.canvas.height) {
            return ESides.bottom;
        }

        return null;
    };

    switchDirection = (collisionSide: TCollisionSide) => {
        if (collisionSide === ECollisionSides.horizontal) {
            this.direction.x = this.direction.x === ESides.left ? ESides.right : ESides.left;
        }

        if (collisionSide === ECollisionSides.vertical) {
            this.direction.y = this.direction.y === ESides.top ? ESides.bottom : ESides.top;
        }
    };
}

export default Ball;
