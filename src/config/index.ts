import { getColorScheme } from "../utils";
import { colors } from "./colors";

const theme = getColorScheme();

const config = {
    common: {
        theme,
    },
    platform: {
        widthRatio: 4,
        widthToHeightRatio: 12,
        color: colors.platform[theme],
    },
    brick: {
        widthRatio: 8,
        widthToHeightRatio: 4,
        color: colors.brick[theme],
    },
    ball: {
        widthRatio: 6,
        widthToHeightRatio: 12,
        color: colors.ball[theme],
        speed: 1,
        dx: 5,
        dy: 3,
    },
    background: {
        color: colors.background[theme],
    },
    player: {
        name: "Player",
        lives: 5,
        score: 0,
        level: 1,
    },
};

export default Object.freeze(config);
