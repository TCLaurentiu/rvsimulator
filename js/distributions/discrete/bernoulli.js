let Bernoulli={
Simulate:(p, n) => {

    let result = [],
        rnd;
    for (let i = 0; i < n; i++) {
        rnd = generator.generate();
        if (rnd < p) result.push(1);
        else result.push(0);
    }
    return result;

},

Analyze: (p, n, result) => {
	let succes=result.filter(e=>e).length, pSucces=succes/n;
    let mean = 1*pSucces+0*(1-pSucces);
    let variation = Math.pow(1-mean, 2)*pSucces+Math.pow(0-mean, 2)*(1-pSucces);
    return {
    	raw:result,
        mean: mean,
        variation: variation,
    }
},

mean:(p, n)=>{
	return p;
}, 

variation:(p, n)=>{
	return p*(1-p);
},
vData:(p, n, val, results)=>{
	if(val!=0 && val!=1) return {
		aparitii:0,
		prob:0,
		teo_prob:0,
	}
	let ap=0;
	results.forEach(e=>{
		if(e==val) ap++;
	})
	return {
		aparitii:ap,
		prob:(ap/n).toFixed(5),
		teo_prob:val==1?"p="+p.toFixed(5):"1-p="+(1-p).toFixed(5),
	}
}
}