class Storage{
	debug;
	storage;

	//-------------------------------------------------------------
	/**
	 * Create storage object
	 * @param {Boolean} use session storage or local storage (default: true)
	 * @param {Boolean} debug (default: false)
	 */
	constructor( session = true, debug = false ){
		this.debug							= debug;
		this.storage						= ( session ) ? sessionStorage : localStorage;
	}

	//-------------------------------------------------------------
	/**
	 * 
	 * @param {String} table name
	 * @param {String} string if data can`t reading or data not found (default: '{}')
	 * @return dataArray or undefined if error
	 */
	getStorageData( table = '', ifNull = '{}' )
	{
		if( this.debug ) console.log( 'getStorageData', this.storage, table );
		if( table == '' ) return undefined;
		let str = this.storage.getItem( table );
		if( this.debug ) console.log( 'getStorageData', table );
		if( str == null ) str = ifNull;
		return this.JSON_Parse( str );
	}

	//-------------------------------------------------------------
	/**
	 * Save value or append at storage
	 * @param {string} table
	 * @param {string} key
	 * @param {string} value
	 * @param {String} string if data can`t reading or data not found (default: '{}')
	 * @return dataArray or undefined if error
	 */
	saveToStorage( table = '', key = '', value = undefined, ifNull = '{}' )
	{
		if( this.debug ) console.log( 'saveToStorage', this.storage, table, key, value, ifNull );
		if( table == '' || key == '' ) return;
		let data = this.getStorageData( table, ifNull );

		let find = false;
		for( let indx in data ){
			if( value == undefined ){
				if( data[ indx ] == key ){
					find = true;
					break;
				}
			}else{
				if( indx == key ){
					data[ indx ] = this.copyObject( value );
					find = true;
					break;
				}
			}
		}

		if( !find ){
			if( data.constructor.name == 'Object' ){
				if( value == undefined ){
					data = this.copyObject( key );
				}else{
					data[ key ] = this.copyObject( value );
				}
			}else if( data.constructor.name == 'Array' ){
				data.push( key );
			}
		}

		this.storage.setItem( table, JSON.stringify( data ) );
		if( this.debug ) console.log( 'saveToStorage >:', this.storage, table, key, value );
	}

	//-------------------------------------------------------------
	/**
	 * Remove data from storage
	 * @param {string} table
	 * @param {string} key
	 * @param {string} value
	 * @return dataArray or undefined if error
	 */
	removeFromStorage( table = '', key = '', value = undefined )
	{
		if( this.debug ) console.log( 'removeFromStorage >:', this.storage, table, key, value );
		if( table == '' || key == '' ) return;
		let data = this.getStorageData( table, ifNull );

		if( data.constructor.name == 'Object' ){
			if( key == '*' ){
				if( table == 'elements' ){
					data = [];
				}else{
					data = {};
				}
			}else{
				delete data[ key ];
			}
		}else if( data.constructor.name == 'Array' ){
			for( let i = 0; i < data.length; i++ ){
				if( data[ i ] == key ){
					data.splice( i, 1 );
					break;
				}
			}
		}
	
		this.storage.setItem( table, JSON.stringify( data ) );
		if( this.debug ) console.log( 'removeFromStorage >:', this.storage, table, key, value );
	}

	//-------------------------------------------------------------
	/**
	 * Method for copy objects
	 * @param {Object} object (default:{})
	 * @returns {Object} (if errors:{})
	 */
	copyObject( object = {} )
	{
		if( this.debug ) console.log( 'copyObject', object );
	
		try {
			object = JSON.stringify( object );
		}catch( e ){
			object = JSON.stringify( {} );
		}
	
		try {
			object = JSON.parse( object );
		}catch( e ){
			object = JSON.parse( '{}' );
		}
	
		return object;
	}

	//-------------------------------------------------------------
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

	//-------------------------------------------------------------
}
