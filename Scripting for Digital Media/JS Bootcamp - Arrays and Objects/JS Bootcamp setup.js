var LIGHTS_NUMOF = 100;
var WHEELS_MAX_NUMOF = 4;

var lights = [];
var wheelLights = [];

$(function(){

	for(var l=0;l<LIGHTS_NUMOF;l++){
		var newLight = $("<div class=\"light\" id=\"light"+l+"\"></div>");
		$(".lights").append(newLight);
		lights.push(newLight);
	}

	for(var l=0;l<WHEELS_MAX_NUMOF;l++){
		var newLight = $("<div class=\"light\" id=\"wheelLight"+l+"\"></div>");
		$(".car").append(newLight);
		wheelLights.push(newLight);
	}

});