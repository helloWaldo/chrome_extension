class elementsManipulator{	

	constructor(){
		this.baseBodyPath = document.getElementsByTagName("body")[0].getElementsByTagName("div");
		this.clickedElem;
		this.zIndex=1000;
		this.oldWidth;
		this.oldStyle;
		this.callIndex=0;
		this.randElem;
		this.maxRecusion = 1000;

	}

	flip(elem){
		if(this.clickedElem.style.transform != "rotateY(180deg)" ){
			this.clickedElem.style.transform = "rotateY(0deg)";
			this.addTransition (elem,"transform","1s");
			this.clickedElem.style.transform = "rotateY(180deg)";
		}else{
			this.clickedElem.style.transform = "rotateY(180deg)";
			this.addTransition (this.clickedElem,"transform","1s");
			this.clickedElem.style.transform = "rotateY(0deg)";			
		}
		this.deSelectElem(this.clickedElem);
	}

	fixed(){
		this.clickedElem.style.position = "fixed";
	}

	addTransition(elem, style, duration){
		this.clickedElem.style.transition = style + " " + duration + " ease";
		//elem.style.transition = "transform 1s ease";
	}

	paddingless(){
		this.clickedElem.style.padding = "0";
	}

	prepareElem(){
		this.fixed(this.clickedElem);
		this.paddingless(this.clickedElem);
		this.clickedElem.style.zIndex= this.zIndex++;
		
	}

	selectElem(event){
		this.clickedElem = event.toElement;
		this.oldStyle = this.clickedElem.getBoundingClientRect()
		this.computed = getComputedStyle(this.clickedElem).cssText
		let tempElem = document.createElement("div");
		tempElem.style.cssText = this.computed;
/*		this.oldStyle.cssText = tempElem.style
		this.oldStyle.fontSize = tempElem.style.fontSize
		this.oldStyle.fontFamily = tempElem.style.fontFamily
		this.oldStyle.fontStyle = tempElem.style.fontStyle
		this.oldStyle.lineHeight = tempElem.style.lineHeight
		this.oldStyle.fontWeight = tempElem.style.fontWeight
		this.oldStyle.border = tempElem.style.border
		this.oldStyle.borderRadius = tempElem.style.borderRadius
		this.oldStyle.background = tempElem.style.background
		this.oldStyle.backgroundColor = tempElem.style.backgroundColor
		this.oldStyle.backgroundImage = tempElem.style.backgroundImage*/
		this.cloneStyle(this.oldStyle, this.clickedElem)
		this.prepareElem(this.clickedElem);
		
	//debugger
	
	}
	//TODO: when finish drag the element is in fixed postion - need to decide if this is o.k or want to reinsert it to DOM in absolute position
	deSelectElem(){
		this.baseBodyPath[0].appendChild(this.clickedElem)
		this.clickedElem.style.top = this.clickedElem.offsetTop + window.scrollY +"px"
		this.clickedElem.style.left = this.clickedElem.offsetLeft + window.scrollX +"px"
		this.clickedElem.clientY = this.clickedElem.offsetTop +  window.scrollY
		this.clickedElem.clientX = this.clickedElem.offsetLeft + window.scrollX
		this.clickedElem.style.position = "absolute"
		this.clickedElem=null;
	}

	cloneStyle(fromStyle, toElem){
		toElem.style.width = fromStyle.width+'px'
		toElem.style.maxWidth = fromStyle.width+'px'
		toElem.style.minWidth = fromStyle.width+'px'
		toElem.style.height = fromStyle.height+'px'
		toElem.style.maxHeight = fromStyle.height+'px'
		toElem.style.minHeight = fromStyle.height+'px'
		toElem.style.fontSize = fromStyle.fontSize+'px'
		toElem.style.lineHeight = fromStyle.lineHeight+'px'
		toElem.style.fontStyle = fromStyle.fontStyle
		toElem.style.fontWeight = fromStyle.fontWeight
		toElem.style.fontFamily = fromStyle.fontFamily
		toElem.style.padding = fromStyle.padding+'px'
		toElem.style.border = fromStyle.border+'px'
		toElem.style.borderRadius = fromStyle.borderRadius+'px'
		toElem.style.backgroundColor = fromStyle.backgroundColor
		toElem.style.backgroundImage = fromStyle.backgroundImage
		return false
	}

	//choose random element from DOM
	chooseRandElem(){
		this.callIndex++;
		let rndChildInx = Math.floor((Math.random() * this.baseBodyPath.length));	
		this.randElem = this.baseBodyPath[rndChildInx];
		console.log(this.randElem);
		if ((this.randElem.nodeName =="DIV" || this.randElem.nodeName =="IMG"|| this.randElem.nodeName =="P") && this.isHidable()) {
			return this.randElem;
		}else if(this.callIndex < this.maxRecusion){
			return this.chooseRandElem();
		}
		console.log("too many recursion: "+this.callIndex);
		return false;	
	}

	isHidable(){
	//let bounding = element.getBoundingClientRect();
		if(this.randElem.clientLeft >= 0 && 
		   this.randElem.clientTop >= 0 && 
		   this.randElem.clientWidth > parseInt(injecto.injectObj.style.width) &&
		   this.randElem.clientHeight > parseInt(injecto.injectObj.style.height)) {
			 return true;
		}
		return false;
	}

		//Preventing defult on click for elements Arr
	disableLinks(elements){
		for (var i = 0; i < elements.length; i++) {
				elements[i].setAttribute("onClick","event.preventDefault();");
				elements[i].setAttribute("onmousedown","event.preventDefault();");
				elements[i].href = "/#";
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
/*    cloneReplace(element){
    	let old_element = element;
		let new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
    }*/

/*  checks if element on visible window 

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
	}*/

/*	
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
	}*/
}