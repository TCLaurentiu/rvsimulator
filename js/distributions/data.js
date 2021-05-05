
let succes={
                            label: "probabilitatea succesului, \\(p\\)",
                            constraint: (p) => {
                                return p <= 1 && p >= 0 && !isNaN(p)
                            },
                            input: {
                                type: "number",
                                placeholder: "p"
                            },
                            normalize: parseFloat,
                        };

let variables = [

        {
            label: "Variabile discrete",
            distributions: [{
                    name: "Bernoulli",
                    info: "Variabila Bernoulli are 2 valori, 1 ce reprezinta succesul, respectiv 0 ce reprezinta esecul. Succesul are probabilitate \\(p\\) iar esecul are probabilitate \\(1-p\\).",
                    _mean: "\\(p\\)",
                    _variation:"\\(p(1-p)\\)",
                    parameters: [succes
                    ],
                    simulate:Bernoulli.Simulate,
                    analyze:Bernoulli.Analyze,
                    mean:Bernoulli.mean,
                    variation:Bernoulli.variation,
                    yCoords:[0, 1],
                    vData:Bernoulli.vData,
            },
            {
                name: "Binomiala",
                info: "O variabila distribuita binomial da numarul de reusite din \\(n\\) incercari, probabilitatea de succes fiind \\(p\\)",
                _mean:"\\(np\\)",
                _variation:"\\(np(1-p)\\)",
                parameters:[succes, {
                	label:"numar de incercari, \\(n\\)",
                	constraint:(n)=>{
                		return n>=1 && !isNaN(n);
                	},
                	input: {
                		type:"number",
                		placeholder:"n",
                	}, 
                	normalize:parseInt,
                }], 
                simulate:Binomial.Simulate,
                analyze:Binomial.Analyze,
                mean:Binomial.mean,
                variation:Binomial.variation,
                yCoords:Binomial.yCoords,
                vData:Binomial.vData,
            },
            {
            	name:"Geometrica",
            	info:"O variabila distribuita Geometric reprezinta numarul de incercari pana la prima reusita, reusita avand probabilitatea p",
            	_mean:"\\(1\\over p\\)",
            	_variation:"\\(1-p\\over p^2\\)",
            	parameters:[succes],
            	simulate:Geometric.Simulate,
            	analyze:Geometric.Analyze,
            	mean:Geometric.mean,
            	variation:Geometric.variation,
            	yCoords:Geometric.yCoords,
            	vData:Geometric.vData
            },
            {
                name: "Poisson",
                info:"O variabila distribuita Poission da numarul de produceri ale unui eveniment 'rar' intr-o perioada de timp data, cunoscandu-se numarul de evenimente ce se produc intr-un interval fixat(aici de 1 minut)",
                _mean:"\\(λ\\)",
                _variation:"\\(λ\\)",
                parameters:[{
                	label:"Numarul de produceri ale evenimentului in 1 minut(\\(λ\\))",
                	constraint:(m)=>{
                		return m>0 && !isNaN(m);
                	}, 
                	input:{
                		type:"number",
                		placeholder:"λ",
                	},
                	normalize:parseInt,
                }, {
                	label:"Intervalul de timp, in secunde",
                	constraint:(t)=>{
                		return t>0 && !isNaN(t);
                	}, 
                	input:{
                		type:"number",
                		placeholder:"t",
                	},
                	normalize:parseInt,
                }],
                simulate:Poisson.Simulate,
                analyze:Poisson.Analyze,
                mean:Poisson.mean,
                variation:Poisson.variation,
                yCoords:Poisson.yCoords,
                vData:Poisson.vData
            },
            {
                name: "Hipergeometrica",
                info:"O variabila distribuita Hipergeometric da numarul de obiecte de un anumit tip, alese, fara inlocuire, din niste obiecte de 2 tipuri(spre exemplu avem si piese defecte si piese functionabile, atunci variabila hipergeometrica poate da numarul de piese defecte alese) din \\(n\\) extrageri, avand \\(N\\) obiecte, dintre care \\(M\\) 'defecte'. Probabilitatea de a alege o anumita piesa este distribuita uniform",
           		_mean:"\\(nM\\over N\\)",
           		_variation:"\\(nM(N-M)(N-n)\\over N^2(N-1)\\)",
           		parameters:[{
           			label:"Numar total de obiecte",
           			constraint:(N)=>{
           				return N>0 && !isNaN(N);
           			},
           			input:{
           				type:"number",
           				placeholder:"N",
           			},
           			normalize:parseInt,
           		}, {
           			label:"Numar de obiecte defecte",
           			constraint:(M)=>{
           				return M>0 && !isNaN(M);
           			}, 
           			input:{
           				type:"number",
           				placeholder:"M",
           			},
           			normalize:parseInt,
           		}, {
           			label:"Numar de alegeri",
           			constraint:(t)=>{ // t(trials) also has to not be greater then N
           				return t>0 && !isNaN(t);
           			},
           			input:{
           				type:"number",
           				placeholder:"t",
           			},
           			normalize:parseInt,
           		}],
                simulate:Hiper.Simulate,
                analyze:Hiper.Analyze,
                mean:Hiper.mean,
                variation:Hiper.variation,
                yCoords:Hiper.yCoords,
                vData:Hiper.vData,
            }, {
            	name:"Uniforma",
            	info:"O variabila distribuita uniform da o valoare dintr-o multime \\({1, 2, ..., n}\\), unde fiecare valoare are probabilitate egala de a fi aleasa. O multime de alt tip poate fi simulata considerand ca rezultatul dat de simularea pe {1, 2, ..., n} da indicele elementului din multimea reala",
            	_mean:"\\(n+1 \\over 2\\)",
            	_variation:"\\(n^2-1\\over 12\\)",
            	parameters:[{
            		label:"Numarul de valori",
            		constraint:(n)=>{
            			return n>0 && !isNaN(n);
            		}, 
            		input:{
            			type:"number",
            			placeholder:"n",
            		},
            		normalize:parseInt,
            	}],
            	simulate:UniformD.Simulate,
            	analyze:UniformD.Analyze,
            	mean:UniformD.mean,
            	variation:UniformD.variation,
            	yCoords:UniformD.yCoords,
            	vData:UniformD.vData,
            	disPlot:UniformD.disPlot,
            }]
        },  {
                label: "Variabile continue",
                distributions: [{
                    name: "Normala",
                    parameters:[]
                }, {
                    name: "Gamma",
                    parameters:[]
                }, {
                    name: "Exponentiala",
                	parameters:[]
                }, {
                    name: "Rayleigh",
                    parameters:[]
                }, {
                    name: "Triunghiulara(Simpson)",
                	parameters:[]
                }, {
                    name: "Uniforma",
                	parameters:[]
                }]
            }

        ]

        let d = variables[0].distributions.concat(variables[1].distributions);
        variables.forEach(v => {
            v.distributions.forEach(dist => {
                dist.parameters.push({
                    label: "Numar de experimente(numar natural pozitiv)",
                    input: {
                        type: "text",
                        placeholder: "numar"
                    },
                    constraint: (n) => {
                        return n > 0 && !isNaN(n);
                    },
                    normalize: parseInt
                })
            })
        })