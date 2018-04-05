class game{	
	constructor(){
		this.mouseMode = 'default';
		this.mouseX;
		this.mouseY;
		this.timeInSec = 5;

		// Function for event listner
		this.mouseDownEvent = function(event){
			elemMan.selectElem(event);
		};

		// Function for event listner
		this.event_doubleClick_flip= function(event) {
			if(elemMan.clickedElem === null){
				elemMan.selectElem(event);
			}

			elemMan.flip(elemMan.clickedElem);
		};

		// Function for event listner
		this.mouseUpEvent = function(event){
			elemMan.deSelectElem(elemMan.clickedElem);
		};

		// Function for event listner
		this.mouseMove = function(event){
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;

			if(elemMan.clickedElem){
				elemMan.clickedElem.style.top = this.mouseY - (elemMan.clickedElem.offsetHeight/2) + "px";
				elemMan.clickedElem.style.left = this.mouseX - (elemMan.clickedElem.offsetWidth/2) + "px";
			}
		}
	}

	// Start Game
	start(){
		this.initClock();
		this.GameOnLable();
		this.disableAllLinks();
		this.enableDragMode();
		this.enableFlipMode();
		this.injectImg();
	}

	// Pause Game
	pause(){
		this.disableDragMode();
	}

	// End Game
	end(){
		alert("game over")
		return false;
	}

	enableDragMode(){
		document.addEventListener('mousemove',this.mouseMove);
		document.addEventListener('mousedown',this.mouseDownEvent);
		document.addEventListener('mouseup',this.mouseUpEvent);
		this.mouseMode = 'drag';	
		return true;
	}

	disableDragMode(){
		document.removeEventListener('mousedown', this.mouseDownEvent);
		document.removeEventListener('mouseup', this.mouseUpEvent);
		document.removeEventListener('mousemove', this.mouseMove);
		this.mouseMode = 'default';
		return true;
	}

	enableFlipMode(){
		document.addEventListener('dblclick',this.event_doubleClick_flip);
		this.mouseMode = "flip";
		return true;
	}
	//injecting img to the first layer of the body TODO get image path function as paramater
	injectImg(){
		let imgSrc = "https://chairmanmigo.com/wp-content/uploads/2014/06/Wheres-Waldo-Face.jpg";
		let injectObj = document.createElement("img");
		injectObj.style.width= "150px";
		injectObj.style.height= "150px";
		injectObj.style.visibility='visible';
		let randElem = this.chooseRandElem(); 
		injectObj.src = imgSrc;
		injectObj.height = randElem.style.height;
		randElem.appendChild(injectObj)
		console.log( window.screenTop);
 

	}

	//get the body element TODO: choose random div from body
	chooseRandElem(){
		let baseBodyPath =document.getElementsByTagName("body")[0].getElementsByTagName("div");
		let rndChildInx = Math.floor((Math.random() *  baseBodyPath.length) );	
		let randElem = baseBodyPath[rndChildInx];
		console.log(baseBodyPath);
		console.log(randElem);
		/*console.log(this.isInViewPort(randElem));*/
		if (randElem.nodeName =="DIV" || randElem.nodeName =="IMG"|| randElem.nodeName =="P") {
			return randElem;
		}/*TODO - decide what to do if elemt is not in viewport - 
		else{
			return this.chooseRandElem();
		}*/		
	}


	//function to chek if element is on screen

	isInViewPort(element){
		var bounding = element.getBoundingClientRect();
		console.log(bounding.y + " top " +bounding.x + " left "+bounding.y + " bottom "+bounding.x + " right ");
		console.log(bounding);
	    if (bounding.x > 0 &&
	        bounding.y > 0 && 
	        bounding.y < (window.innerHeight || document.documentElement.clientHeight) &&
	        bounding.x < (window.innerWidth || document.documentElement.clientWidth)){

	    	return true;
	    }    
	    return false;
	}
	//Preventing defult on click for elements Arr
	disableLinks(elements){
		for (var i = 0; i < elements.length; i++) {
				//this.RemoveClickEvent(elements[i]);
				elements[i].setAttribute("onClick","event.preventDefault();");
				elements[i].href = "/#";
			//	console.log(elements[i]);
		}
	}


	//making elements array and disabling thire click
	disableAllLinks(){
		let divElementss = document.getElementsByTagName('div');
		let aElements = document.getElementsByTagName('a');
		let imgElements = document.getElementsByTagName('img');
		let LinksElements = document.getElementsByTagName('link');
		let spanElements = document.getElementsByTagName('span');
		this.disableLinks(divElementss);
		this.disableLinks(aElements);
		this.disableLinks(imgElements);
		this.disableLinks(spanElements);

	}	
	//not sure we will use this to prevent elements to have event listenrs
    RemoveClickEvent(element){
    	let old_element = element;
		let new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
    }
// the game on lable TODO: add where is waldo parameters for debug
	GameOnLable(){
		let body = document.getElementsByTagName('body');
		let gameOnLable = document.createElement("div"); 
		let lableContent = document.createTextNode("Game on!"); 
		this.clockLabel()
		gameOnLable.style.fontSize= "85px";https://www.camoni.co.il/#
		gameOnLable.style.fontWeight="400";
		gameOnLable.style.lineHeight = "2em";
		gameOnLable.style.backgroundColor = "#24b9e7";
		gameOnLable.style.textAlign= "center";
		gameOnLable.style.direction= "ltr";
		gameOnLable.appendChild(lableContent);
		document.body.insertBefore(this.clock, document.body.firstChild);
		document.body.insertBefore(gameOnLable, document.body.firstChild);
	}

	initClock(){
		if (this.timeInSec >= 0) {	
			setInterval (() => {	
				this.timeInSec--;
				this.clockLabel()
			}, 1000);
		}else{
			this.end;
		}
	}

	clockLabel(){
		if(!this.clock) {
			this.clock = document.createElement("div");
			this.clock.style.fontSize= "45px";
			this.clock.style.backgroundColor = "#24b9e7";
			this.clock.style.textAlign= "center";
			this.clock.style.direction= "ltr";
			document.body.appendChild(this.clock)
		}
		this.clock.innerHTML = `${Math.floor(this.timeInSec/60)} Min ${Math.floor(this.timeInSec%60)}Sec`;
		
		return this.clock;
	}
	




// TODO: Add disableLinks Function and call it in start game
	// TODO: Add disableFlipMode Function
}