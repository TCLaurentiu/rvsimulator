let Poisson={	
	Simulate:(p, t, n)=>{
		p=Math.floor(p*t/60);
		// Knuth algorithm (inefficient?)
		let results=[], rand;
		L=Math.pow(Math.E, -p);
		for(let i=0;i<n;i++){
			let k=0, q=1;
			do{
				k++;
				rand=generator.generate();
				q=q*rand;
			} while(q>L);
			results.push(Math.floor(k-1));
		}
		console.log(results);
		return results;
	},
	Analyze:(p, t, n, results)=>{
		p=Math.floor(p*t/60);
		let max=-1;
		for(let i=0;i<n;i++) if(results[i]>max) max=results[i];
			let frec=[];
		for(let i=0;i<=max;i++) frec[i]=0;
			for(let i=0;i<n;i++) frec[results[i]]++;
				let mean=0;
			for(let i=0;i<=max;i++){
				mean+=i*frec[i]/n;
			}
			let variation=0;
			for(let i=0;i<=max;i++){
				variation+=(mean-i)*(mean-i)*frec[i]/n;
			}
		return {
			raw:results,
			mean:mean,
			variation:variation,
		}
	},
	mean:(p, t, n)=>{
		p=Math.floor(p*t/60);
		return p;
	}, 
	variation:(p, t, n)=>{
		p=Math.floor(p*t/60);
		return p;
	},
	yCoords:(p, n, t, results)=>{
		p=Math.floor(p*t/60);
		let max=-1;
		for(let i=0;i<n;i++) if(results[i]>max) max=results[i];
		let coords=[];
		for(let i=0;i<=max;i+=max/5) coords.push(i.toFixed(1));
			return coords;
	},
	vData:(p, t, n, val, results)=>{
		p=Math.floor(p*t/60);
		if(val<0 || val!=parseInt(val)) return {
			aparitii:0,
			prob:0,
			teo_prob:0,
		}
		val=parseInt(val);
		let ap=0;
		results.forEach(e=>{
			if(e==val) ap++;
		})
		return {
			aparitii:ap,
			prob:ap/n,
			teo_prob:"\\(e^{-\\lambda}\\lambda^k\\over k!\\)\\(="+(Math.pow(Math.E, -p)*(val==0?1:Math.pow((p*Math.E)/val, val)/Math.sqrt(2*Math.PI*val))).toFixed(5)+"\\)",
		}
	}
}