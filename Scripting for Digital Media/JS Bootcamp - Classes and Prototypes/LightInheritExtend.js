// Add you LightInheritExtend class code here...
function LightInheritExtend() {

	Size.apply(this, Array.prototype.slice.call(arguments));

	this.isOn = true;
	setLight(this.isOn);

	this.changeLight = function(){
		switch(this.isOn){
			case false:
				this.isOn = true;
			break;
			case true:
				this.isOn = false;
			break;
		}
		setLight(this.isOn);
	}

	this.change = function(){
		this.changeSize();
		this.changeLight();
	}

}
