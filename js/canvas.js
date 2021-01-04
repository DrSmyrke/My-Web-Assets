function canvas_setEffect( effect, canvas, value )
{
	if( effect == undefined || canvas == undefined ) return;
	
	var newCanvas		= document.createElement( "canvas" );
	var canvasContext	= canvas.getContext('2d');

	switch( effect ){
		case "pixelate":
			var msImageSmoothingEnabled					= canvasContext.msImageSmoothingEnabled;
			var mozImageSmoothingEnabled				= canvasContext.mozImageSmoothingEnabled;
			var webkitImageSmoothingEnabled				= canvasContext.webkitImageSmoothingEnabled;
			var imageSmoothingEnabled					= canvasContext.imageSmoothingEnabled;
			canvasContext.msImageSmoothingEnabled		= false;
			canvasContext.mozImageSmoothingEnabled		= false;
			canvasContext.webkitImageSmoothingEnabled	= false;
			canvasContext.imageSmoothingEnabled			= false;
			if( value == undefined || value < 1 || value > 99 ) value = 25;
			var size									= value / 100;
			newCanvas.width								= canvas.width * size;
			newCanvas.height							= canvas.height * size;
			var dctx									= newCanvas.getContext("2d");

			dctx.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
			canvasContext.drawImage( newCanvas, 0, 0, canvas.width, canvas.height );
		break;
		default: break;
	}


	return newCanvas;
}

function canvas_getClippedRegion( image, x, y, width, height )
{
	var tempCanvas = document.createElement('canvas');
	ctx = tempCanvas.getContext('2d');

	tempCanvas.width = width;
	tempCanvas.height = height;

    //                   source region         dest. region
	ctx.drawImage(image, x, y, width, height,  0, 0, width, height);

	return tempCanvas;
}