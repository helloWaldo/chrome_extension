export default class helloWaldo{	
	constructor(){
		console.log("hey");
	}	

	printAppConsole(){
		chrome.extension.getBackgroundPage().console.log("hello waldo!");
	}

	alertAppConsole(){
		alert('hello waldo!');
	}
}