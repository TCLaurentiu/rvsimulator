let xSeed = Math.floor(Math.random() * Math.pow(2, 31));
let xGet = () => {
    xSeed ^= xSeed << 13;
    xSeed ^= xSeed >> 17;
    xSeed ^= xSeed << 5;
    xSeed = Math.abs(xSeed);
    return xSeed / Math.pow(2, 31);
}