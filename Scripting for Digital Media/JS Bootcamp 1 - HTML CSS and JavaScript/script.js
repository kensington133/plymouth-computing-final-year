function changeColour(){

	var trafficLight = $('.light');
	var currentColour = $('.light').css('background-color');

	switch(currentColour){
		//red
		case 'rgb(255, 0, 0)':
			$(trafficLight).css('background-color', '#ffff00');
		break;
		//amber
		case 'rgb(255, 255, 0)':
			$(trafficLight).css('background-color', '#00ff00');
		break;
		//green
		case 'rgb(0, 255, 0)':
			$(trafficLight).css('background-color', '#ff0000');
		break;
	}
}

function handleNext() {

	$('#next').click( function(){
		changeColour();
	});
}

$(document).ready( function(){
	handleNext();
});