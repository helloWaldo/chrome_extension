class game{	
	constructor(){
		this.mouseMode = 'default';
		this.mouseX;
		this.mouseY;

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
		this.disableAllLinks();
		this.enableDragMode();
		this.enableFlipMode();
	//	this.injectImg();
	}

	// Pause Game
	pause(){
		this.disableDragMode();
	}

	// End Game
	end(){
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
		injectObj.src = imgSrc;

		this.chooseRandElem().appendChild(injectObj);
 

	}
	//get the body element TODO: choose random div from body
	//managed to make it bit more random' still needs works on element selection
	chooseRandElem(){
		let baseBodyPath = document.children[0].children[1].children[0];
		let rndChildInx = Math.floor((Math.random() *  baseBodyPath.children.length) + 1);
		let randElem = baseBodyPath.children[rndChildInx];
		console.log(document.children[0].children.length);
		console.log(rndChildInx);
		console.log(randElem);
		return randElem;
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

// TODO: Add disableLinks Function and call it in start game
	// TODO: Add disableFlipMode Function
}