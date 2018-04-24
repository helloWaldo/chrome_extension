class game{

	constructor(){
		this.timeInSec = 180;
		this.mouseMode = 'default';
		this.gameEvents = new gameEvents();
	}

	// Start Game
	start(){
		this.gameEvents.enableDragMode();
		this.gameEvents.enableFlipMode();
		elemMan.disableAllLinks();
		injecto.injectImg();
		setTimeout(() =>{ initGame = new initGame()},100)
	}

	// Pause Game
	pause(){
		this.disableDragMode();
	}

	// End Game
	end(){
		alert("game over");
		clearInterval(initGame.timeInterval);
		
		return false;
	}
}