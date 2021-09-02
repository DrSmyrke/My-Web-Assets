var colorSliders_data					= { 
	"slidersBox": undefined,
	"hueSlider": undefined,
	"satSlider": undefined,
	"briSlider": undefined,
	"hueNumber": undefined,
	"satNumber": undefined,
	"briNumber": undefined,
	"hsb": {"h": 0, "s": 0, "b": 100},
	"targetLayer": undefined,
	"previewObj": undefined,
	"customPreviewObj": undefined,
	"customCallback": undefined,
	"customCallbackTarget": undefined,
	"show": false,
	"inputNumbers": false,
	"hexInput": undefined,
};

function colorSliders_setTargetLayer( target = 0 )
{
	colorSliders_data.targetLayer = Number( target );
}

function colorSliders_unsetTargetLayer()
{
	colorSliders_data.targetLayer = undefined;
}

function colorSliders_resetCustomPreview()
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.customPreviewObj = undefined;
}

function colorSliders_setCustomCallback( func, target )
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.customCallback = func;
	colorSliders_data.customCallbackTarget = target;
}

function colorSliders_resetCustomCallback()
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.customCallback = undefined;
	colorSliders_data.customCallbackTarget = undefined;
}

function colorSliders_setCustomPreview( obj )
{
	if( colorSliders_data.slidersBox == undefined ) return;
	if( obj == undefined ) return;
	if( obj.tagName == undefined ) return;

	colorSliders_data.customPreviewObj = obj;
}

function colorSliders_show()
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.slidersBox.style.display = "block";
	colorSliders_data.show = true;
}

function colorSliders_hide()
{
	if( colorSliders_data.slidersBox == undefined ) return;
	if( !colorSliders_data.show ) return;

	colorSliders_data.slidersBox.style.display = "none";
	colorSliders_data.show = false;
}

function colorSliders_setHSB( data = {h: 0, s: 0, b: 0}, update = true )
{
	if( data.h == undefined || data.s == undefined || data.b == undefined ) return;
	if( colorSliders_data.slidersBox == undefined ) return;
	if( colorSliders_data.hueSlider == undefined ) return;
	if( colorSliders_data.satSlider == undefined ) return;
	if( colorSliders_data.briSlider == undefined ) return;
	if( colorSliders_data.hueNumber == undefined ) return;
	if( colorSliders_data.satNumber == undefined ) return;
	if( colorSliders_data.briNumber == undefined ) return;

	data.h = parseInt( data.h );
	data.s = parseInt( data.s );
	data.b = parseInt( data.b );

	colorSliders_data.hueSlider.value	= data.h;
	colorSliders_data.satSlider.value	= data.s;
	colorSliders_data.briSlider.value	= data.b;
	colorSliders_data.hueNumber.value	= data.h;
	colorSliders_data.satNumber.value	= data.s;
	colorSliders_data.briNumber.value	= data.b;

	colorSliders_data.hsb.h = data.h;
	colorSliders_data.hsb.s = data.s;
	colorSliders_data.hsb.b = data.b;

	if( update) colorSliders_updatePreview();
}

function colorSliders_updatePreview()
{
	if( colorSliders_data.hsb == undefined ) return;

	var hex = hsbToHex( colorSliders_data.hsb );

	if( colorSliders_data.targetLayer != undefined ){
		recolorLayer( colorSliders_data.targetLayer, colorSliders_data.hsb );
	}

	if( colorSliders_data.previewObj != undefined ){
		colorSliders_data.previewObj.style.backgroundColor = "#" + hex;
	}

	if( colorSliders_data.customPreviewObj != undefined ){
		colorSliders_data.customPreviewObj.style.backgroundColor = "#" + hex;
	}
	
	if( colorSliders_data.customCallback != undefined ){
		colorSliders_data.customCallback();
	}

	if( colorSliders_data.hexInput != undefined ){
		colorSliders_data.hexInput.value = "#" + hex;
	}
}



