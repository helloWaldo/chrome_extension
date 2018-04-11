class game{

	constructor(){
		this.baseBodyPath = document.getElementsByTagName("body")[0].getElementsByTagName("div");
		this.timeInSec = 180;
		this.callIndex=0;
		this.maxRecusion = 1000;
		this.mouseMode = 'default';
		this.mouseX;
		this.mouseY;
		this.randElem;
		this.timeInterval;

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
		//needs work on where to put the element after drag
		this.mouseUpEvent = function(event){
/*			elemMan.clickedElem.clientX = this.mouseX + 'px'
			elemMan.clickedElem.clientY = this.mouseY + 'px'
			let placeHoldDiv = document.createElement("div")
			placeHoldDiv.clientX = this.mouseX + 'px'
			placeHoldDiv.clientY = this.mouseY + 'px'
			placeHoldDiv.style.zIndex = 5000
			document.getElementsByTagName("body")[0].appendChild(placeHoldDiv);
			elemMan.clickedElem.parentNode.removeChild( elemMan.clickedElem );
			placeHoldDiv.appendChild( elemMan.clickedElem );*/

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
		alert("game over");
		clearInterval(this.timeInterval);
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

	disableFlipMode(){
		document.removeEventListener('dblclick',this.event_doubleClick_flip);
		this.mouseMode = "default";
		return true;
	}
	//injecting img to the first layer of the body TODO get image path function as paramater
	injectImg(){
		let imgSrc = "https://chairmanmigo.com/wp-content/uploads/2014/06/Wheres-Waldo-Face.jpg";
		let injectObj = document.createElement("img");
		injectObj.id="waldoImg"
		injectObj.style.width= "150px";
		injectObj.style.height= "150px";
		injectObj.style.position= "absolute";
		//injectObj.style.zIndex= -5;
		injectObj.style.visibility='visible';

		let hideElem = this.chooseRandElem(injectObj); 
		injectObj.src = imgSrc;
		injectObj.style.top =  hideElem.offsetTop + "px";
		injectObj.style.left =  hideElem.offsetLeft + "px";
		injectObj.style.zIndex= hideElem.style.zIndex + 1000;
		hideElem.prepend(injectObj);
		injectObj.addEventListener('mousedown',() => {
			this.end()
		});
		console.log( hideElem.clientTop);
		console.log( window.screenTop);
	}

	//choose random element from DOM
	chooseRandElem(injectObj){
		this.callIndex++;
		let rndChildInx = Math.floor((Math.random() * this.baseBodyPath.length));	
		this.randElem = this.baseBodyPath[rndChildInx];
		console.log(this.randElem);
		//console.log(baseBodyPath);
		/*console.log(this.isInViewPort(randElem));*/
		//console.log(this.isHidable(injectObj,randElem));
		if ((this.randElem.nodeName =="DIV" || this.randElem.nodeName =="IMG"|| this.randElem.nodeName =="P") && this.isHidable(injectObj)) {
			return this.randElem;
		}else if(this.callIndex < this.maxRecusion){
			return this.chooseRandElem(injectObj);
		}
		console.log("too many recursion: "+this.callIndex);
		return false;	
	}

	isHidable(injectObj){
	//let bounding = element.getBoundingClientRect();
		if(this.randElem.clientLeft >= 0 && 
		   this.randElem.clientTop >= 0 && 
		   this.randElem.clientWidth > parseInt(injectObj.style.width) &&
		   this.randElem.clientHeight > parseInt(injectObj.style.height)) {
			 return true;
		}
		return false;
	}

	//Preventing defult on click for elements Arr
	disableLinks(elements){
		for (var i = 0; i < elements.length; i++) {
				//this.RemoveClickEvent(elements[i]);
				elements[i].setAttribute("onClick","event.preventDefault();");
				elements[i].setAttribute("onmousedown","event.preventDefault();");
				elements[i].href = "/#";
			//	console.log(elements[i]);
		}
	}


	//making elements array and disabling thire click
	disableAllLinks(){
		let divElementss = document.getElementsByTagName('div');
		let aElements = document.getElementsByTagName('a');
		let imgElements = document.getElementsByTagName('img');
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
		this.timeInterval = setInterval (() => {
			/*let el = document.getElementById('waldoImg')
			console.log(this.elementInViewport())
			console.log(this.findHighestZIndex('img'))
			console.log(el.style.zIndex)*/
			
			this.clockLabel()
			if (this.timeInSec >= 0) {
				this.timeInSec--;
			}else{
				this.end();
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
		this.clock.innerHTML = `${Math.floor(this.timeInSec/60)} Min ${Math.floor(this.timeInSec%60)}Sec`;
		return this.clock;
	}

	elementInViewport() {
	  let el = document.getElementById('waldoImg')

	  var top = el.offsetTop;
	  var left = el.offsetLeft;
	  var width = el.offsetWidth;
	  var height = el.offsetHeight;

	  while(el.offsetParent) {
	    el = el.offsetParent;
	    top += el.offsetTop;
	    left += el.offsetLeft;
	  }

	  return (
	    top >= window.pageYOffset &&
	    left >= window.pageXOffset &&
	    (top + height) <= (window.pageYOffset + window.innerHeight) &&
	    (left + width) <= (window.pageXOffset + window.innerWidth)
	  );
	}

	findHighestZIndex(elem){
	  var elems = document.getElementsByTagName(elem);
	  var highest = 0;
	  for (var i = 0; i < elems.length; i++)
	  {
	    var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
	    if ((zindex > highest) && (zindex != 'auto'))
	    {
	      highest = zindex;
	    }
	  }
	  return highest;
	}
}