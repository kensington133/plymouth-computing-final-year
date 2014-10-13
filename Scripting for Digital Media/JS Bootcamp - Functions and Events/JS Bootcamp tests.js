function rgb2hex(color) {
    digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    red = parseInt(digits[2],10);
    green = parseInt(digits[3],10);
    blue = parseInt(digits[4],10);
    rgb = blue | (green << 8) | (red << 16);
    if(red === 0 && green === 0){
        return digits[1] + '#0000' + rgb.toString(16);
    }else{
        if(red === 0 && green < 15){
            return digits[1] + '#000' + rgb.toString(16);
        }else{
            if(red === 0 && green > 15){
                return digits[1] + '#00' + rgb.toString(16);
            }else{
                if(red < 15){
                    return digits[1] + '#0' + rgb.toString(16);
                }else{
                    return digits[1] + '#' + rgb.toString(16);
                }
            }
        }
    }
}

function randomColor() {
    letters = '0123456789abcdef'.split('');
    color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

module( "module", {
    setup: function(){
        original_color1 = $("#light1").css("background-color");
        original_color2 = $("#light2").css("background-color");
        original_text = $("#colorText").val();
   },
    teardown: function() {
        $("#light1").css("background-color",original_color1);
        $("#light2").css("background-color",original_color2);
        $("#colorText").val(original_text);
    }
});

// Testing style/css

test("testing initial styles and values", function(){
    equal(rgb2hex($("#light1").css("background-color")),"#808080","checking that ligh1 has background color 808080");
    equal(rgb2hex($("#light2").css("background-color")),"#808080","checking that ligh2 has background color 808080");
    equal($("#colorText").val(),"#0000ff","checking that the initial text in the input text area is \'#0000ff\'");
});

// Tests for behavior/JavaScript

test("testing the \'Red\' and \'Green\' button behaviors", function(){
    $('#red').trigger('click');
    equal(rgb2hex($("#light1").css("background-color")),"#ff0000","checking that the \'Red\' button turns light1 red");
    $('#green').trigger('click');
    equal(rgb2hex($("#light1").css("background-color")),"#00ff00","checking that the \'Green\' button turns light1 green");
});

test("testing that light1 is registered for setColor events", function(){
    $("#light1").trigger("setColor",["#ff00ff"]);
    equal(rgb2hex($("#light1").css("background-color")),"#ff00ff","checking that a setColor event changes the color of light1");
});

test("testing that the \'Set Color\' button clears the input text area", function(){
        $('#setColor').trigger('click');
        equal($("#colorText").val(),"","checking that the input text area is clear");
});

test("testing the default (blue) \'Set Color\' button behaviour", function(){
    $("#setColor").trigger('click');
    equal(rgb2hex($("#light1").css("background-color")),"#0000ff","checking that the \'Set Color\' button turns the top light div blue");
});

test("Testing the \'Set Color\' button behaviour with random color",function(){
    rndColor = randomColor();
    $("#colorText").val(rndColor);
    $("#setColor").trigger('click');
    equal(rgb2hex($("#light1").css("background-color")),rndColor,"checking that the \'Set Color\' button turns the top light div "+rndColor);
});

asyncTest("testing the bottom light div polling behaviour", function(){
    equal(rgb2hex($("#light1").css("background-color")),"#808080","checking that the top light div has initial background color 808080");
    equal(rgb2hex($("#light2").css("background-color")),"#808080","checking that the bottom light div has initial background color 808080");
    rndColor = randomColor();
    $("#colorText").val(rndColor);
    $("#setColor").trigger('click');
    equal(rgb2hex($("#light1").css("background-color")),rndColor,"checking that the \'Set Color\' button turns the top light div "+rndColor);
    setTimeout(function(){
        equal(rgb2hex($("#light2").css("background-color")),rndColor,"checking that the bottom light div has polled the color "+rndColor);
        start();
    },500);
});
