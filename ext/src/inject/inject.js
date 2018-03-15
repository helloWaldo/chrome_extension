// ON DOM READY
hw = new helloWaldo();
elemMan = new elementsManipulator();

//let googleLogo = document.getElementById('hplogo');

//hw.addTransition(googleLogo, '1s');

setTimeout(function() {
//	elemMan.flip(googleLogo);
}, 1000);
let clickedElem;
let mouseX;
let mouseY;

document.addEventListener("mousemove",function(event){
	console.log(clickedElem.style.top);
	mouseX =event.clientX;
	mouseY =event.clientY;
	clickedElem.style.top = mouseY - (clickedElem.offsetHeight/2) + "px";
	clickedElem.style.left = mouseX - (clickedElem.offsetWidth/2) + "px";
	console.log(clickedElem.style.top);

});

document.addEventListener("click",function(event){
	console.log(event);
	elemID = event.toElement;
	clickedElem= event.toElement;
	elemMan.selectElem(clickedElem);

});



/*
function appIconToggle(){
	hw = new helloWaldo();
	hw.doAlert('do alert');
	hw.printConsole('hello WAldO!!');
}
*/

//appIconToggle();