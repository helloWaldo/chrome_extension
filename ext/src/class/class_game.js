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
		this.enableDragMode();
		this.enableFlipMode();
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

	// TODO: Add disableFlipMode Function

	// TODO: Add disableLinks Function and call it in start game

}