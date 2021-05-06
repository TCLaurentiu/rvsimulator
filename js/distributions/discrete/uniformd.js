let UniformD = {
    Simulate: (n, t) => {
        let results = [],
            rand;
        for (let i = 0; i < t; i++) {
            rand = generator.generate();
            results.push(Math.floor(rand * n) + 1);
        }

        return results;
    },
    Analyze: (n, t, results) => {
        let frec = [];
        for (let i = 1; i <= n; i++) frec[i] = 0;
        for (let i = 0; i < t; i++) frec[results[i]]++;
        let mean = 0,
            variation = 0;
        for (let i = 1; i <= n; i++) mean += i * frec[i] / t;
        for (let i = 1; i <= n; i++) variation += (mean - i) * (mean - i) * frec[i] / t;
        return {
            raw: results,
            mean: mean,
            variation: variation
        }
    },
    mean: (n, t) => {
        return (n + 1) / 2;
    },
    variation: (n, t) => {
        return (n * n - 1) / 12;
    },
    yCoords: (n, t, results) => {
        let coords = [];
        for (let i = 0; i <= n; i += n / 5) coords.push(i == parseInt(i) ? i : i.toPrecision(2));
        return coords;
    },
    vData: (n, t, val, results) => {
        if (val <= 0 || val > n) return {
            aparitii: 0,
            prob: 0,
            teo_prob: 0,
        }
        let ap = 0;
        results.forEach(e => {
            if (e == val) ap++;
        });
        let prob = ap / t;
        let teo_prob = "\\(\\frac{1}{n}=\\frac{1}{" + t + "}=" + 1 / n + "\\)";
        return {
            aparitii: ap,
            prob: prob,
            teo_prob: teo_prob
        }
    },
    disPlot: (n, t, results) => {
        return getDistri(n, results);
    }
}