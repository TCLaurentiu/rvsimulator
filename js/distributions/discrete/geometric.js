let Geometric={
	Simulate:(p, n)=>{
		let results=[], k=0;
		for(let i=0;i<n;i++){
			k=0;
			let rand=generator.generate();
			while(rand>p){
				rand=generator.generate();
				k++;
			}
			results.push(k+1);
		}
	return results;
}, Analyze:(p, n, results)=>{
	let max=-1, mean=0, variation=0;
	for(let i=0;i<n;i++) if(results[i]>max) max=results[i];
		let frec=[];
	
	for(let i=0;i<=max;i++) frec[i]=0;
	
	for(let i=0;i<n;i++) frec[results[i]]++;
	
	for(let i=0;i<=max;i++){
		mean+=i*frec[i]/n;
	}

	for(let i=0;i<=max;i++){
		variation+=(mean-i)*(mean-i)*frec[i]/n;
	}
	return {
		raw:results,
		mean:mean,
		variation:variation,
	}

}, mean:(p, n)=>{
	return 1/p;
}, variation:(p, n)=>{
	return (1-p)/(p*p);
}, yCoords:(p, n, results)=>{
	let max=-1;
	for(let i=0;i<n;i++) if(results[i]>max) max=results[i];
	let coords=[];
	for(let i=0;i<=max;i+=max/5) coords.push(i.toFixed(2));
		return coords;
},
	vData:(p, n, val, results)=>{
		if(!val>=1) return {
			aparitii:0,
			prob:0,
			teo_prob:0,
		}	
		let ap=0;
		for(let i=0;i<n;i++) if(results[i]==val) ap++;
		return {
			aparitii:ap,
			prob:(ap/n).toFixed(5),
			teo_prob:"\\((1-p)^{k-1}p="+(Math.pow(1-p, val-1)*p).toFixed(5)+"\\)",
		}
	}
}