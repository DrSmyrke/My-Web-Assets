function canvas_setEffect( effect, canvas, value )
{
	if( effect == undefined || canvas == undefined ) return;
	
	var newCanvas										= document.createElement( "canvas" );
	var canvasContext									= canvas.getContext('2d');
	newCanvas.width										= canvas.width;
	newCanvas.height									= canvas.height;
	var newContext										= newCanvas.getContext("2d");

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

			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
			canvasContext.drawImage( newCanvas, 0, 0, canvas.width, canvas.height );
		break;
		case "outline":
			var myImg = canvasContext.getImageData( 0, 0, canvas.width, canvas.height );

			for( var y = 0; y < canvas.height; y++ ){
				for( var x = 0; x < canvas.width; x++ ){
					var offset							= ( y * canvas.width ) + ( x * 4 );
					var alpha							= myImg.data[ offset + 4 ];
					if( alpha > 0 ){
						offset -= 5 * 4;
						myImg.data[ offset ]			= 0;
						myImg.data[ offset + 1 ]		= 0;
						myImg.data[ offset + 2 ]		= 0;
						myImg.data[ offset + 3 ]		= 255;
						offset -= 4 * 4;
						myImg.data[ offset ]			= 0;
						myImg.data[ offset + 1 ]		= 0;
						myImg.data[ offset + 2 ]		= 0;
						myImg.data[ offset + 3 ]		= 255;
						offset -= 3 * 4;
						myImg.data[ offset ]			= 0;
						myImg.data[ offset + 1 ]		= 0;
						myImg.data[ offset + 2 ]		= 0;
						myImg.data[ offset + 3 ]		= 255;
						break;
					}
				}
			}

			newContext.putImageData( myImg, 0, 0 );
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

function canvas_roundRect( ctx, x, y, width, height, radius = 5, fill = true, stroke = true)
{
	if( ctx == undefined ) return;

	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}

	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();

	if( fill ) ctx.fill();
	if( stroke ) ctx.stroke();
  }
  