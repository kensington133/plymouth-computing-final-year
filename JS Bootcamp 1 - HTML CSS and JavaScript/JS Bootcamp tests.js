var output_text;

function rgb2hex(color) {
    digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    red = parseInt(digits[2],10);
    green = parseInt(digits[3],10);
    blue = parseInt(digits[4],10);
    rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);   
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}

test("testing page title", function(){
    ok($(document).attr('title').indexOf("Traffic Light")!=-1,"checking that the page title is Traffic Lights");
});

test("testing html element presence", function(){
    elements = ["div", "h1", "button"];
    element_nos = [3,1,0,0,3];
    for(i=0;i<elements.length;i++){
        elem = elements[i];
        ok($(elem).length>element_nos[i], "checking that an element of type "+elem+" has been added");
    }
});

test("testing html element classes and ids", function(){
    equal($(".main")[0].tagName, "DIV", "checking that the \'main\' class element is a div");
    equal($("#next")[0].tagName, "BUTTON", "checking that the element with id \'north\' is a button");
    equal($(".signature")[0].tagName, "DIV", "checking that the \'signature\'' class element is a div");
});

test("testing content of elements", function(){
    elements = ["h1", "#next", ".signature"];
    texts = ["Traffic Light", "Next", "by"];
    for(i=0;i<elements.length;i++){
        elem = elements[i];
        ok($(elem).html().indexOf(texts[i])!=-1,"checking that the "+elem+" element contains the text: "+texts[i]);
    }
});

// Testing style/css

test("testing main div styles", function(){
    properties = ["width", "color", "background-color"];
    //, "border-width", "border-style", "border-radius"];
    values = [200, "#303030", "#c0c0c0",];
    //, "2px", "solid", "15px"];
    for(i=0;i<properties.length;i++){
        prop = properties[i];
        val = values[i];
        if(prop.indexOf("color") != -1){
            equal(rgb2hex($(".main").css(prop)),val,"checking that the "+prop+" is "+val);
        }else if(prop=="width" || prop=="height"){
            ok(parseInt($(".main").css(prop).replace('px',''),10)-val<1.0,"checking that the "+prop+" is less than 1.0 away from "+val+".");
        }else{
            equal($(".main").css(prop),val,"checking that the "+prop+" is "+val);
        }
    }
});

test("testing light div styles", function(){
    equal(rgb2hex($(".light").css("background-color")),"#ff0000","checking that the light div background color is #ff000");
});

test("testing button styles", function(){
    properties = ["width"];
    //, "border-radius"];
    values = ["100px"];
    //, "8px"];
    for(i=0;i<properties.length;i++){
        prop = properties[i];
        val = values[i];
        equal($("#next").css(prop),val,"checking that the "+prop+" is "+val);
    }
});

test("testing signature element styles", function(){
    properties = ["font-size", "font-style"];
    values = [13, "italic"];
    for(i=0;i<properties.length;i++){
        prop = properties[i];
        val = values[i];
        if(prop=="font-size"){
            ok(parseInt($(".signature").css(prop).replace('px',''),10)-val<1.0,"checking that the "+prop+" is less than 1.0 away from "+val+".");
        }else{
            equal($(".signature").css(prop),val,"checking that the "+prop+" is "+val);
        }
    }
});

// Tests for behavior/JavaScript

test("testing the \'Next\' button behavior", function(){
    $('#next').trigger('click');
    equal(rgb2hex($(".light").css("background-color")),"#ffff00","checking that the \'Next\' button changes the light color from red to amber");
    $('#next').trigger('click');
    equal(rgb2hex($(".light").css("background-color")),"#00ff00","checking that the \'Next\' button changes the light color from red to amber");
    $('#next').trigger('click');
    equal(rgb2hex($(".light").css("background-color")),"#ff0000","checking that the \'Next\' button changes the light color from red to amber");
});

