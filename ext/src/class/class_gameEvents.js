class gameEvents{
	constructor(){

		this.mouseX;
		this.mouseY;

		this.event_doubleClick_flip= function(event) {
			if (event.button == 1 ){
				elemMan.flip(event.toElement)
				console.log("koko")
			}
		};

		this.mouseDownEvent = function(event){
			if (event.button != 1 ){
				document.body.style.cursor = "-webkit-grabbing"
				elemMan.selectElem(event);
			}
		};

		this.mouseUpEvent = function(event){
			if (event.button != 1 ){
				document.body.style.cursor = "-webkit-grab"
				elemMan.deSelectElem();
			}
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
	

	enableDragMode(){
		document.addEventListener('mousemove',this.mouseMove);
		document.addEventListener('mousedown',this.mouseDownEvent);
		document.addEventListener('mouseup',this.mouseUpEvent);		
		waldoGame.mouseMode = 'drag';	
		return true;
	}

	disableDragMode(){
		document.removeEventListener('mousedown', this.mouseDownEvent);
		document.removeEventListener('mouseup', this.mouseUpEvent);
		document.removeEventListener('mousemove', this.mouseMove);
		waldoGame.mouseMode = 'default';
		return true;
	}

	enableFlipMode(){
		document.addEventListener('mousedown',this.event_doubleClick_flip);
		waldoGame.mouseMode = "flip";
		return true;
	}

	disableFlipMode(){
		document.removeEventListener('dblclick',this.event_doubleClick_flip);
		waldoGame.mouseMode = "default";
		return true;
	}
}