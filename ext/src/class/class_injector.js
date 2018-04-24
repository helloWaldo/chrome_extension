class injector{
	constructor(){
		this.imgSrc =  "https://chairmanmigo.com/wp-content/uploads/2014/06/Wheres-Waldo-Face.jpg"
		this.injectObj = document.createElement("img")
		this.setInjectObj()
	}

	setInjectObj(){
		this.injectObj.id="waldoImg"
		this.injectObj.style.width= "150px"
		this.injectObj.style.height= "150px"
		this.injectObj.style.position= "absolute"		
		this.injectObj.style.visibility='visible'	
		this.injectObj.src = this.imgSrc
	}

	//injecting img to the first layer of the body TODO get image path function as paramater
	injectImg(){
		let hideElem = elemMan.chooseRandElem(this.injectObj) 
		this.injectObj.style.top =  hideElem.offsetTop + "px"
		this.injectObj.style.left =  hideElem.offsetLeft + "px"
		this.injectObj.style.zIndex= hideElem.style.zIndex + 1000
		hideElem.prepend(this.injectObj)
		this.injectObj.addEventListener('mouseup',() => {
			waldoGame.end()
		})
	}
}