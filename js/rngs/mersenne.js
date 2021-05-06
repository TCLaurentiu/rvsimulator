let lowestBits = (number, bits) => {
    let result = 0;
    for (let i = 0; i < bits; i++) {
        if (number & (1 << i)) result = result | (1 << i);
    }
    return result;
}

// values from the MT19937 implementation
let w = 32,
    n = 624,
    m = 397,
    r = 31;
let a = 0x9908B0DF;
let u = 11,
    _d = 0xFFFFFFFF;
let s = 7,
    b = 0x9D2C5680;
let t = 15,
    c = 0xEFC60000;
let f = 1812433253;

let state = [],
    index = n + 1;
let lower_mask = (1 << r) - 1; // r 1s
let upper_mask = lowestBits(~(lower_mask), w);


let init = (seed) => {
    index = n;
    state[0] = seed;
    for (let i = 1; i < n; i++) {
        state[i] = lowestBits(f * state[i - 1] ^ (state[i - 1] >> (w - 2)) + i, w);
    }
}

let extractNumber = () => {
    if (index >= n) {
        if (index > n) {
            init(Math.floor(Math.random() * Math.pow(2, 32)));
        }
        twist();
    }
    let y = state[index];
    y = y ^ ((y >> u) & _d);
    y = y ^ ((y << s) & b);
    y = y ^ ((y << t) & c);
    y = y ^ (y >> 1);
    index++;
    return lowestBits(y, w) / Math.pow(2, 31);
}

let twist = () => {
    for (let i = 0; i < n; i++) {
        let x = (state[i] & upper_mask) + (state[(i + 1) % n] & lower_mask);
        let xA = x >> 1;
        if (x % 2 != 0) {
            xA = xA ^ a;
        }
        state[i] = state[(i + m) % n] ^ xA;
    }
    index = 0;
}