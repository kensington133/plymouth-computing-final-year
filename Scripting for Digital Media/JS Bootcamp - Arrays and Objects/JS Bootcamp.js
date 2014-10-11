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
	//click on red button changes all instances of the class light to red
	$('#redBtn').click( function(){
		$('.lights .light').css('background-color', 'red');
	});
}

function allRandom() {

	$('#rndBtn').click( function(){
		//jQuery way
		/*$('.lights .light:not(".frozen")').each( function(){

			$(this).css('background-color', randomColor());

			var randSize = Math.floor((Math.random() * 25) + 5);
			$(this).height(randSize+'px');
			$(this).width(randSize+'px');
		});*/

		//array way
		for(var i = 0; i < lights.length; i++){

			//for each light check if in frozen array
			for(var z = 0; z < frozenLights.length; z++){

				if(frozenLights[z].id == $(lights[i]).attr('id')){
					var frozenIndex = z;
					break;
				}
			}

			//if it isn't in the array change the colour and sizes
			if(frozenIndex !== i) {
				$(lights[i]).css('background-color', randomColor());
				var randSize = Math.floor((Math.random() * 25) + 5);
				$(lights[i]).height(randSize+'px').width(randSize+'px');
			}
		}
	});
}

function freezeDot() {

	//jQuery way
	/*$('.lights .light').click( function(){
		$(this).toggleClass('frozen');
	});*/

	//array way
	$('.lights .light').click( function(){

		//check if light is in frozen array
		var light = $(this)[0];
		for(var b = 0; b < frozenLights.length; b++){
			if(light.id == frozenLights[b].id) {
				var index = b;
				break;
			}
		}

		//if it is take it out
		if(index > -1){
			frozenLights.splice(index, 1);
		} else {
			//otherwise add it to the frozen array
			frozenLights.push($(this)[0]);
		}
	});
}


//car funcs
function displayCar() {

	//update text to current driver name
	$('.driver').text('Driver: '+car.driver);

	//reset all to grey before changing to green
	$('.car .light').css('background-color', '#888888');

	//for each car wheel change to green
	for(var i = 0; i < car.wheels; i++){
		$(wheelLights[i]).css('background-color', '#00ff00');
	}
}

function changeCar() {

	//when display button is pressed
	$('#displayBtn').click( function(){

		//update object
		car.driver = $('.driverTxt').val();
		car.wheels = $('.wheelsTxt').val();

		//call display function to update values on screen
		displayCar();
	});
}

$(function(){

	//Call all functions when DOM is loaded
	allRed();
	allRandom();
	freezeDot();
	displayCar();
	changeCar();
});