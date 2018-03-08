export default class helloWaldo{	
	constructor(){

	}	

	printAppConsole(){
		chrome.extension.getBackgroundPage().console.log("hello waldo!");
	}

	alertAppConsole(){
		alert('hello waldo!');
	}
}