function colorSliders_generate( object = undefiend, preview = false )
{
	var divRoot = document.createElement("div");
	if( object != undefined ){
		divRoot.remove();
		divRoot = object;
	}

	divRoot.className = "sliderBox";

	var divContent = document.createElement("div");
	divContent.className = "contentBox";
	divRoot.appendChild( divContent );

	var divPreviewBox = document.createElement("div");
	if( preview ){
		var divPreview = document.createElement("div");
		divPreview.className = "previewBox";
		divPreviewBox.appendChild( divPreview );
		colorSliders_data.previewObj = divPreview;
	}

	var hexInput			= document.createElement( "input" );
	hexInput.type			= "text";
	hexInput.maxLength		= 7;
	hexInput.className		= "sliderNumber";
	hexInput.value			= "#" + hsbToHex( colorSliders_data.hsb );
	hexInput.style.width	= "55px";
	hexInput.oninput = function( ev ){
		colorSliders_setHSB( hexToHsb( this.value ) );
	};
	divPreviewBox.appendChild( hexInput );
	colorSliders_data.hexInput = hexInput;


	divRoot.appendChild( divPreviewBox );

	//divRoot.style.display				= "none";

		var divHUE = document.createElement("div");
		divHUE.style.display		= "flex";

		var inputHUEs = document.createElement("input");
		inputHUEs.type				= "range";
		inputHUEs.min				= 0;
		inputHUEs.max				= 359;
		inputHUEs.value				= 0;
		inputHUEs.className			= "sliderHUE";
		inputHUEs.style.width		= "calc( 100% - 70px )";
		inputHUEs.oninput = function( ev ){
			if( colorSliders_data.hueNumber == undefined ) return;
			var val					= parseInt( ev.target.value );
			colorSliders_data.hueNumber.value = val;
			colorSliders_data.hsb.h = val;
			colorSliders_updatePreview();
			return true;
		};
		divHUE.appendChild( inputHUEs );

		var inputHUEn = document.createElement("input");
		if( colorSliders_data.inputNumbers ){
			inputHUEn.type				= "number";
			inputHUEn.min				= 0;
			inputHUEn.max				= 359;
		}else{
			inputHUEn.type				= "text";
			//inputHUEn.pattern			= "[0-9]{,3}";
		}

		inputHUEn.value				= 0;
		inputHUEn.maxlength			= 3;
		inputHUEn.className			= "sliderNumber";
		inputHUEn.style.width		= "24px";
		inputHUEn.oninput = function( ev ){
			if( colorSliders_data.hueSlider == undefined ) return;
			var val					= parseInt( ev.target.value );
			if( val > 359 ){
				val = 359;
				ev.target.value = val;
			}
			if( val < 0 ){
				val = 0;
				ev.target.value = val;
			}
			colorSliders_data.hueSlider.value = val;
			colorSliders_data.hsb.h = val;
			colorSliders_updatePreview();
			return true;
		};
		divHUE.appendChild( inputHUEn );

	divContent.appendChild( divHUE );

		var divSAT = document.createElement("div");
		divSAT.style.display		= "flex";

		var inputSATs = document.createElement("input");
		inputSATs.type				= "range";
		inputSATs.min				= 0;
		inputSATs.max				= 100;
		inputSATs.value				= 0;
		inputSATs.className			= "sliderSaturation";
		inputSATs.style.width		= "calc( 100% - 70px )";
		inputSATs.oninput = function( ev ){
			if( colorSliders_data.satNumber == undefined ) return;
			var val					= parseInt( ev.target.value );
			colorSliders_data.satNumber.value = val;
			colorSliders_data.hsb.s = val;
			colorSliders_updatePreview();
			return true;
		};
		divSAT.appendChild( inputSATs );

		var inputSATn = document.createElement("input");
		if( colorSliders_data.inputNumbers ){
			inputSATn.type				= "number";
			inputSATn.min				= 0;
			inputSATn.max				= 100;
		}else{
			inputSATn.type				= "text";
			//inputSATn.pattern			= "[0-9]{,3}";
		}
		
		inputSATn.value				= 0;
		inputSATn.maxlength			= 3;
		inputSATn.className			= "sliderNumber";
		inputSATn.style.width		= "24px";
		inputSATn.oninput = function( ev ){
			if( colorSliders_data.satSlider == undefined ) return;
			var val					= parseInt( ev.target.value );
			if( val > 100 ){
				val = 100;
				ev.target.value = val;
			}
			if( val < 0 ){
				val = 0;
				ev.target.value = val;
			}
			colorSliders_data.satSlider.value = val;
			colorSliders_data.hsb.s = val;
			colorSliders_updatePreview();
			return true;
		};
		divSAT.appendChild( inputSATn );

	divContent.appendChild( divSAT );

		var divBRI = document.createElement("div");
		divBRI.style.display		= "flex";

		var inputBRIs = document.createElement("input");
		inputBRIs.type				= "range";
		inputBRIs.min				= 0;
		inputBRIs.max				= 200;
		inputBRIs.value				= 100;
		inputBRIs.className			= "sliderBrightness";
		inputBRIs.style.width		= "calc( 100% - 70px )";
		inputBRIs.oninput = function( ev ){
			if( colorSliders_data.briNumber == undefined ) return;
			var val					= parseInt( ev.target.value );
			colorSliders_data.briNumber.value = val;
			colorSliders_data.hsb.b = val;
			colorSliders_updatePreview();
			return true;
		};
		divBRI.appendChild( inputBRIs );

		var inputBRIn = document.createElement("input");
		if( colorSliders_data.inputNumbers ){
			inputBRIn.type				= "number";
			inputBRIn.min				= 0;
			inputBRIn.max				= 100;
		}else{
			inputBRIn.type				= "text";
			//inputBRIn.pattern			= "[0-9]{,3}";
		}
		
		inputBRIn.value				= 100;
		inputBRIn.maxlength			= 3;
		inputBRIn.className			= "sliderNumber";
		inputBRIn.style.width		= "24px";
		inputBRIn.oninput = function( ev ){
			if( colorSliders_data.briSlider == undefined ) return;
			var val					= parseInt( ev.target.value );
			if( val > 200 ){
				val = 200;
				ev.target.value = val;
			}
			if( val < 0 ){
				val = 0;
				ev.target.value = val;
			}
			colorSliders_data.briSlider.value = val;
			colorSliders_data.hsb.b = val;
			colorSliders_updatePreview();
			return true;
		};
		divBRI.appendChild( inputBRIn );

	divContent.appendChild( divBRI );

	colorSliders_data.slidersBox		= divRoot;
	colorSliders_data.hueSlider			= inputHUEs;
	colorSliders_data.satSlider			= inputSATs;
	colorSliders_data.briSlider			= inputBRIs;
	colorSliders_data.hueNumber			= inputHUEn;
	colorSliders_data.satNumber			= inputSATn;
	colorSliders_data.briNumber			= inputBRIn;

	return divRoot;
}
