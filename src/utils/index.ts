export const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const distance = (x1: number, x2: number, y1: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const speed = (distance: number) => {
    return +(10 * (distance / 30)).toFixed(3);
};

export const degreeToRadian = (degree: number) => {
    return (degree * Math.PI) / 180;
};

export const getLineWidth = (speed: number) => {
    if (speed < 2) {
        if (Math.random() > 0.9) return getRandomArbitrary(10, 180);
        return getRandomArbitrary(10, 40);
    }

    if (speed < 50) {
        const step = Math.ceil(speed / 10);
        let width = 10;
        for (let i = 0; i < speed; i += step) {
            width--;
        }
        return width;
    }

    return 1;
};

export const isMobile = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return toMatch.some(toMatchItem => {
        return navigator.userAgent.match(toMatchItem);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <R, A extends any[]>(
    fn: (...args: A) => R,
    delay: number
): [(...args: A) => R | undefined, () => void] => {
    let wait = false;
    let timeout: undefined | number;
    let cancelled = false;

    return [
        (...args: A) => {
            if (cancelled) return undefined;
            if (wait) return undefined;

            const val = fn(...args);

            wait = true;

            timeout = window.setTimeout(() => {
                wait = false;
            }, delay);

            return val;
        },
        () => {
            cancelled = true;
            clearTimeout(timeout);
        },
    ];
};

export const getColorScheme = (): "dark" | "light" =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
