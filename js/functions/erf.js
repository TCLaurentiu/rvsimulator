let p = 0.3275911,
    a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429;
let pow = Math.pow;
let erf = (x) => {
    let t = 1 / (1 + p * x);
    return 1 - (a1 * t + a2 * pow(t, 2) + a3 * pow(t, 3) + a4 * pow(t, 4) + a5 * pow(t, 5)) * pow(Math.E, -x * x);
}

// an approximation of the error function
// not used for now 