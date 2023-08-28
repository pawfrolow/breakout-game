export enum ESides {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
}

export enum ECollisionSides {
    horizontal = "horizontal",
    vertical = "vertical",
}

export type TCollisionSide = `${ECollisionSides}`;

export type TSide = `${ESides}`;

export type TLevel = {
    matrix: boolean[][];
};

export type TPosition = {
    x: number;
    y: number;
};

export type TSize = {
    width: number;
    height: number;
};

export type TBallDirection = {
    x: ESides.left | ESides.right;
    y: ESides.top | ESides.bottom;
};

export type TBrickInitParams = {
    count: number;
    row: number;
    col: number;
};

export type TPressedBtn = ESides.left | ESides.right | null;
