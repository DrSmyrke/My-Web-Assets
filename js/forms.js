class Forms{
	formRequest;
	debug;
	message;

	constructor( debug = false ){
		this.debug						= debug;
		this.formRequest				= this.makeHttpObject();
		this.message					= undefined;
	}

	setMessageObject( object = undefined )
	{
		if( this.debug ) console.log( 'setMessageObject', object );
		if( object == undefined ) return console.warn( 'object is undefined' );
		this.message					= object;
	}

	makeHttpObject(){try{return new XMLHttpRequest();}catch(error){}try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(error){}try {return new ActiveXObject("Microsoft.XMLHTTP");}catch(error){}throw new Error("Could not create HTTP request object.");}

	/**
	 * Send data method
	 * @param {String} method (default: 'POST')
	 * @param {String} target (default: '.')
	 * @param {FormData} formData (default: null)
	 * @param {Function} callback (default: undefined)
	 * @param {Boolean} raw (default: false)
	 * @param {Boolean} async (default: true)
	 * @param {Object} headers (default: {})
	 * @param {Function} open preloader (default: undefined)
	 * @param {Function} close preloader (default: undefined)
	 * @returns 
	 */
	sendFormData( method = 'POST', target = '.', formData = null, callback = undefined, raw = false, async = true, headers = {}, openPreloader = undefined, closePreloader = undefined )
	{
		this.formRequest.open( method, target, async );
		for( let key in headers ){
			this.formRequest.setRequestHeader( key, headers[ key ] );
		}
		if( openPreloader != undefined ) openPreloader();
		this.formRequest.send( formData );
		var __this = this;

		if( !async ){
			if( raw ){
				return this.formRequest.responseText;
			}else{
				return this.JSON_Parse( this.formRequest.responseText );
			}
		}else{
			var formRequest = this.formRequest;
			this.formRequest.onreadystatechange = function(){
				if( formRequest.readyState == 4 ){
					if( formRequest.status == 200 ){
						if( __this.debug ) console.log( 'sendFormData >:', formRequest.responseText );

						var dataObject = __this.JSON_Parse( formRequest.responseText );

						if( callback != undefined ){
							if( raw ){
								callback( formRequest.responseText );
							}else{
								callback( dataObject );
							}
						}else{
							if( dataObject.hasOwnProperty( 'success' ) && dataObject.hasOwnProperty( 'message' ) ){
								if( dataObject.success ){
									if( __this.message != undefined ) __this.message.success( dataObject.message );
								}else{
									if( __this.message != undefined ) __this.message.error( dataObject.message );
								}
							}
						}
					}
					if( closePreloader != undefined ) closePreloader();
				}
			};
		}
	}

	/**
	 * Method for parse string to object
	 * @param {String} string (default:{})
	 * @returns 
	 */
	JSON_Parse( string = '{}' )
	{
		if( this.debug ) console.log( 'JSON_Parse', string );

		let object = undefined;

		try {
			object = JSON.parse( string );
		}catch( e ){
			object = JSON.parse( '{}' );
		}

		return object;
	}

	//<input type="tel" name="data[phone]" value="+7(___)___-__-__" onInput="phoneMask( this );">
	phoneMask( input )
	{
		let patStringArr = "+7(___)___-__-__".split('');
		let arrPush = [3, 4, 5, 7, 8, 9, 11, 12, 14, 15]
		let val = input.value;
		let arr = val.replace(/\D+/g, "").split('').splice(1);
		let n;
		let ni;
		arr.forEach((s, i) => {
			n = arrPush[i];
			patStringArr[n] = s
			ni = i
		});
		arr.length < 10 ? input.style.color = 'red' : input.style.color = 'green';
		input.value = patStringArr.join('');
		n ? v.setSelectionRange(n + 1, n + 1) : input.setSelectionRange(17, 17)
	}

	checkMinMaxfield( field )
	{
		let min = Number( field.min );
		let max = Number( field.max );

		if( field.value != '*' ){
			let value = Number( field.value );
			if( value < min ){
				field.value = min;
			}else if( value > max ){
				field.value = max;
			}
		}
	}
}
