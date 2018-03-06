export function printAppConsole(){
	chrome.extension.getBackgroundPage().console.log("hello waldo!");
}


function alertAppConsole(){
	alert('hello waldo!');
}

export default alertAppConsole;
