let Binomial = {
    Simulate: (p, t, n) => {
        let results = [],
            rnd, s = 0;
        for (let i = 0; i < n; i++) {
            s = 0;
            for (let j = 0; j < t; j++) {
                rnd = generator.generate();
                if (rnd < p) {
                    s++;
                }
            }
            results.push(s);
        }
        return results;
    },
    Analyze: (p, t, n, results) => {

        let num = []; // num[i] is the number of experiments with i succeses
        for (let i = 0; i <= t; i++) num[i] = 0;
        for (let i = 0; i <= n; i++) num[results[i]]++;
        let mean = 0;
        for (let i = 0; i <= t; i++) mean += num[i] / n * i;
        let variation = 0;
        for (let i = 0; i <= t; i++) variation += num[i] / n * (mean - i) * (mean - i);
        return {
            raw: results,
            mean: mean,
            variation: variation
        }

    },
    mean: (p, t, n) => {
        return t * p;
    },
    variation: (p, t, n) => {
        return t * p * (1 - p);
    },
    yCoords: (p, t, n, results) => {
        let c = [];
        for (let i = 0; i <= t; i += t / 5) c.push(i.toPrecision(2));
        return c;
    },
    vData: (p, t, n, val, results) => {
        if (val != parseInt(val) || val > t) return {
            aparitii: 0,
            prob: 0,
            teo_prob: 0,
        }
        val = parseInt(val);
        let ap = 0;
        results.forEach(e => {
            if (e == val) ap++;
        })
        let teo_prob = (comb(t, val) * Math.pow(p, val) * Math.pow(1 - p, t - val)).toFixed(5);
        return {
            aparitii: ap,
            prob: ap / n,
            teo_prob: "\\(C_n^kp^k(1-p)^{n-k}=" + teo_prob + "\\)",
        }
    }
}