class Message{
	timerID;
	messBoxes;
	timeout;
	yOffset;
	maxBoxes;
	init;

	constructor()
	{
		this.init				= false;
		this.messBoxes			= Array();
		this.timeout			= 50;
		this.yOffset			= 0;
		this.maxBoxes			= 100;
	}

	/**
	 * Initialize method
	 * @param none
	 * @return none
	 */
	#init()
	{
		let style = document.createElement( 'style' );
		style.innerHTML = '.messageBox{ border: 2px dashed rgb(36, 173, 84); background: rgba( 112, 216, 148, 0.85 ); color: rgb(0, 109, 0); position: fixed; left: -1500px; top: 72px; z-index: 1000; padding: 5px 15px; } .messageBox.error{ border: 2px dashed rgb( 234, 146, 146 ); background: rgba( 234, 146, 146, 0.85 ); color: rgb(147, 44, 44); } .messageBox.warning{ border: 2px dashed rgb(221, 234, 146); background: rgba(233, 234, 146, 0.85); color: rgb(121, 156, 41) .messageBox.info{ border: 2px dashed rgb(146, 206, 234); background: rgba(146, 214, 234, 0.85); color: rgb(56, 98, 160); }';
		document.body.appendChild( style );

		this.init = true;
	}

	/**
	 * 
	 * @param {*} value
	 */
	setYOffset( value = 0 )
	{
		this.yOffset = Number( value ).toFixed();
		if( this.yOffset < 0 ) this.yOffset = 0;
	}

	/**
	 * getter yOffset
	 * @returns {integer} minimum yOffset
	 */
	get getYOffset()
	{
		return this.yOffset;
	}

	/**
	 * 
	 * @returns {integer} new y offset
	 */
	getNewYOffset()
	{
		var yOffset		= this.yOffset;

		if( this.messBoxes.length > 0 ){
			for( var num in this.messBoxes ){
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

	run()
	{
		this.timerID = setInterval( function( array, yOffset ){
			var deleteF = false;
			//var deleteYOffset = 0;

			for( var num in array ){
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
					//deleteYOffset = obj.clientHeight + obj.clientTop;
					obj.remove();	
					array.splice( num, 1 );
					deleteF = true;
				}
			}

			if( deleteF ){
				var y = yOffset;

				for( var num in array ){
					var element = array[ num ];

					var obj = document.getElementById( "messBox" + element.id );
					if( obj == undefined ){
						console.error( "obj undefined", element, num );
						continue;
					}

					if( y < yOffset ) y = yOffset;

					obj.style.top = y + "px";

					y = Number( y ) + Number( obj.clientTop ) + Number( obj.clientHeight ) + 15;
				}
			}
		}, 500, this.messBoxes, this.yOffset );
	}

	getAvailableIndex()
	{
		var index = 0;
		var globalfind = false;

		if( this.messBoxes.length == 0 ) return index;

		for( var index = 0; index < this.maxBoxes; index++ ){
			var find = false;

			for( var num in this.messBoxes ){
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

		div.className	= "animate__animated animate__bounceInLeft messageBox info";
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

		div.className	= "animate__animated animate__bounceInLeft messageBox warning";
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

		div.className	= "animate__animated animate__bounceInLeft messageBox error";
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

		div.className	= "animate__animated animate__bounceInLeft messageBox";
		div.lang		= div.className;
		div.innerHTML	= message;
		div.id			= "messBox" + index;
		div.style.left	= "15px";
		div.style.top	= this.getNewYOffset() + "px";

		this.messBoxes.push( { "id": index, "timeout": this.timeout } );

		document.body.appendChild( div );
	}
}
