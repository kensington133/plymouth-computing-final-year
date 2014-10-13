var sizeObject;
var lightObject;

function createSize(){

	// Add your Size object initialisation code here...
	sizeObject = new Size();

	// Add your size-related event handlers here...
	$('#change').click( function(){
		sizeObject.change();
	});
}

function createLight(){
	if(!$("#inherit").prop('checked')){
		$("#changeSize").prop('disabled',true);

		// Add your Light object initialisation code here...
		lightObject = new Light();

		// Add your Light-related event handlers here...
		$('#changeLight').click( function(){
			lightObject.change();
		});

	}else{ // The inherit checkbox is checked

		if($("#override").prop('checked')){

			// Add your LightInherit object initialisation code here...

		}else{ // The extend radio butten is checked

			// Add your LightInheritExtend object initialisation code here...

		}

		// Add your LightInherit and LightInheritExtend-related event handlers here...

	}
}

// You should not edit the code below

function setSize(size){
	if(size == 50){
		$(".light").css('width',50);
		$(".light").css('height',50);
		$(".light").css('border-radius',25);
	}else{
		$(".light").css('width',80);
		$(".light").css('height',80);
		$(".light").css('border-radius',40);
	}
}

function setLight(light){
	if(light){
		$(".light").css('background-color',"#ffff00");
	}else{
		$(".light").css('background-color',"#808080");
	}
}

function disableControlEnableDisplay(){
	$("#createLight").prop('disabled',true);
	$("#createSize").prop('disabled',true);
	$("#inherit").prop('disabled',true);
	$("#override").prop('disabled',true);
	$("#extend").prop('disabled',true);

	$("#change").prop('disabled',false);
	$("#changeLight").prop('disabled',false);
	$("#changeSize").prop('disabled',false);
}

$(function(){
	$("#override").prop('checked',true);
	$(".methods").prop('disabled',true);
	$("#change").prop('disabled',true);
	$("#changeLight").prop('disabled',true);
	$("#changeSize").prop('disabled',true);

	$("#inherit").change(function(){
		if($(".methods").prop('disabled')){
			$(".methods").prop('disabled',false);
		}else{
			$("#override").prop('checked',true);
			$(".methods").prop('disabled',true);
		}
		if($("#createSize").attr('disabled')){
			$("#createSize").attr('disabled',false);
		}else{
			$("#createSize").attr('disabled',true);
		}

	});

	$("#createLight").click(function(){
		$("#displayContentPanel").append("<div class='light'></div>");
		disableControlEnableDisplay();
		createLight();
	});

	$("#createSize").click(function(){
		$("#displayContentPanel").append("<div class='light'></div>");
		disableControlEnableDisplay();
		$("#changeLight").prop('disabled',true);
		createSize();
	});

});