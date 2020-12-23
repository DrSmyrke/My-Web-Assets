var colpickBoxID			= "colpicBox";
var briSatBackground		= "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%), linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)";
var colpicControls			= { "width": 156, "height": 156, "manualInput": false };
var colpicData				= { 
	"pos": { "x": 156, "y": 156 },
	"brightMax": 200, 
	"rgb": { "r": 255, "g": 0, "b": 0 },
	"hsb": { "h": 1, "s": 0, "b": 100 },
	"targetLayer": -1,
	"button": undefined,
	"mouseDown": false,
	"mousePickerOut": true,
	"selectPreset": undefined,
	"canvas": undefined,
	"previewBox": undefined,
	"hexwBox": undefined,
	"removePresetButton": undefined,
	"presetsBox": undefined,
	"saturSlider": undefined,
};




function colpic_createBackground()
{
	var canvas = document.createElement("canvas");
	canvas.width	= 300;
	canvas.height	= 200;

	var canvasContext = canvas.getContext('2d');

	let gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, '#ff0000');
	gradient.addColorStop(1 / 6, '#ffff00');
	gradient.addColorStop((1 / 6) * 2, '#00ff00');
	gradient.addColorStop((1 / 6) * 3, '#00ffff');
	gradient.addColorStop((1 / 6) * 4, '#0000ff');
	gradient.addColorStop((1 / 6) * 5, '#ff00ff');
	gradient.addColorStop(1, '#ff0000');
	canvasContext.fillStyle = gradient;
	canvasContext.fillRect(0, 0, canvas.width, canvas.height)

	gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
	gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
	canvasContext.fillStyle = gradient;
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
	gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
	gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
	canvasContext.fillStyle = gradient;
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	return canvas;
}

