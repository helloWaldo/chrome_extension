class helloWaldo{	
	constructor(){
		console.log("constructing");
	}	

	printAppConsole(){
		chrome.extension.getBackgroundPage().console.log("printAppConsole");
	}

	doAlert(){
		alert('doAlert');
	}

	printConsole(){
		console.log("printConsole");
	}
}

