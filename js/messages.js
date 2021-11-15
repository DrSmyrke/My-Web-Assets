class Message{
	timerID;
	messBoxes;
	timeout;
	yOffset;
	maxBoxes;

	constructor()
	{
		this.messBoxes	= Array();
		this.timeout	= 4;
		this.yOffset	= 0;
		this.maxBoxes	= 100;

		this.timerID = setInterval( function( array ){
			var deleteF = false;
			var deleteYOffset = 0;

			for( num in array ){
				var element = array[ num ];

				var obj = document.getElementById( "messBox" + element.id );
				if( obj == undefined ){
					console.error( "obj undefined", element, num );
					continue;
				}

				if( element.timeout > 0 ){
					element.timeout--;
					if( element.timeout == 1 ){
						obj.classList.remove( "animate__bounceInLeft" );
						obj.classList.add( "animate__bounceOutLeft" );
					}
				}else{
					deleteYOffset = obj.clientHeight + obj.clientTop;
					obj.remove();	
					array.splice( num, 1 );
					deleteF = true;
				}
			}

			if( deleteF ){
				for( num in array ){
					var element = array[ num ];

					var obj = document.getElementById( "messBox" + element.id );
					if( obj == undefined ){
						console.error( "obj undefined", element, num );
						continue;
					}

					if( element.timeout > 1 ){
						var tmp = obj.style.top.split( "px" );
						var value = Number( tmp[0] ).toFixed() - Number( deleteYOffset ).toFixed();
						obj.style.top = value + "px";
					}
				}
			}
		}, 1000, this.messBoxes );
	}

	setYOffset( value = 0 )
	{
		this.yOffset = Number( value ).toFixed();
		if( this.yOffset < 0 ) this.yOffset = 0;
	}

	getNewYOffset()
	{
		var yOffset		= this.yOffset;

		if( this.messBoxes.length > 0 ){
			for( num in this.messBoxes ){
				var element = this.messBoxes[ num ];

				var obj = document.getElementById( "messBox" + element.id );
				if( obj == undefined ){
					console.error( "obj undefined", element, num );
					continue;
				}

				yOffset = Number( obj.offsetTop ) + Number( obj.clientTop ) + Number( obj.clientHeight ) + 15;
			}
		}

		return yOffset;
	}

	getAvailableIndex()
	{
		var index = 0;
		var globalfind = false;

		if( this.messBoxes.length == 0 ) return index;

		for( var index = 0; index < this.maxBoxes; index++ ){
			var find = false;

			for( num in this.messBoxes ){
				if( index == this.messBoxes[ num ].id ){
					find = true;
					break;
				}
			}

			if( !find ){
				globalfind = true;
				break;
			}
		}
	
		if( !globalfind && this.messBoxes.length > 0 ) index = -1;

		return index;
	}

	setTimeout( value = 0 )
	{
		this.timeout = Number( value ).toFixed();
		if( this.timeout == 0 ) this.timeout = 4;
	}

	info( message = "" )
	{
		if( message == "" ) return;

		var index		= this.getAvailableIndex();
		if( index == -1 ) return;

		var div = document.createElement( "div" );

		div.className	= "animated animate__bounceInLeft messageBox info";
		div.lang		= div.className;
		div.innerHTML	= message;
		div.id			= "messBox" + index;
		div.style.left	= "15px";
		div.style.top	= this.getNewYOffset() + "px";

		this.messBoxes.push( { "id": index, "timeout": this.timeout } );

		document.body.appendChild( div );
	}

	warn( message = "" )
	{
		if( message == "" ) return;

		var index		= this.getAvailableIndex();
		if( index == -1 ) return;

		var div = document.createElement( "div" );

		div.className	= "animated animate__bounceInLeft messageBox warning";
		div.lang		= div.className;
		div.innerHTML	= message;
		div.id			= "messBox" + index;
		div.style.left	= "15px";
		div.style.top	= this.getNewYOffset() + "px";

		this.messBoxes.push( { "id": index, "timeout": this.timeout } );

		document.body.appendChild( div );
	}

	error( message = "" )
	{
		if( message == "" ) return;

		var index		= this.getAvailableIndex();
		if( index == -1 ) return;

		var div = document.createElement( "div" );

		div.className	= "animated animate__bounceInLeft messageBox error";
		div.lang		= div.className;
		div.innerHTML	= message;
		div.id			= "messBox" + index;
		div.style.left	= "15px";
		div.style.top	= this.getNewYOffset() + "px";

		this.messBoxes.push( { "id": index, "timeout": this.timeout } );

		document.body.appendChild( div );
	}

	success( message = "" )
	{
		if( message == "" ) return;

		var index		= this.getAvailableIndex();
		if( index == -1 ) return;

		var div = document.createElement( "div" );

		div.className	= "animated animate__bounceInLeft messageBox";
		div.lang		= div.className;
		div.innerHTML	= message;
		div.id			= "messBox" + index;
		div.style.left	= "15px";
		div.style.top	= this.getNewYOffset() + "px";

		this.messBoxes.push( { "id": index, "timeout": this.timeout } );

		document.body.appendChild( div );
	}
}
