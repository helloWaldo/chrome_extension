class elementsManipulator{	

	constructor(){
		this.clickedElem;
		this.zIndex=1000;
		this.oldWidth;
		this.oldheight;

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
		this.oldWidth = this.clickedElem.offsetWidth
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
		//baseBodyPath[0].appendChild(elem)

		this.clickedElem.style.top = this.clickedElem.offsetTop + window.scrollY +"px"
		this.clickedElem.style.left = this.clickedElem.offsetLeft + window.scrollX +"px"
		this.clickedElem.clientY = this.clickedElem.offsetTop +  window.scrollY
		this.clickedElem.clientX = this.clickedElem.offsetLeft + window.scrollX
		this.clickedElem.style.width = this.oldWidth
		this.clickedElem.style.height = this.oldheight
		elem.style.position = "absolute"

		this.clickedElem=null;


	}
}