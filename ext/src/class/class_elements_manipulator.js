class elementsManipulator{	

	constructor(){
		this.clickedElem;
		this.zIndex=1000;
		this.oldWidth;
		this.oldStyle;

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
		this.deSelectElem(elem);
	}

	fixed(elem){
		elem.style.position = "fixed";
	}

	addTransition(elem, style, duration){
		elem.style.transition = style + " " + duration + " ease";
		//elem.style.transition = "transform 1s ease";
	}

	paddingless(elem){
		elem.style.padding = "0";
	}

	prepareElem(elem){
		this.fixed(elem);
		this.paddingless(elem);
		elem.style.zIndex= this.zIndex++;
	}

	selectElem(event){
		this.clickedElem = event.toElement;
		//this.oldWidth = this.clickedElem.offsetWidth
		this.oldStyle = this.clickedElem.getBoundingClientRect()
		this.computed = getComputedStyle(this.clickedElem).cssText
		this.oldStyle.fontSize = this.clickedElem.style.fontSize
		this.oldStyle.fontFamily = this.clickedElem.style.fontFamily
		this.oldStyle.fontStyle = this.clickedElem.style.fontStyle
		this.oldStyle.lineHeight = this.clickedElem.style.lineHeight
		this.oldStyle.fontWeight = this.clickedElem.style.fontWeight
		this.oldStyle.border = this.clickedElem.style.border
		this.oldStyle.borderRadius = this.clickedElem.style.borderRadius
		this.oldStyle.background = this.clickedElem.style.background
		this.oldStyle.backgroundColor = this.clickedElem.style.backgroundColor
		this.oldStyle.backgroundImage = this.clickedElem.style.backgroundImage

		this.prepareElem(this.clickedElem);
	}
	//TODO: when finish drag the element is in fixed postion - need to decide if this is o.k or want to reinsert it to DOM in absolute position
	deSelectElem(elem){
		/*try to put elemnt in similar absolute position to current fixed position!*/
		let box = this.clickedElem.getBoundingClientRect();
		let offsetTop = Math.floor(box.top && box.top || box.y && box.y || 0);
		let offsetLeft = Math.floor(box.left && box.left || box.x && box.x || 0);
		console.log(box)
		let baseBodyPath = document.getElementsByTagName("body")[0].getElementsByTagName("div");
		baseBodyPath[0].appendChild(elem)

		//this.clickedElem.style.cssText = this.oldStyle
		//this.cloneStyle(this.oldStyle, this.clickedElem)

		this.clickedElem.style.top = this.clickedElem.offsetTop + window.scrollY +"px"
		this.clickedElem.style.left = this.clickedElem.offsetLeft + window.scrollX +"px"
		this.clickedElem.clientY = this.clickedElem.offsetTop +  window.scrollY
		this.clickedElem.clientX = this.clickedElem.offsetLeft + window.scrollX
		this.clickedElem.style.cssText = this.computed

		//this.clickedElem.style.height = this.oldheight
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
		debugger
		return false
	}
}