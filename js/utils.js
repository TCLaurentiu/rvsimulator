let q = (e) => {
    return document.querySelector(e);
}

let _q = (e) => {
    return document.querySelectorAll(e);
}

let l = (ev, elem, cb) => {
    return elem.addEventListener(ev, (e) => {
        cb(e);
    })
}

let getDistri = (n, results) => {
    let frec = [],
        points = {
            y: [],
            x: [],
        };

    for (let i = 0; i <= n; i++) frec[i] = 0;
    for (let i = 0; i < results.length; i++) frec[results[i]]++;
    for (let i = 0; i <= n; i++) {
        if (points.x.indexOf(results[i]) != -1) continue;
        points.x.push(results[i]);
        points.y.push(frec[results[i]] / results.length);
    }
    return points;
}

fact = [
    1,
    1
];
let factorial = (n) => {
    if (fact[n]) return fact[n];
    else {
        let closest = n;
        while (!fact[closest]) closest--;
        for (let i = closest + 1; i <= n; i++) {
            fact[i] = i * fact[i - 1];
        }
    }
    return fact[n];
}
factorial(170);

let comb = (n, k) => {

    // should probably be using memoization

    let ans = 1;
    for (let i = k + 1; i <= n; i++) ans *= i;
    return ans / factorial(n - k);
}