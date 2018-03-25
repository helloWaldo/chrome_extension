class elementsManipulator{	
	constructor(){
		
	}

	flip(elem){
		elem.style.transform = "rotateY(180deg)";
	}

	absolute(elem){
		elem.style.position = "fixed";
	}

	paddingless(elem){
		elem.style.padding = "0";
	}

	selectElem(elem){
		this.absolute(elem);
		this.paddingless(elem);
	}
}