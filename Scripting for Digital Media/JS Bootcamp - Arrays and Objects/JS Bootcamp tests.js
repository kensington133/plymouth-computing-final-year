function rndString(){
    var letters="abcdefghijklmnopqrstuvwxyz".split("");
    var rs = "";
    var rndLength = Math.floor(Math.random()*6+2);
    for(var rl=0;rl<rndLength;rl++){
        rs = rs+letters[Math.floor(Math.random()*letters.length)];
    }
    return(rs);
}

function resetLights(){
    for(var l=0;l<lights.length;l++){
        lights[l].css("background-color","#888888");
        lights[l].width("20px");
        lights[l].height("20px");
        lights[l].css("border-radius","10px");
    }
}

test("testing whether the lights turn red when 'red' is clicked",
    function(){
    $("#redBtn").click();
    var redCount = 0;
    for(var l=0;l<lights.length;l++){
    	if(lights[l].css("background-color")=="rgb(255, 0, 0)"){
     		redCount++;
     	}
    }
    ok(redCount==100, "checking that all the lights have turned red.");
    ok($("#controlLight").css("background-color")!="rgb(255, 0, 0)",
        "checking that other lights are not red");
    // Reset liht colours to grey
    for(var l=0;l<lights.length;l++){
    	lights[l].css("background-color","#888888");
    }
 });

test("testing whether lights get random colour/size when 'random' is clicked",
    function(){
	$("#rndBtn").click();
	var colors = [];
	var sizes = [];
    var sizeMax = -1;
    var sizeMin = 1000;
    for(var l=0;l<lights.length;l++){
		var color = lights[l].css("background-color");
		var size = lights[l].width();
		if(colors.indexOf(color) < 0){
			colors.push(color);
		}
		if(sizes.indexOf(size) < 0){
			sizes.push(size);
		}
        if(size<sizeMin){
            sizeMin=size;
        }
        if(size>sizeMax){
            sizeMax=size;
        }
	}
	ok(colors.length>50, "checking that more than 50 colors were created");
	ok(sizes.length>10, "checking that more than 10 sizes were created");
    ok(sizeMax<=30, "checking that random sizes are below or equal to 30px");
    ok(sizeMin>=5, "checking that random sizes are above or equal to 5px");
    resetLights();
});

test("testing whether lights can be frozen by clicking on them", function(){
    var frozenLight = lights[Math.floor(Math.random()*lights.length)];
    var nonFrozenLight = lights[Math.floor(Math.random()*lights.length)];
    while(nonFrozenLight[0].id == frozenLight[0].id){
       nonFrozenLight = lights[Math.floor(Math.random()*lights.length)];
    }
    frozenLight.click();
    equal(frozenLights[0].id,frozenLight[0].id,
          "checking that the clicked light is in the frozen lights array");
    $("#rndBtn").click();
    var nonFrozenChanges = false;
    for(var i=0;i<100;i++){
        $("#rndBtn").click();
        if((nonFrozenLight.css("background-color")!="rgb(136, 136, 136)") &&
            (nonFrozenLight.width()!=20)){
            nonFrozenChanges = true;
            break;
        }
    }
    ok(nonFrozenChanges,"checking that non-frozen lights change");
    equal(frozenLight.css("background-color"), "rgb(136, 136, 136)",
        "checking that colour of frozen light colour does not change");
    equal(frozenLight.width(),20,
        "checking that the size of frozen lights does not change");
    frozenLights = [];
    resetLights();
});

test("testing whether lights are un-frozen when clicked a second time",
    function(){
    var frozenLight = lights[Math.floor(Math.random()*lights.length)];
    frozenLight.click();
    equal(frozenLights.length,1,
        "checking that frozen node was added to list of frozen nodes");
    frozenLight.click();
    equal(frozenLights.length,0,
        "checking that un-frozen node was removed from list of frozen nodes");
    var unFrozenChanges = false;
    for(var i=0;i<100;i++){
        $("#rndBtn").click();
        if((frozenLight.css("background-color")!="rgb(136, 136, 136)") &&
            (frozenLight.width()!=20)){
            unFrozenChanges = true;
            break;
        }
    }
    ok(unFrozenChanges,"checking that non-frozen lights change");
    resetLights();
});

test("testing whether the car object is correctly declared", function(){
    equal(car.driver,
        "Barry","Checking that the car's driver is set to Barry");
    equal(car.wheels,3,
        "checking that the car's wheel value is 3");
});

test("testing whether the car divs reflect the values of the car object",
    function(){
    var driver = car.driver;
    var wheels = car.wheels;
    car.driver = rndString();
    car.wheels = Math.floor(Math.random()*wheelLights.length);
    displayCar();
    equal($(".driver").text(),"Driver: "+car.driver,
        "checking that the driver div reflects the car object");
    greenLights = 0;
    for(var wl=0;wl<wheelLights.length;wl++){
        if(wheelLights[wl].css("background-color") == "rgb(0, 255, 0)"){
            greenLights++;
        }
    }
    equal(greenLights,car.wheels,
        "checking that the number of green lights reflect the car object");
    car.driver = driver;
    car.wheels = wheels;
    displayCar();
});

test("testing whether clicking Display button updates the car object/divs",
    function(){
    var driver = car.driver;
    var wheels = car.wheels;
    $(".driverTxt").val(rndString());
    $(".wheelsTxt").val(Math.floor(Math.random()*wheelLights.length));
    $("#displayBtn").click();
    equal(car.driver,$(".driverTxt").val(),
        "checking that the car object has the driver value of the input");
    equal(car.wheels,$(".wheelsTxt").val(),
        "checking that the car object has the wheels value of the input");
    equal($(".driver").text(),"Driver: "+car.driver,
        "checking that the driver div reflects the car object");
    greenLights = 0;
    for(var wl=0;wl<wheelLights.length;wl++){
        if(wheelLights[wl].css("background-color") == "rgb(0, 255, 0)"){
            greenLights++;
        }
    }
    equal(greenLights,car.wheels,
        "checking that the number of green lights reflect the car object");
    $(".driverTxt").val("");
    $(".wheelsTxt").val("");
    car.driver = driver;
    car.wheels = wheels;
    displayCar();
});
