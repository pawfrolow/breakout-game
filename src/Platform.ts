import Ball from "./Ball";
import GameUnit from "./GameUnit";
import config from "./config";
import { ECollisionSides, ESides, TPosition, TPressedBtn, TSize } from "./types";

class Platform extends GameUnit {
    speed = 0;
    lastUpdateTime = 0; // Время последнего обновления
    lastX = 0; // Последнее значение x

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.init();
        setInterval(() => this.updateSpeed(), 100);
    }

    init = () => {
        const { width, height } = this.getSize();
        this.width = width;
        this.height = height;

        const { x, y } = this.getInitialPosition();
        this.x = x;
        this.y = y;

        this.setSides({ x, y });
    };

    draw = () => {
        const { x, y, width, height } = this;
        this.ctx.fillStyle = config.platform.color;
        this.ctx.fillRect(x, y, width, height);
    };

    updateSpeed() {
        const currentTime = Date.now();

        // Если прошло достаточно времени с момента последнего обновления (20 мс)
        if (currentTime - this.lastUpdateTime >= 20) {
            const deltaX = this.x - this.lastX; // Разница между текущим и предыдущим x
            this.speed = deltaX / 20; // Скорость как отношение разницы к времени
            this.lastX = this.x;
            this.lastUpdateTime = currentTime;
        }
    }

    moveButton = (pressedBtn: TPressedBtn) => {
        const moveOffset = this.getPlatformMoveOffset();

        if (pressedBtn === "left" && this.x > 0) {
            this.x -= moveOffset;
        }

        if (pressedBtn === "right" && this.sides.right < this.canvas.width) {
            this.x += moveOffset;
        }
    };

    moveMouse = (mouseX: number) => {
        let x = mouseX;

        const halfPlatform = Math.round(this.width / 2);
        const rightBorder = this.canvas.width - halfPlatform;

        if (x > rightBorder) {
            x = rightBorder;
        }

        if (x < halfPlatform) {
            x = halfPlatform;
        }

        this.x = x - Math.round(this.width / 2);
    };

    getInitialPosition = () => {
        const x = this.getCenterCanvas().x - Math.round(this.width / 2);
        const y = window.innerHeight - this.height;
        return {
            x,
            y,
        };
    };

    getSize(): TSize {
        const width = Math.round(this.canvas.width / config.platform.widthRatio);
        const height = Math.round(width / config.platform.widthToHeightRatio);
        return { width, height };
    }

    getPlatformMoveOffset = () => {
        return Math.round(this.canvas.width / 100);
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
        if (ball.sides.bottom > this.sides.top) {
            // distance from ball to
            const distX = Math.abs(ball.x - this.x - this.width / 2);
            const distY = Math.abs(ball.y - this.y - this.height / 2);

            if (distX > this.width / 2 + ball.radius) {
                return null;
            }
            if (distY > this.height / 2 + ball.radius) {
                return null;
            }
            if (distX <= this.width / 2 && ball.direction.y === ESides.bottom) {
                return ECollisionSides.vertical;
            }
            if (distY <= this.height / 2) {
                return ECollisionSides.horizontal;
            }
        }
        return null;
    };
}

export default Platform;
