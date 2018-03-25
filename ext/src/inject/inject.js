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
	//console.log(clickedElem.style.top);
	mouseX =event.clientX;
	mouseY =event.clientY;
	if(clickedElem){
		clickedElem.style.top = mouseY - (clickedElem.offsetHeight/2) + "px";
		clickedElem.style.left = mouseX - (clickedElem.offsetWidth/2) + "px";
	}
	//console.log(clickedElem.style.top);

});

/*TODO - call togle func*/
document.addEventListener("mousedown",function(event){
	if(clickedElem==null){
		clickedElem = elemMan.selectElem(event);
	}
});

document.addEventListener("mouseup",function(event){
	if(clickedElem!=null){
		clickedElem = elemMan.deSelectElem(event);
	}
});



/*
function appIconToggle(){
	hw = new helloWaldo();
	hw.doAlert('do alert');
	hw.printConsole('hello WAldO!!');
}
*/

//appIconToggle();