class elementsManipulator{	

	constructor(){
		this.clickedElem;
		this.zIndex=1000;
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
		this.clickedElem= event.toElement;
		this.prepareElem(this.clickedElem);
	}
	//TODO: when finish drag the element is in fixed postion - need to decide if this is o.k or want to reinsert it to DOM in absolute position
	deSelectElem(elem){
		/*try to put elemnt in similar absolute position to current fixed position!*/
		/*var box = this.clickedElem.getBoundingClientRect();
		var offsetTop = Math.floor(box.top && box.top || box.y && box.y || 0);
		var offsetRight = Math.floor(box.left && box.left || box.x && box.x || 0);
		console.log(offsetRight)
		this.clickedElem.style.top = offsetTop+"px"
		this.clickedElem.style.left = offsetRight+"px"
		this.clickedElem.style.position = "absolute";*/
		//let baseBodyPath = document.getElementsByTagName("body")[0].getElementsByTagName("div");
		//elem.style.top = this.clickedElem.style.top  ;
		//elem.style.left = this.clickedElem.style.left ;
		//baseBodyPath[0].appendChild(elem)
		elem.style.position = "fixed"

		this.clickedElem=null;
		
	}
}