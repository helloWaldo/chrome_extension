class injector{
	constructor(){
		this.imgSrc;
		this.injectObj = document.createElement("img");
		this.injectObj.id="waldoImg"
		this.injectObj.style.width= "150px";
		this.injectObj.style.height= "150px";
		this.injectObj.style.position= "absolute";		
		this.injectObj.style.visibility='visible';	
		this.injectObj.style.top =  hideElem.offsetTop + "px";
		this.injectObj.style.left =  hideElem.offsetLeft + "px";
		this.injectObj.style.zIndex= hideElem.style.zIndex + 1000;
		this.injectObj.src = imgSrc;
		//this.injectObj.style.zIndex= -5;
	}

		//injecting img to the first layer of the body TODO get image path function as paramater
	injectImg(){
		this.imgSrc = "https://chairmanmigo.com/wp-content/uploads/2014/06/Wheres-Waldo-Face.jpg"
		let hideElem = elemMan.chooseRandElem(this.injectObj); 
		hideElem.prepend(injectObj);
		this.injectObj.addEventListener('mouseup',() => {
			waldoGame.end()
		});
		console.log( hideElem.clientTop);
		console.log( window.screenTop);
	}

}