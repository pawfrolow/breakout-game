import { TPosition, TSize } from "./types";

abstract class GameUnit {
    private _x = 0;
    private _y = 0;
    width = 0;
    height = 0;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sides = { top: 0, right: 0, bottom: 0, left: 0 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    get x() {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
        this.setSides({ x, y: this._y });
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
        this.setSides({ y, x: this._x });
    }

    abstract setSides(_: TPosition): void;
    abstract getSize(): TSize;
    abstract getInitialPosition(): TPosition;
    abstract init(): void;
    abstract draw(): void;

    getCenterCanvas = (): TPosition => {
        return {
            x: Math.round(this.canvas.width / 2),
            y: Math.round(this.canvas.height / 2),
        };
    };
}

export default GameUnit;
