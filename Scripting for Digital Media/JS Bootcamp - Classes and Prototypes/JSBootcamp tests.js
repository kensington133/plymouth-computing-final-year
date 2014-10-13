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

function enableControlDisableDisplay(){
    $("#createLight").prop('disabled',false);
    $("#createSize").prop('disabled',false);
    $("#inherit").prop('disabled',false);
    $("#override").prop('disabled',true);
    $("#extend").prop('disabled',true);

    $("#change").prop('disabled',true);
    $("#changeLight").prop('disabled',true);
    $("#changeSize").prop('disabled',true);
}

module( "module", {
    teardown: function() {
        $(".light").remove();
        //sizeObject = null;
        //lightObject = null;
        enableControlDisableDisplay();
        $("#inherit").prop('checked',false);
        $("#override").prop('checked',true);
    }
});

// Tests
test("testing the initial Size class", function(){
    $("#displayContentPanel").append("<div class='light'></div>");
    instance = new Size();
    ok(instance instanceof Size,"checking that a Size object is of type 'object'");
    equal(instance.isSize,80,"checking that the size variable has initial value 80");
    equal($(".light").css('width'),"80px","checking that the light div width is 50px");
    equal($(".light").css('height'),"80px","checking that the light div height is 50px");
});

test("testing the Size class DOM integration", function(){
    $("#createSize").trigger('click');
    ok(sizeObject instanceof Size,"checking that the Size object is instantiated by clicking the 'Create Size' button");
});

test("testing the intagreted Size class change functions", function(){
    $("#createSize").trigger('click');

    sizeObject.changeSize();
    equal(sizeObject.isSize,50,"checking that calling the changeSize function changes the value of the isSize variable to 50");
    equal($(".light").css('width'),"50px","checking that calling the changeSize function makes the light div width 50px");
    equal($(".light").css('height'),"50px","checking that calling the changeSize function makes the light div height 50px");

    sizeObject.changeSize();
    equal(sizeObject.isSize,80,"checking that a second call to the changeSize function changes the value of the isSize variable back to 80");
    equal($(".light").css('height'),"80px","checking that a second call to the changeSize function sets the light div height back to 80px");

    sizeObject.change();
    equal(sizeObject.isSize,50,"checking that calling the change function changes the value of the isSize variable to 50");

    tempFunction = sizeObject.changeSize;
    sizeObject.changeSize = function(){var i=0;};
    sizeObject.change();
    equal(sizeObject.isSize,50,"checking that the change function makes use of the changeSize function");
    sizeObject.changeSize = tempFunction;
});

test("testing the Light class", function(){
    $("#createLight").trigger('click');
    ok(lightObject instanceof Light,"checking that the Light object is instantiated by clicking the 'Create Light' button");
    equal(lightObject.isOn,true,"checking that the size variable has initial value 50");
    equal(rgb2hex($(".light").css('background-color')),"#ffff00","checking that the light div background colour is yellow");
});

test("testing the integrated Light class change functions", function(){
    $("#createLight").trigger('click');

    lightObject.change();
    equal(lightObject.isOn,false,"checking that calling the change function changes the value of the isOn variable to false");

    tempFunction = lightObject.changeLight;
    lightObject.changeLight = function(){var i=0;};
    lightObject.change();
    equal(lightObject.isOn,false,"checking that the change function makes use of the changeSize function");
    lightObject.changeLight = tempFunction;
});

test("testing the LightInherit class", function(){
    $("#inherit").trigger('click');
    $("#createLight").trigger('click');
    ok(lightObject instanceof LightInherit,"checking that a Size object is instantiated by clicking the 'Create Size' button");
});

test("testing the LightInherit class's changeSize method", function(){
    $("#inherit").trigger('click');
    $("#createLight").trigger('click');
    lightObject.changeSize();
    equal(lightObject.isSize,50,"checking that calling the LightInherit object's changeSize method changes the value of the isSize variable to 50");
    $("#change").trigger('click');
    equal($(".light").css('height'),"50px","checking that clicking the Change button doesn't change the size of the light div");
});

test("testing the LightInheritExtend", function(){
    $("#inherit").trigger('click');
    $("#extend").trigger('click');
    $("#createLight").trigger('click');
    origSize = lightObject.isSize;
    origOn = lightObject.isOn;
    ok(lightObject instanceof LightInheritExtend,"checking that a Size object is instantiated by clicking the 'Create Size' button");
   lightObject.isSize = origSize;
   lightObject.isOn = origOn;
});

test("testing the LightInheritExtend class's change method", function(){
    $("#inherit").trigger('click');
    $("#extend").trigger('click');
    $("#createLight").trigger('click');
    origSize = lightObject.isSize;
    if(origSize == 50){
        expectSize = 80;
    }else{
        expectSize = 50;
    }
    lightObject.changeSize();
    equal(lightObject.isSize,expectSize,"checking that calling the LightInheritExtend object's changeSize method changes the value of the isSize variable");
    origOn = lightObject.isOn;
    if(origOn){
        expectColor = "#808080";
    }else{
        expectColor = "#ffff00";
    }
    lightObject.changeLight();
    equal(rgb2hex($(".light").css('background-color')),expectColor,"checking that calling the changeLight function changes the light div background colour");
    origSize = lightObject.isSize;
    origOn = lightObject.isOn;
    if(origSize == 50){
        expectSize = "80px";
    }else{
        expectSize = "50px";
    }
    if(origOn){
        expectColor = "#808080";
    }else{
        expectColor = "#ffff00";
    }
    lightObject.change();
    equal($(".light").css('height'),expectSize,"checking that calling the change function changes the size of the light div");
    equal(rgb2hex($(".light").css('background-color')),expectColor,"checking that calling the change function changes the light div background colour to grey");
});
