let nonUniform = {
    normalize: (p) => { // p is the string taken as input that contains the probabilities
        if (Array.isArray(p)) return {
            result: p,
            good: 1,
        }
        p = p.split(", ");
        let result = [];
        p.forEach(e => {
            if (e.split("/")[0] == e) {
                result.push(parseFloat(e));
            } else result.push(parseFloat(e.split("/")[0]) / parseFloat(e.split("/")[1]));
        })
        // check if the sum of probabilities is close enough to 1(prehaps not 1 because of language limitations?)
        let t = 0;
        result.forEach(e => t = t + e);
        return {
            array: result,
            good: (t == 1 || Math.abs(t - 1) < Math.pow(10, -5)),
        }
    },
    Simulate: (n, p, t) => { // number of options, probablities, trials

        let results = [];
        for (let i = 0; i < t; i++) {

            let rand = generator.generate();
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (rand > sum && rand <= sum + p[j]) {
                    results.push(j + 1);
                    break;
                }
                sum += p[j];
            }

        }
        return results;

    },
    Analyze: (n, p, t, results) => {
        let max = -1;
        results.forEach(e => e > max ? max = e : max = max);
        let frec = [];
        for (let i = 0; i <= max; i++) frec.push(0);
        results.forEach(e => frec[e]++);
        let mean = 0;
        for (let i = 0; i <= max; i++) mean += i * frec[i] / t;
        let variation = 0;
        for (let i = 0; i <= max; i++) variation += (i - mean) * (i - mean) * frec[i] / t;
        return {
            raw: results,
            mean: mean,
            variation: variation,
        }
    },
    mean: (n, p, t) => {
        let mean = 0;
        for (let i = 1; i <= n; i++) mean += i * p[i - 1];
        return mean;
    },
    variation: (n, p, t) => {
        let mean = nonUniform.mean(n, p, t),
            variation = 0;
        for (let i = 1; i <= n; i++) variation += (mean - i) * (mean - i) * p[i - 1];
        return variation;
    },
    yCoords: (n, p, t, results) => {
        let coords = [];
        for (let i = 0; i <= n; i += n / 5) coords.push(i == parseInt(i) ? i : i.toPrecision(2));
        return coords;
    },
    vData: (n, p, t, val, results) => {
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
        let teo_prob = p[val - 1] || 0;
        return {
            aparitii: ap,
            prob: prob,
            teo_prob: teo_prob
        }
    }
}