// Add you Light class code here...
function Light() {

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
		this.setLight();
	}
}