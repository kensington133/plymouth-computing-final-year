// Add your Shape class code here...
function Shape(){
	this.isShape = "square";
	setShape(this.isShape);

	this.changeShape = function(){
		if(this.isShape == "circle"){
			this.isShape = "square";
		}else{
			this.isShape = "circle";
		}
		setShape(this.isShape);
	};

	/*
	this.change = function(){
		this.changeShape();
	};
	*/
}

Shape.prototype.change = function(){
	this.changeShape();
};