var colorSliders_data					= { 
	"slidersBox": undefined,
	"previewBox": undefined,
};


function colorSliders_show()
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.slidersBox.style.display = "block";
}

function colorSliders_hide()
{
	if( colorSliders_data.slidersBox == undefined ) return;

	colorSliders_data.slidersBox.style.display = "none";
}



function colorSliders_generate()
{
	var divRoot = document.createElement("div");
	divRoot.style.display				= "none";

		var divSlidersRoot = document.createElement("div");
		divSlidersRoot.style.width		= "calc( 100% - 64px )";
		divSlidersRoot.style.display	= "inline-block";

			var divHUE = document.createElement("div");

			var inputHUEs = document.createElement("input");
			inputHUEs.type				= "range";
			inputHUEs.min				= 0;
			inputHUEs.max				= 359;
			inputHUEs.value				= 0;
			inputHUEs.className			= "sliderHUE";
			inputHUEs.style.width		= "calc( 100% - 70px )";
			divHUE.appendChild( inputHUEs );

			var inputHUEn = document.createElement("input");
			inputHUEn.type				= "number";
			inputHUEn.min				= 0;
			inputHUEn.max				= 359;
			inputHUEn.value				= 0;
			inputHUEn.maxlength			= 3;
			inputHUEn.className			= "sliderNumber";
			inputHUEn.style.width		= "60px";
			divHUE.appendChild( inputHUEn );

		divSlidersRoot.appendChild( divHUE );

			var divSAT = document.createElement("div");

			var inputSATs = document.createElement("input");
			inputSATs.type				= "range";
			inputSATs.min				= 0;
			inputSATs.max				= 100;
			inputSATs.value				= 0;
			inputSATs.className			= "sliderSaturation";
			inputSATs.style.width		= "calc( 100% - 70px )";
			divSAT.appendChild( inputSATs );

			var inputSATn = document.createElement("input");
			inputSATn.type				= "number";
			inputSATn.min				= 0;
			inputSATn.max				= 100;
			inputSATn.value				= 0;
			inputSATn.maxlength			= 3;
			inputSATn.className			= "sliderNumber";
			inputSATn.style.width		= "60px";
			divSAT.appendChild( inputSATn );

		divSlidersRoot.appendChild( divSAT );

			var divBRI = document.createElement("div");

			var inputBRIs = document.createElement("input");
			inputBRIs.type				= "range";
			inputBRIs.min				= 0;
			inputBRIs.max				= 200;
			inputBRIs.value				= 100;
			inputBRIs.className			= "sliderBrightness";
			inputBRIs.style.width		= "calc( 100% - 70px )";
			divSAT.appendChild( inputBRIs );

			var inputBRIn = document.createElement("input");
			inputBRIn.type				= "number";
			inputBRIn.min				= 0;
			inputBRIn.max				= 200;
			inputBRIn.value				= 100;
			inputBRIn.maxlength			= 3;
			inputBRIn.className			= "sliderNumber";
			inputBRIn.style.width		= "60px";
			divSAT.appendChild( inputBRIn );

		divSlidersRoot.appendChild( divBRI );
    
	divRoot.appendChild( divSlidersRoot );

		var divPreview = document.createElement("div");
		divPreview.style.width			= "64px";
		divPreview.style.height			= "64px";
		divPreview.style.backgroundColor = "black";
		divPreview.style.display		= "inline-block";

	divRoot.appendChild( divPreview );




	colorSliders_data.previewBox		= divPreview;
	colorSliders_data.slidersBox		= divRoot;

	return divRoot;
}
