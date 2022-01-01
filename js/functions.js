function addClass( obj, name )
{
	if( obj == undefined ) return;
	if( obj.className == undefined ) return;
	if( name == undefined ) return;
	if( name == "" ) return;

	var classList		= obj.className.split( " " );
	var find			= false;

	for( i = 0; i < classList.length; i++ ){
		if( classList[i] == name ){
			find = true;
			break;
		}
	}

	if( !find ){
		classList.push( name );
		obj.className = classList.join( " " );
	}
}

function removeClass( obj, name )
{
	if( obj == undefined ) return;
	if( obj.className == undefined ) return;
	if( name == undefined ) return;
	if( name == "" ) return;

	var classList		= obj.className.split( " " );
	var find			= false;

	for( i = 0; i < classList.length; i++ ){
		if( classList[i] == name ){
			if( !find ) find = true;
			classList.splice( i, 1 );
			i--;
		}
	}

	if( find ){
		obj.className = classList.join( " " );
	}
}

//-------------------------------------------------------
/**
 * 
 * @param {object} newNode 
 * @param {object} referenceNode 
 */
 function insertAfter( newNode, referenceNode )
 {
	 if( app.debug ) console.log( "insertAfter >:", newNode, referenceNode );
 
	 if( newNode == undefined ){
		 console.error( "newNode undefined" );
		 return;
	 }
	 if( referenceNode == undefined ){
		 console.error( "referenceNode undefined" );
		 return;
	 }
	 if( referenceNode.nextSibling == null ){
		 console.error( "referenceNode.nextSibling null" );
		 return;
	 }
 
	 referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
 }

function copyTextToClipboard( text )
{
	if( !navigator.clipboard ){
		var textArea = document.createElement( "textarea" );
		textArea.value = text;
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			if( document.execCommand('copy') ){
				message.success( "Link copying to clipboard was successful!" );
			}else{
				message.error( "Link copying to clipboard was unsuccessful!" );
			}
		} catch (err) {
			message.error( "Fallback: Oops, unable to copy " + err );
		}
		document.body.removeChild(textArea);
		return;
	}
	navigator.clipboard.writeText( text ).then( function(){
		message.error( "Async: Copying to clipboard was successful!" );
	}, function(err) {
		message.error( "Async: Could not copy text: " + err );
	});
}



/////////////////////////////////	COLOR		/////////////////////////////////////////////////////////////////

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

function chis( value = 0 )
{
	var string = "";

	value = Number( value ).toFixed( 2 );

	string = value;

	var list = string.split( "." );
	var str = list[0];
	var ch = 0;
	string = "";

	for( var i = str.length - 1; i >= 0; i-- ){
		string = str[ i ] + string;
		if( i > 0 && ch++ >= 2 ){
			string = " " + string;
			ch = 0;
		}
	}

	return string;
}