function colpick_init()
{
	colpicData.canvas = colpic_createBackground();

	var div = document.createElement( "div" );

	div.id = colpickBoxID;
	div.style.background				= "rgba( 84, 84, 84, 0.7 )";
	div.style.border					= "1px solid black";
	div.style.position					= "absolute";
	div.style.top						= colpicData.pos.y + "px";
	div.style.left						= colpicData.pos.x + "px";
	div.style.padding					= "3px";
	div.style.borderRadius				= "7px";
	div.style.display					= "none";
	div.style.zIndex					= "9999";

	var divTitle = document.createElement( "div" );
	divTitle.style.textAlign	= "center";
	divTitle.className			= "title";
	div.appendChild( divTitle );

	var divPalitra = document.createElement( "canvas" );

		divPalitra.style.cursor = "crosshair";
		divPalitra.width	= colpicData.canvas.width;
		divPalitra.height	= colpicData.canvas.height;

		divPalitra.onmousedown = function(e){
			if( colpicData.saturSlider != undefined ) colpicData.saturSlider.value = 100;
			colpicData.mouseDown = true;
			colpick_moveSelector( e );
		};
		divPalitra.onmouseup = function(e){
			colpicData.mouseDown = false;
		};
		divPalitra.onmouseover = function(e){
			colpicData.mouseDown = false;
		};

		divPalitra.addEventListener('mousemove', colpick_moveSelector);

		// divBriSat.addEventListener('mousedown', colpick_downSelector);
		// divBriSat.addEventListener('touchstart', colpick_downSelector);
		// divBriSat.addEventListener('mouseup', colpick_upSelector);
		// divBriSat.addEventListener('touchstart', colpick_upSelector);
		// divBriSat.addEventListener('mousemove', colpick_moveSelector);
		// divBriSat.addEventListener('touchmove', colpick_moveSelector);

	div.appendChild( divPalitra );

	var divSaturSlider = document.createElement( "input" );

		divSaturSlider.className		= "sliderSaturation";
		divSaturSlider.type				= "range";
		divSaturSlider.min				= 0;
		divSaturSlider.max				= 100;
		divSaturSlider.value			= 100;
		divSaturSlider.width			= colpicData.canvas.width;
		divSaturSlider.style.display	= "block";
		divSaturSlider.style.width		= colpicData.canvas.width + "px";

		divSaturSlider.onchange = function(e){
			colpicData.hsb.s			= this.value;
			recolorLayer( colpicData.targetlayer, colpicData.hsb );
			colpicData.rgb				= hsbToRgb( colpicData.hsb );
			colpick_updatePreviewColor( e.target.parentNode, colpicData.rgb );
		};

	div.appendChild( divSaturSlider );
	colpicData.saturSlider = divSaturSlider;

		//preview circle and hex field
		var divControlBox = document.createElement( "div" );

		divControlBox.style.display			= "flex";
		divControlBox.style.padding			= "5px";
		divControlBox.style.alignItems		= "center";
		divControlBox.style.justifyContent	= "space-between";

			var divPreview = document.createElement( "div" );

			divPreview.style.width			= "24px";
			divPreview.style.height			= "24px";
			divPreview.style.borderRadius	= "24px";

		divControlBox.appendChild( divPreview );
		colpicData.previewBox = divPreview;

			var divHexField = document.createElement( "input" );

			divHexField.type				= "text";
			divHexField.maxLength			= 7;
			divHexField.placeholder			= "#000000";
			divHexField.style.borderRadius	= "2px";
			divHexField.style.width			= "60px";
			divHexField.style.height		= "20px";
			divHexField.style.fontSize		= "10pt";
			divHexField.style.borderShadow	= "none";

			divHexField.onmousedown = function( ev ){
				ev.target.focus();
				return true;
			};
			divHexField.onkeyup = function( ev ){
				colpicControls.manualInput = true;
				colpic_setColorHEX( ev.target.parentNode.parentNode, ev.target.value );
				return true;
			};

		divControlBox.appendChild( divHexField );
		colpicData.hexBox = divHexField;

			var divChangeBtn = document.createElement( "img" );
				divChangeBtn.src				= "/data/images/button_edit.png";
				divChangeBtn.style.cursor		= "pointer";
				divChangeBtn.onclick			= function(){ alert("Work in progress...") };
		divControlBox.appendChild( divChangeBtn );

	div.appendChild( divControlBox );

		var divPresetsBox = document.createElement( "div" );

			divPresetsBox.style.display				= "flex";

			var divPresetsControlBox = document.createElement( "div" );

			divPresetsControlBox.style.width		= "24px";

				var divPresetsAddBtn = document.createElement( "img" );
				divPresetsAddBtn.src				= "/data/images/button_add.png";
				divPresetsAddBtn.style.cursor		= "pointer";
				divPresetsAddBtn.addEventListener('click', colpic_addPreset);
			divPresetsControlBox.appendChild( divPresetsAddBtn );

				var divPresetsRemoveBtn = document.createElement( "button" );
				divPresetsRemoveBtn.innerHTML			= "Remove";
				divPresetsRemoveBtn.style.height		= "24px";
				divPresetsRemoveBtn.style.visibility	= "hidden";
				divPresetsRemoveBtn.onclick				= function(){
					if( colpicData.selectPreset == undefined ) return;
					var rgb			= colpic_getRGBfromObject( colpicData.selectPreset );
					if( rgb.r != -1 ) removePreset( rgb );
					colpicData.selectPreset.remove();

					//hide save/remove buttons
					if( colpicData.removePresetButton != undefined ) colpicData.removePresetButton.style.visibility = "hidden";
					/////////////////////////
				};
			divPresetsControlBox.appendChild( divPresetsRemoveBtn );
			colpicData.removePresetButton = divPresetsRemoveBtn;

		divPresetsBox.appendChild( divPresetsControlBox );

			var divPresets = document.createElement( "div" );

			divPresets.style.width					= "275px";
			divPresets.style.overflow				= "auto";
			divPresets.style.maxHeight				= "50px";
			divPresets.style.textAlign				= "left";

		divPresetsBox.appendChild( divPresets );
		colpicData.presetsBox = divPresets;

	div.appendChild( divPresetsBox );

	colpic_drawBackground( div );

	//Hide when user clicks outside
	document.addEventListener('mousedown', function(ev){
		if( colpicData.mousePickerOut ) colpick_hide();
	});
	div.onmouseover = function( ev ){
		colpicData.mousePickerOut = false;
	}
	div.onmouseout = function( ev ){
		colpicData.mousePickerOut = true;
	//	ev.stopPropagation();
	//	return false;
	};

	document.body.appendChild( div );
}















function colpick_moveSelector( event )
{
	if( !colpicData.mouseDown ) return;

	event.preventDefault ? event.preventDefault() : event.returnValue = false;

	var pageY	= ((event.type == 'touchmove') ? event.changedTouches[0].pageY : event.pageY );
	var target	= ((event.type == 'touchmove') ? event.changedTouches[0].target : event.target );

    var x = (event.offsetX / target.clientWidth) * target.width;
	var y = (event.offsetY / target.clientHeight) * target.height;
	
	var imgData = colpicData.canvas.getContext('2d').getImageData( x, y, 1, 1);

	colpicData.rgb.r		= imgData.data[0];
	colpicData.rgb.g		= imgData.data[1];
	colpicData.rgb.b		= imgData.data[2];

	colpicData.hsb			= rgbToHsb( colpicData.rgb );

	recolorLayer( colpicData.targetlayer, colpicData.hsb );
	colpick_updatePreviewColor( target.parentNode, colpicData.rgb );
	colpic_drawBackground( target.parentNode, x, y );
	
	return false;
}

