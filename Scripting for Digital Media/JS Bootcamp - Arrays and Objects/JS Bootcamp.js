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

//light funcs
function allRed() {

	$('#redBtn').click( function(){
		$('.lights .light').css('background-color', 'red');
	});
}

function allRandom() {

	$('#rndBtn').click( function(){
		//simple way
		/*$('.lights .light:not(".frozen")').each( function(){

			$(this).css('background-color', randomColor());

			var randSize = Math.floor((Math.random() * 25) + 5);
			$(this).height(randSize+'px');
			$(this).width(randSize+'px');
		});*/

		//array way
		for(var i = 0; i < lights.length; i++){
			for(var z = 0; z < frozenLights.length; z++){

				if(frozenLights[z].attr('id') == $(lights[i]).attr('id')){
					var frozenIndex = z;
					break;
				}
			}

			if(frozenIndex !== i) {
				$(lights[i]).css('background-color', randomColor());
				var randSize = Math.floor((Math.random() * 25) + 5);
				$(lights[i]).height(randSize+'px').width(randSize+'px');
			}
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

		/*var lightID = $(this).attr('id');
		var index = frozenLights.indexOf(lightID);

		//if item is already in there remove it
		if(index > -1) {
			frozenLights.splice(index, 1);
		} else {
		//add it to frozen
			frozenLights.push($(this).attr('id'));
		}*/

		var light = $(this);
		for(var b = 0; b < frozenLights.length; b++){
			if(light.attr('id') == frozenLights[b].attr('id')) {
				var index = b;
				break;
			}
		}

		if(index > -1){
			frozenLights.splice(index, 1);
		} else {
			frozenLights.push($(this));
		}

		console.log(index);
		console.log(frozenLights);

	});
}


//car funcs
function displayCar() {

	$('.driver').text('Driver: '+car.driver);

	//reset all to grey before changing to green
	$('.car .light').css('background-color', '#888888');

	for(var i = 0; i < car.wheels; i++){
		$(wheelLights[i]).css('background-color', '#00ff00');
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