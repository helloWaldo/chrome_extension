class initGame{
	constructor(){
		this.timeInterval;
		this.GameOnLable()
		this.initClock()
	}

	// the game on lable TODO: add where is waldo parameters for debug
	GameOnLable(){
		let body = document.getElementsByTagName('body');
		let gameOnLable = document.createElement("div"); 
		let lableContent = document.createTextNode("Game on!"); 
		this.clockLabel()
		gameOnLable.style.fontSize= "85px";
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
		this.timeInterval = setInterval (() => {
			this.clockLabel()
			if (waldoGame.timeInSec > 0) {
				waldoGame.timeInSec--;
			}else{
				waldoGame.end();
			}
		}, 1000);
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
		this.clock.innerHTML = `${Math.floor(waldoGame.timeInSec/60)} Min ${Math.floor(waldoGame.timeInSec%60)}Sec`;
	}
}