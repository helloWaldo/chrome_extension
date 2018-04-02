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
		this.deSelectElem(this.clickedElem);
	}

	absolute(elem){
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
		this.absolute(elem);
		this.paddingless(elem);
		elem.style.zIndex= this.zIndex++;
	}

	selectElem(event){
		this.clickedElem= event.toElement;
		this.prepareElem(this.clickedElem);
	}

	deSelectElem(){
		this.clickedElem=null;
	}
}