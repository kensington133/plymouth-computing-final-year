// Place your global variables and functions here.
var frozenLights = [];
var car = {'driver': 'Barry', 'wheels': 3};

function randomColor(){
	var rc = "#";
	for(var c=0;c<3;c++){
		var r = Math.floor(Math.random()*256).toString(16);
		rc += (r.length<2) ? "0"+r : r;
	}
	return(rc);
}

function allRed() {
	$('#redBtn').click( function(){
		$('.lights .light').css('background-color', 'red');
	});
}

function allRandom() {

	$('#rndBtn').click( function(){
		//simple way
		/*$('.lights .light:not(".frozen")').each( function( index ){

			$(this).css('background-color', randomColor());

			var randSize = Math.floor((Math.random() * 25) + 5);
			$(this).height(randSize+'px');
			$(this).width(randSize+'px');
		});*/

		//array way
		for(var i = 0; i < lights.length; i++){
			$(lights[i]).css('background-color', randomColor());

			var randSize = Math.floor((Math.random() * 25) + 5);
			$(lights[i]).height(randSize+'px').width(randSize+'px');
		}
	});
}

function freezeDot() {

	//simple way
	/*$('.lights .light').click( function(){
		$(this).toggleClass('frozen');
	});*/

	//array way
	$('.lights .light').click( function(){

		frozenLights.push($(this).attr('id'));
		console.log(frozenLights);

		for(var z = 0; z < frozenLights.length; z++) {
			//skipping first two as they are added in somehow
			if(z > 1) {
				// console.log(frozenLights[z]);
				$('#'+frozenLights[z])
			}
		}
	});
}



function displayCar() {

	$('.driver').text('Driver: '+car.driver);

	for(var i = 0; i < car.wheels; i++){
		$('#wheelLight'+i).css('background-color', 'green');
	}

}

function changeCar() {
	$('#displayBtn').click( function(){
		car.driver = $('.driverTxt').val();
		car.wheels = $('.wheelsTxt').val();
		displayCar();
	});

}

$(function(){

	// Your code here.
	allRed();
	allRandom();
	freezeDot();
	displayCar();
	changeCar();
});