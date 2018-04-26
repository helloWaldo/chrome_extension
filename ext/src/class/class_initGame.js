class initGame{
	constructor(){
		this.initPanel()
		this.timeInterval
		this.gameStatus()
		this.initClock()
		this.clockLabel()	
	}

	initPanel(){
		this.gamePanel = document.createElement("div"); 
		this.gamePanel.classList.add('game-panel');
		document.body.insertBefore(this.gamePanel, document.body.firstChild);
	}

	// the game on lable TODO: add where is waldo parameters for debug
	gameStatus(){
		this.gameStatus = document.createElement("div"); 
		this.gameStatusLabel = document.createTextNode("Game on!"); 
		this.clockLabel()
		this.gameStatus.classList.add('game-status');
		this.gameStatus.appendChild(this.gameStatusLabel);
		this.gamePanel.appendChild(this.gameStatus);
	}

	initClock(){
		this.timeInterval = setInterval (() => {
			if (waldoGame.timeInSec > 0 && waldoGame.isPause == 0) {
				waldoGame.timeInSec--;
			}else if(waldoGame.timeInSec > 0){
				//game pause 
			}
			else{
				waldoGame.end();
			}

			this.clockLabel()
		}, 1000);
	}

	clockLabel(){
		if(!this.clock) {
			this.clock = document.createElement("div");
			this.clock.classList.add('game-clock');
			this.gamePanel.appendChild(this.clock);
		}
		this.clockDiv = `${Math.floor(waldoGame.timeInSec/60)} Min ${Math.floor(waldoGame.timeInSec%60)}Sec`
		document.getElementsByClassName("game-clock")[0].innerHTML = this.clockDiv
			
	}
}