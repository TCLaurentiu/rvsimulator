let choice1=q(".choice-1"), choice2=_q(".choice-2"), dataInput=q(".data-input"), choices=q(".choices");

// add the distributions
let options=_q(".choice-2 .options")
variables.forEach((variable, i)=>{
	variable.distributions.forEach(dist=>{
	let span=document.createElement("span");
	span.innerHTML=dist.name;
	options[i].appendChild(span);
})
})

// add the random number generators
let r_choices=q(".r-choice .options");
rngs.forEach((e, i)=>{
	let span=document.createElement("span");
	span.innerHTML=e.name;
	r_choices.appendChild(span);
	((span, i)=>{
	l("click", span, ()=>{
		q(".r-choice-active").classList.remove("r-choice-active");
		span.classList.add("r-choice-active");
		generator=rngs[i];
	})
})(span, i);
})
r_choices.children[0].classList.add("r-choice-active");

// toggling between discrete and continuous variables
let vars=_q(".choice-1 .options span"), dist=_q(".choice-2");
for(var i=0;i<vars.length;i++){
	((i)=>{
l("click", vars[i], ()=>{
	q(".v-choice-active").classList.remove("v-choice-active");
	vars[i].classList.add("v-choice-active");
	q(".d-active").classList.remove("d-active");
	dist[i].classList.add("d-active");
})
	})(i);
}

// selecting a distribution
let distr=_q(".choice-2 .options span"), name=q(".name"), desc=q(".desc"), inputs=q(".inputs"), currD, type=q(".type");
let f_mean=q(".formula-mean>span"), f_variation=q(".formula-variation>span");
let expl=q(".plot-explanation");
for(var i=0;i<distr.length;i++){
((i)=>{
	l("click", distr[i], ()=>{
		currD=d[i];
		choices.classList.add("hidden");
		dataInput.classList.remove("hidden");
		name.innerHTML=d[i].name;
		desc.innerHTML=d[i].info;
		f_mean.innerHTML=d[i]._mean;
		f_variation.innerHTML=d[i]._variation;
		type.innerHTML=q(".v-choice-active").innerHTML;
		d[i].parameters.forEach(param=>{
			let span=document.createElement("span");
			let label=document.createElement("label");
			label.innerHTML=param.label;
			let input=document.createElement("input");
			input.setAttribute("type", param.input.type);
			input.setAttribute("placeholder", param.input.placeholder);
			span.appendChild(label);
			span.appendChild(input);
			inputs.appendChild(span);
			param.input.elem=input;
		})
		MathJax.typeset([desc, f_mean, f_variation].concat(_q("label")));
	})
})(i)
}

let form=q("form"), good, mean=q(".mean>span"), tmean=q(".tmean>span"), variation=q(".variation>span"), tvariation=q(".tvariation>span");
let results=q(".results");
let valoriInput=q(".valori input"), aparitii=q(".val-ap>span"), prob=q(".val-prob>span"), teo_prob=q(".val-prob-teo>span");
let canvas=_q("canvas");
l("submit", form, (e)=>{
	good=1;
	e.preventDefault();
	_q(".error").forEach(e=>e.classList.remove("error"));
	// get data, normalize it, verify it, then store it
	currD.parameters.forEach(param=>{
		param.value=param.normalize(param.input.elem.value);
		if(!param.constraint(param.value)){
			good=0;
			param.input.elem.parentElement.children[0].classList.add("error");
		}
	})
	if(good){
		let parameters=currD.parameters.map(e=>e.value);
		let result=currD.simulate.apply(null, parameters);
		currD.data=currD.analyze.apply(null, parameters.concat([result]));
		form.classList.add("hidden");
		mean.innerHTML=currD.data.mean.toPrecision(5);
		variation.innerHTML=currD.data.variation.toPrecision(5);
		tmean.innerHTML=currD.mean.apply(null, parameters).toPrecision(5);
		tvariation.innerHTML=currD.variation.apply(null, parameters).toPrecision(5);
		results.classList.remove("hidden");
		yC=currD.yCoords;
		if(currD.yCoords instanceof Function) yC=currD.yCoords.apply(null, parameters.concat([result]));
		plot(canvas[0], currD.data.raw, yC);
		//plot(canvas[1], currD.disPlot.apply(null, parameters.concat([result])), [0, 0.2, 0.4, 0.6, 0.8, 1]);

		l("input", valoriInput, ()=>{
			let val=valoriInput.value;
			if(isNaN(val)) return;
			val=parseInt(val);
			let vData=currD.vData.apply(null, parameters.concat([val, result]));
			aparitii.innerHTML=vData.aparitii;
			prob.innerHTML=vData.prob;
			teo_prob.innerHTML=vData.teo_prob;
			MathJax.typeset([teo_prob]);
		})

	}
})

let back=q(".back");
l("click", back, ()=>{
	q(".data-input").classList.add("hidden");
	q(".choices").classList.remove("hidden");
	q(".inputs").innerHTML="";
	if(!q(".results").classList.contains("hidden")){
		q(".results").classList.add("hidden");
		q("form").classList.remove("hidden");
		aparitii.innerHTML="";
		prob.innerHTML="";
		teo_prob.innerHTML="";
		_q("canvas").forEach(e=>{
			let ctx=e.getContext("2d");
			ctx.clearRect(0, 0, e.width, e.height);
		})
	}

})

let explanations=["Introdu o valoare a variabilei pentru a afla informatii despre aceasta", "<span>Axa OX:indicele experimentului</span><span>Axa OY:rezultatul experimentului</span>",
"<span>Axa OX:valoare a variabilei</span><span>Axa OY:probabilitatea valorii</span>",
"<span>Axa OX:valoare a variabilei</span><span>Axa OY:\\( P(X \\leq x)\\)</span>"]

let plot_menu=_q(".plot-menu>span"), plots=_q(".plot-data>span");
plot_menu.forEach((e, i)=>{
	((e, i)=>{
		l("click", e, ()=>{
			q(".plot-menu-active").classList.remove("plot-menu-active");
			e.classList.add("plot-menu-active");
			q(".plot-active").classList.remove("plot-active");
			plots[i].classList.add("plot-active");
			expl.innerHTML=explanations[i];
			MathJax.typeset([expl]);
		})
	})(e, i);
})