function colpic_drawBackground( obj, x, y )
{
	if( obj == undefined ) return rgb;

	var canvas = obj.children[1];
	var canvasContext = canvas.getContext('2d');

	canvasContext.drawImage( colpicData.canvas, 0, 0, canvas.width, canvas.height );

	if( x != undefined && y != undefined ){
		canvasContext.beginPath();
		canvasContext.arc( x, y, 5, 0, 2 * Math.PI, false);
		canvasContext.strokeStyle = ( y < ( canvas.height / 2 )  ) ? '#003300' : '#ffffff';
		canvasContext.stroke();
	}
}




















function colpic_getRGBfromObject( obj )
{
	var rgb			= { "r": -1, "g": -1, "b": -1 };

	if( obj == undefined ) return rgb;
	if( obj.style.backgroundColor == undefined ) return rgb;

	var background	= obj.style.backgroundColor;
	background		= background.replace( /rgb\(/g, '' );
	background		= background.replace( /\)/g, '' );
	background		= background.replace( / /g, '' );
	var data		= background.split( "," );

	if( data.length == 3 ){
		rgb			= { "r": parseInt( data[0] ), "g": parseInt( data[1] ), "b": parseInt( data[2] ) };
	}
	return rgb;
}

function colpic_insertPreset( rgb, obj )
{
	if( colpicData.presetsBox == undefined ){
		console.log( "colpic_insertPreset", colpicData.presetsBox );
		return;
	}

	//console.log( "colpic_insertPreset", presetsBox, rgb, rgbToHex( rgb ) );

	var btn = document.createElement("img");
	btn.src = "/data/images/icon-ui-color-preset.png";
	btn.style.backgroundColor = "#" + rgbToHex( rgb );
	btn.style.margin = "1px";
	btn.addEventListener('click', function(){
		var rgb = colpic_getRGBfromObject( this );
		if( rgb.r != -1 ) colpic_setColorRGB( this.parentNode.parentNode.parentNode, rgb );

		colpicData.selectPreset = this;

		//show remove buttons
		if( colpicData.removePresetButton != undefined ) colpicData.removePresetButton.style.visibility = "visible";
		/////////////////////////

	}, false);

	colpicData.presetsBox.appendChild( btn );
	colpicData.presetsBox.scroll( 0, 10000 );
}

function colpic_addPreset( event )
{
	if( event.target == undefined ) return;
	//console.log( "colpick_addPreset", event );
	colpic_insertPreset( colpicData.rgb, event.target.parentNode.parentNode );
	addPreset( colpicData.rgb );
}

function colpic_setColorHEX( obj, hex )
{
	if( obj == undefined || hex == undefined ) return;
	if( hex == "" ) return;
	var rgb			= hexToRgb( hex );
	colpic_setColorRGB( obj, rgb );
}

function colpic_setColorRGB( obj, rgb )
{
	if( obj == undefined || rgb == undefined ) return;

	colpicData.rgb.r		= parseInt( rgb.r );
	colpicData.rgb.g		= parseInt( rgb.g );
	colpicData.rgb.b		= parseInt( rgb.b );

	colpicData.hsb			= rgbToHsb( colpicData.rgb );

	//console.log( "colpic_setColorRGB", colpicData.rgb, colpicData.hsb );

	colpick_updatePreviewColor( obj, colpicData.rgb );
	colpic_setHUE( obj, colpicData.hsb.h );
	recolorLayer( colpicData.targetlayer, colpicData.hsb );
}

function colpic_setHUE( obj, hue )
{
	if( obj == undefined || hue == undefined ) return;

	colpicData.hsb.h		= parseInt( hue );

	if( colpicData.hsb.h < 1 ) colpicData.hsb.h = 1;
	if( colpicData.hsb.h > 360 ) colpicData.hsb.h = 360;
}

function colpick_open( title, button, event )
{
	var box = colpick_show( title );

	targetlayer = parseInt( button.lang );

	if( targetlayer != NaN && targetlayer != undefined ) colpicData.targetlayer = targetlayer;

	//console.log( "colpick_open", event );

	if( event.clientY != undefined ){
		colpicData.pos.x			= ( event.clientX + 3 );
		colpicData.pos.y			= ( event.clientY + 3 );
	}

	//colpicData.pos.x			= ( e.x + 3 );
	//colpicData.pos.y			= ( mousePos.y + 3 );
	//var ry						= colpicData.pos.y + box.clientHeight + 100;

	//if( ry > screen.availHeight ){
	//	colpicData.pos.y		-= ry - screen.availHeight + 40;
		//console.log( ry, screen.availHeight, y, box.clientHeight );
	//}

	box.style.top	= colpicData.pos.y + "px";
	box.style.left	= colpicData.pos.x + "px";

	colpicData.button = undefined;
	colpicData.selectPreset = undefined;
	colpicData.mouseDownSB = false;
	colpicData.mouseDownHUE = false;

	//hide save/remove buttons
	if( colpicData.removePresetButton != undefined ) colpicData.removePresetButton.style.visibility = "hidden";
	/////////////////////////

	if( button != undefined ){
		colpicData.button = button;

		var rgb		= colpic_getRGBfromObject( button );
		if( rgb.r != -1 ){
			colpic_setColorRGB( box, rgb );
		}else{
			colpic_setColorRGB( box, colpicData.rgb );
		}
	}else{
		colpic_setColorRGB( box, colpicData.rgb );
	}
}



