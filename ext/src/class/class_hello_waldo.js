class helloWaldo{	
	constructor(){
		
	}

	addTransition(elem, time){
		elem.style.transition = "transform "+time+" ease";
	}

	// SIMPLE ALERT!
	doAlert(str){
		alert(str);
	}

	// prints to page console!
	printConsole(str){
		console.log(str);
	}
}