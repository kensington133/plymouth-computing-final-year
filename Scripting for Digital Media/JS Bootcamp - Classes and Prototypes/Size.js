// Add your Size class code here...
function Size() {

	this.isSize = 80;
	setSize(this.isSize);

	this.changeSize = function(){
		switch(this.isSize){
			case 50:
				this.isSize = 80;
			break;
			case 80:
				this.isSize = 50;
			break;
		}
		setSize(this.isSize);
	}

	this.change = function() {
		this.changeSize();
	}
}