function colpick_updatePreviewColor( obj, rgb )
{
	if( obj == undefined || rgb == undefined ) return;

	if( obj == undefined ){
		console.log( "colpick_updatePreviewColor",obj );
		return;
	}

	//console.log( "colpick_updatePreviewColor", rgb );

	var backroundStr	= "rgb( " + rgb.r.toString() + ", " + rgb.g.toString() + ", " + rgb.b.toString() + " )";

	if( !colpicControls.manualInput && colpicData.hexBox != undefined )	colpicData.hexBox.value		= "#" + rgbToHex( rgb );
	if( colpicData.previewBox != undefined ) colpicData.previewBox.style.background = backroundStr;
	if( colpicData.button != undefined ) colpicData.button.style.background = backroundStr;
}

function colpick_getBox()
{
	var box				= document.getElementById( colpickBoxID );
	if( box == undefined ){
		colpick_init();
		box				= document.getElementById( colpickBoxID );
	}

	return box;
}


function colpick_show( title )
{
	var box				= colpick_getBox();
	box.style.display	= "block";
	if( title == undefined ) return box;
	box.childNodes[0].innerHTML = title;
	return box;
}

function colpick_hide()
{
	var box				= colpick_getBox();
	box.style.display	= "none";
	box.childNodes[0].innerHTML = "";
}















function hexToRgb( hex )
{
	hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
	return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
}

function hexToHsb( hex )
{
	return rgbToHsb( hexToRgb( hex ) );
}

function rgbToHsb( rgb )
{
	var hsb = {h: 0, s: 0, b: 0};
	var min = Math.min(rgb.r, rgb.g, rgb.b);
	var max = Math.max(rgb.r, rgb.g, rgb.b);
	var delta = max - min;
	hsb.b = max;
	hsb.s = max != 0 ? 255 * delta / max : 0;
	if (hsb.s != 0) {
		if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
		else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
		else hsb.h = 4 + (rgb.r - rgb.g) / delta;
	}else hsb.h = -1;
	hsb.h *= 60;
	if (hsb.h < 0) hsb.h += 360;
	hsb.s *= 100 / 255;
	hsb.b *= colpicData.brightMax / 255;
	return hsb;
}

function hsbToRgb( hsb )
{
	var rgb = {};
	var h = hsb.h;
	var s = hsb.s * 255 / 100;
	var v = hsb.b * 255 / colpicData.brightMax;
	if (s == 0) {
		rgb.r = rgb.g = rgb.b = v;
	} else {
		var t1 = v;
		var t2 = (255 - s) * v / 255;
		var t3 = (t1 - t2) * (h % 60) / 60;
		if (h == 360) h = 0;
		if (h < 60) {
			rgb.r = t1;
			rgb.b = t2;
			rgb.g = t2 + t3
		}
		else if (h < 120) {
			rgb.g = t1;
			rgb.b = t2;
			rgb.r = t1 - t3
		}
		else if (h < 180) {
			rgb.g = t1;
			rgb.r = t2;
			rgb.b = t2 + t3
		}
		else if (h < 240) {
			rgb.b = t1;
			rgb.r = t2;
			rgb.g = t1 - t3
		}
		else if (h < 300) {
			rgb.b = t1;
			rgb.g = t2;
			rgb.r = t2 + t3
		}
		else if (h < 360) {
			rgb.r = t1;
			rgb.g = t2;
			rgb.b = t1 - t3
		}
		else {
			rgb.r = 0;
			rgb.g = 0;
			rgb.b = 0
		}
	}
	return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
}

function rgbToHex( rgb )
{
	var hex = [
		rgb.r.toString(16),
		rgb.g.toString(16),
		rgb.b.toString(16)
	];

	if( hex[0].length == 1 ) hex[0] = '0' + hex[0];
	if( hex[1].length == 1 ) hex[1] = '0' + hex[1];
	if( hex[2].length == 1 ) hex[2] = '0' + hex[2];

	return hex.join('');
}

function hsbToHex( hsb )
{
	return rgbToHex( hsbToRgb( hsb ) );
}
