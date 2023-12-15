function canvas_setEffect( effect, canvas, value )
{
	if( effect == undefined || canvas == undefined ) return;
	
	var newCanvas										= document.createElement( 'canvas' );
	var canvasContext									= canvas.getContext('2d');
	newCanvas.width										= canvas.width;
	newCanvas.height									= canvas.height;
	var newContext										= newCanvas.getContext('2d');

	switch( effect ){
		case 'pixelate':
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
			//canvasContext.clearRect( 0, 0, canvas.width, canvas.height );
			//canvasContext.drawImage( newCanvas, 0, 0, canvas.width, canvas.height );
			//newCanvas.remove();
		break;
		case 'outline':
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
		case 'brightness':
			newContext.filter = 'brightness(' + value + '%)';
			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
		break;
		case 'contrast':
			newContext.filter = 'contrast(' + value + '%)';
			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
		break;
		case 'saturation':
			newContext.filter = 'saturate(' + value + '%)';
			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
		break;
		case 'blur':
			newContext.filter = 'blur(' + value + 'px)';
			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
		break;
		case 'borderShadow':
			newContext.filter = 'drop-shadow(0px 0px 4px black)';
			newContext.shadowBlur = 2;
			newContext.shadowColor = 'rgba(0, 0, 0)';
			newContext.drawImage( canvas, 0, 0, newCanvas.width, newCanvas.height );
		break;
		case 'mirrorHorizontal':
			newContext.save();
			newContext.translate( 0, 0 );
			newContext.scale( -1, 1 );
			newContext.drawImage( canvas, 0, 0, newCanvas.width * -1, newCanvas.height );
			newContext.restore();
		break;
		default: break;
	}


	return newCanvas;
}

/**
 * Rendering the progress bar in the pixelart style
 * 
 * @param {string} id - Canvas ID
 * @param {number} count - Number of progress bar blocks
 * @param {number} xWidth - Block width
 * @param {number} yHeight - Block height
 * @param {string} color - Color theme { blue, red, green, orange }
 * @param {boolean} border - Drawing border outline (default: false)
 */
 function reDrawPixelBar( id, count, xWidth, yHeight, color, border = false )
 {
	var canvas = document.getElementById( id );
	if( canvas == undefined ) return;
	if( canvas.tagName == undefined ) return;
	if( canvas.tagName != 'CANVAS' ) return;
 
	var prz						= Number( canvas.getAttribute( 'data-prz' ) ).toFixed();
	 
	var offset					= 3;
	var count					= Number( count );
	var przDelta				= 100 / count;
	var przCount				= Math.ceil( prz / przDelta );
	var xWidth					= Number( xWidth );
	var yHeight					= Number( yHeight );
	var width					= Number( Number( xWidth ) * Number( count ) ) + ( Number( offset ) * Number( ( Number( count ) + 1 ) ) );
	//var height				= yHeight + ( offset * 2 );
	var height					= Number( yHeight ) + ( offset * 2 );

	canvas.width				= width;
	canvas.height				= height;
	var yHeightM				= Math.trunc( yHeight / 5 );
	var ctx						= canvas.getContext('2d');
	let red						= Array( '#fa5538', '#feab9f', '#e42920', '#d53025', '#a71b24' );
	let green					= Array( '#79e215', '#9df048', '#6dd11c', '#69c511', '#478a0c' );
	let orange					= Array( '#fe9400', '#feb33f', '#e78302', '#ca7b04', '#aa6800' );
	let blue					= Array( '#67e4fe', '#9ef1fd', '#1ecffe', '#1dcefe', '#17c0ed' );
	let tColor					= Array( '#000000', '#000000', '#000000', '#000000', '#000000' );
	let blankColor				= '#00000037';
 
	switch( color ){
		case 'blue':
			for( let i = 0; i < blue.length; i++ ) tColor[ i ] = blue[ i ];
		break;
		case 'red':
			for( let i = 0; i < red.length; i++ ) tColor[ i ] = red[ i ];
		break;
		case 'green':
			for( let i = 0; i < green.length; i++ ) tColor[ i ] = green[ i ];
		break;
		case 'orange':
			for( let i = 0; i < orange.length; i++ ) tColor[ i ] = orange[ i ];
		break;
	}
 
	if( border ){
		ctx.fillStyle = '#918c84';
		ctx.fillRect( 0, 0, width, height );
	 
		ctx.clearRect( 0, 0, offset, offset );
		ctx.clearRect( width - offset, 0, width, offset );
		ctx.clearRect( 0, height - offset, offset, height );
		ctx.clearRect( width - offset, height - offset, width, height );
	}

 
	var x = offset;
	for( let i = 0; i < count; i++ ){
		if( border ){
			ctx.clearRect( x, offset, xWidth, yHeight );
		}else{
			ctx.fillStyle = blankColor;
			ctx.fillRect( x, offset, xWidth, yHeight );
		}
		
		x += xWidth;
		x += offset;
	}
 
	 
	x = offset;
	for( let i = 0; i < przCount; i++ ){
		let y = offset;
		for( let j = 0; j < tColor.length; j++ ){
			ctx.fillStyle = tColor[ j ];
			ctx.fillRect( x, y, xWidth, yHeightM );
			y += yHeightM;
		}
		 
		x += xWidth;
		x += offset;
	}
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
  