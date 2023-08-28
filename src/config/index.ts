const config = {
    platform: {
        widthRatio: 4,
        widthToHeightRatio: 12,
        color: "#19401B",
    },
    brick: {
        widthRatio: 8,
        widthToHeightRatio: 4,
        color: "#19401B",
    },
    ball: {
        widthRatio: 6,
        widthToHeightRatio: 12,
        color: "#B55E07",
        speed: 1,
        dx: 5,
        dy: 3,
    },
    player: {
        name: "Player",
        lives: 5,
        score: 0,
        level: 1,
    },
};

export default Object.freeze(config);
