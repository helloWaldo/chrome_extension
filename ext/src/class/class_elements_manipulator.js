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
		if(elem.style.transform != "rotateY(180deg)" ){
			elem.style.transform = "rotateY(0deg)";
			this.addTransition (elem,"transform","1s");
			elem.style.transform = "rotateY(180deg)";
		}else{
			elem.style.transform = "rotateY(180deg)";
			this.addTransition (elem,"transform","1s");
			elem.style.transform = "rotateY(0deg)";			
		}
		//this.deSelectElem(elem);
	}

	fixed(){
		this.clickedElem.style.position = "fixed";
	}

	addTransition(elem, style, duration){
		elem.style.transition = style + " " + duration + " ease";
	}

	paddingless(){
		this.clickedElem.style.padding = "0";
	}

	prepareElem(){
		this.fixed(this.clickedElem);
		this.paddingless(this.clickedElem);
		this.clickedElem.style.zIndex= this.zIndex++;		
	}

	selectElem(event,element){
		this.callIndex++
		if(typeof element === "undefined"){
			this.clickedElem = event.toElement;
		} else {
			this.clickedElem = element;
		}
		if (this.isValidSelection(this.clickedElem) ) {
			//this.prepreChildrens(this.clickedElem);
			//this.clickedElem = event.target;
			this.callIndex = 0
			this.clickedElem.cssText =  getComputedStyle(this.clickedElem).cssText
			this.clickedElem.draggable = false;
			this.computed = getComputedStyle(this.clickedElem).cssText
			this.oldStyle = this.clickedElem.getBoundingClientRect()
			this.tempElem = document.createElement("div");
			this.tempElem.style.cssText = this.computed
			this.oldStyle.cssText = this.tempElem.style
			this.oldStyle.fontSize = this.tempElem.style.fontSize
			this.oldStyle.fontFamily = this.tempElem.style.fontFamily
			this.oldStyle.fontStyle = this.tempElem.style.fontStyle
			this.oldStyle.lineHeight = this.tempElem.style.lineHeight
			this.oldStyle.fontWeight = this.tempElem.style.fontWeight
			this.oldStyle.border = this.tempElem.style.border
			this.oldStyle.borderRadius = this.tempElem.style.borderRadius
			this.oldStyle.background = this.tempElem.style.background
			this.oldStyle.backgroundColor = this.tempElem.style.backgroundColor
			this.oldStyle.backgroundImage = this.tempElem.style.backgroundImage
			this.cloneStyle(this.oldStyle, this.clickedElem)
			this.prepareElem(this.clickedElem);
		} else {
			this.selectElem(null, this.clickedElem.parentElement)
		}

	}

	prepreChildrens(elem){
		if(true){
			//console.log(elem.children)
		}
	}

	isValidSelection(element){
		if (element.nodeType  == 1 && (element.tagName =="DIV" || element.tagName =="IMG") && this.maxRecusion > this.callIndex){

			return true
		}
		return false
	}

	//TODO: when finish drag the element is in fixed postion - need to decide if this is o.k or want to reinsert it to DOM in absolute position
	deSelectElem(){
		//this.clickedElem.style.cssText = window.getComputedStyle(this.clickedElem).cssText
		document.getElementsByTagName("body")[0].appendChild(this.clickedElem)
		this.clickedElem.style.position = "absolute"
		//this.clickedElem= this.tempElem
		this.clickedElem.style.top = this.clickedElem.offsetTop + window.scrollY +"px"
		this.clickedElem.style.left = this.clickedElem.offsetLeft + window.scrollX +"px"
		this.clickedElem.clientY = this.clickedElem.offsetTop +  window.scrollY
		this.clickedElem.clientX = this.clickedElem.offsetLeft + window.scrollX		
		this.cloneStyle(this.oldStyle, this.clickedElem)
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
		if ((this.randElem.nodeName =="DIV" || this.randElem.nodeName =="IMG"|| this.randElem.nodeName =="P") && this.isHidable()) {
			this.callIndex = 0
			return this.randElem;
		}else if(this.callIndex < this.maxRecusion){
			return this.chooseRandElem();
		}
		console.log("too many recursion: "+this.callIndex);
		return false;	
	}

	isHidable(){
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