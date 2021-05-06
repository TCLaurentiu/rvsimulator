let rngs = [{
    name: "Functia random din Javascript",
    generate: random,
}, {
    name: "Generatorul linear congruential",
    generate: lcg,
}, {
    name: "Mersenne Twister",
    generate: extractNumber
}, {
    name: "Xorshift",
    generate: xGet
}];
let generator = rngs[0];