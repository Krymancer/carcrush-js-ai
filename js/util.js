
export function random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function mutate(x) {
    if (Math.random() < 0.1) {
        let offset = randomZero_One() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

export function randomZero_One() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}