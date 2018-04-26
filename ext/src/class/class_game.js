class game{

	constructor(){
		this.timeInSec = 180;
		this.mouseMode = 'default';
		this.gameEvents = new gameEvents();
		this.isPause = 0
	}

	// Start Game
	start(){
		this.gameEvents.enableDragMode()
		this.gameEvents.enableFlipMode()
		this.gameEvents.enablePause()
		elemMan.disableAllLinks()
		this.originalBody = document.body.innerHTML
		injecto.injectImg()
		setTimeout(() =>{ initGame = new initGame()},100)
	}

	// Pause Game
	pause(){
		if(this.isPause == 0){
			elemMan.showOldBody()
			this.gameEvents.disableDragMode();
			this.pauseElem = document.createElement('div');
			this.pauseElem.classList.add('game-pause-icon');
			document.body.appendChild(this.pauseElem);
			this.isPause = 1
		} else {
			elemMan.returnGameBody()
			this.gameEvents.enableDragMode()
			this.isPause = 0
		}
	}

	// End Game
	end(){
		alert("game over");
		clearInterval(initGame.timeInterval);
		
		return false;
	}
}