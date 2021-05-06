let Hiper = {
    Simulate: (N, M, t, n) => { // N=total, M=bad, t=trials, n=runs
        let rnds = [];
        let results = [],
            _N, _M, rand, res = 0;
        for (let i = 0; i < n; i++) {
            _N = N;
            _M = M;
            res = 0;
            for (let j = 0; j < t && _N > 0 && _M > 0; j++) { // we assume that the first M are bad;
                rand = generator.generate();
                rnds.push(_M / _N);
                if (rand < _M / _N) {
                    _M--;
                    _N--;
                    res++;
                } else _N--;
            }
            results.push(res);
        }
        return results;
    },
    Analyze: (N, M, t, n, results) => {
        let frec = [],
            max = -1;
        for (let i = 0; i < n; i++)
            if (results[i] > max) max = results[i];
        for (let i = 0; i <= max; i++) frec.push(0);
        for (let i = 0; i < n; i++) frec[results[i]]++;
        let mean = 0;
        for (let i = 0; i <= max; i++) mean += i * frec[i] / n;
        let variation = 0;
        for (let i = 0; i <= max; i++) variation += (mean - i) * (mean - i) * frec[i] / n;
        return {
            raw: results,
            mean: mean,
            variation: variation
        }
    },
    mean: (N, M, t, n) => {
        return t * M / N;
    },
    variation: (N, M, t, n) => {
        return t * M * (N - M) * (N - t) / (N * N * (N - 1));
    },
    yCoords: (N, M, t, n, results) => {
        let coords = [],
            max = -1;
        for (let i = 0; i < n; i++)
            if (results[i] > max) max = results[i];
        for (let i = 0; i <= max; i += max / 5) coords.push(i.toFixed(1));
        return coords;
    },
    vData: (N, M, t, n, val, results) => {
        if (val < 0 || val > t || val != parseInt(val) || isNaN(val))
            return {
                aparitii: 0,
                prob: 0,
                teo_prob: 0,
            }
        val = parseInt(val);
        let ap = 0;
        results.forEach(e => {
            if (e == val) ap++;
        })
        return {
            aparitii: ap,
            prob: (ap / n).toFixed(5),
            teo_prob: "\\(C_M^kC_{N-M}^{n-k}\\over C_N^n\\)\\(=" + (comb(M, val) * comb(N - M, t - val) / comb(N, t)).toFixed(5) + "\\)",
        }
    }
}