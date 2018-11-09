
function val_to_hexa(val){
	var ans = "";
	var d16 = Math.floor(val / 16);
	var m16 = val % 16;
	if(d16 < 10){ans += d16; }
	else{
		if(d16 == 10){ans += "a"; }
		if(d16 == 11){ans += "b"; }
		if(d16 == 12){ans += "c"; }
		if(d16 == 13){ans += "d"; }
		if(d16 == 14){ans += "e"; }
		if(d16 == 15){ans += "f"; }
	}
	if(m16 < 10){ans += m16; }
	else{
		if(m16 == 10){ans += "a"; }
		if(m16 == 11){ans += "b"; }
		if(m16 == 12){ans += "c"; }
		if(m16 == 13){ans += "d"; }
		if(m16 == 14){ans += "e"; }
		if(m16 == 15){ans += "f"; }
	}
	return ans;
}

function val_to_hexa3(val1, val2, val3){
	var ans = "#";
	ans += val_to_hexa(val1);
	ans += val_to_hexa(val2);
	ans += val_to_hexa(val3);
	return ans;
}

$(document).ready(function(){
	var r_slider = document.getElementById("red");
	var g_slider = document.getElementById("green");
	var b_slider = document.getElementById("blue");
	var color_block = document.getElementById("color");

	var r_output = document.getElementById("red_value");
	var g_output = document.getElementById("green_value");
	var b_output = document.getElementById("blue_value");
	var hex_output = document.getElementById("hex_value");

	r_output.innerHTML = "Red: " + r_slider.value;
	g_output.innerHTML = "Green: " + g_slider.value;
	b_output.innerHTML = "Blue: " + b_slider.value;
	hex_output.innerHTML = "Color in Hexadecimal Form: " + val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
	color_block.style.backgroundColor = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);

	r_slider.oninput = function() {
		var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
  		r_output.innerHTML = "Red: " + r_slider.value;
  		hex_output.innerHTML = "Color in Hexadecimal Form: " + tmp;
  		color_block.style.backgroundColor = tmp;
	}
	g_slider.oninput = function() {
		var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
  		g_output.innerHTML = "Green: " + g_slider.value;
  		hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
  		color_block.style.backgroundColor = tmp;
	}
	b_slider.oninput = function() {
		var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
  		b_output.innerHTML = "Blue: " + b_slider.value;
  		hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
  		color_block.style.backgroundColor = tmp;
	}


});

