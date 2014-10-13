//set colour of both lights to grey
//set text of the input
function colourInit() {

	$('.light').css('background-color', '#808080');
	$('#colorText').val('#0000ff');
}

//register the event to light1
function registerEvent() {
	$('#light1').on('setColor', function(evt, inputColour){

		$('#light1').css('background-color', inputColour);

	});
}

//red and green colour buttons
function colourChanges() {
	$('#red').click( function(){
		$('#light1').css('background-color', 'red');
	});

	$('#green').click( function(){
		$('#light1').css('background-color', '#00ff00');
	});

}

function setColor() {
	$('#setColor').click( function(){

		var inputColour = $('#colorText').val();
		$('#light1').css('background-color', inputColour);

		$('#colorText').val('');
	});
}

function updateLight(){
	setTimeout( function(){
		$('#light2').css('background-color', $('#light1').css('background-color'));
	}, 500);
}

//ready
$(function(){
	colourInit();
	registerEvent();
	colourChanges();
	setColor();
	updateLight();
});