let modulus=Math.pow(2, 31)-1, multiplier=48271, increment=0, x=Math.floor(Math.random()*modulus);
let lcg=()=>{
	x=(multiplier*x+increment)%modulus;
	return x/modulus;
}