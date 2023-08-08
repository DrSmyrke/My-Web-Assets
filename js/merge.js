class Merge{
	type;
	types;

	constructor()
	{
		this.type									= 0;
		this.types									= [ 'element', 'posture' ];
	}

	/**
	 * Set type of merge
	 * @param {unsigned integer} type
	 */
	setType( type = 0 )
	{
		if( type < 0 ) return;
		if( type >= this.types.length ) return;
		this.type = type;
	}

	/**
	 * Compare data
	 * @param {Object} source DOM object
	 * @param {Object} destination DOM object
	 * @param {Object} source data
	 * @param {Object} destination data
	 * @param {Array} fields to find objects
	 * @param {Array} fields to without compare objects
	 */
	compare( srcBox = undefined, dstBox = undefined, src = {}, dst = {}, findFields = [], r = [] )
	{
		if( srcBox == undefined ) return console.error( 'source box is undefined' );
		if( dstBox == undefined ) return console.error( 'destination box is undefined' );

		srcBox.innerHTML = '';
		dstBox.innerHTML = '';

		let sTable = document.createElement( 'table' );
		let dTable = document.createElement( 'table' );

		srcBox.appendChild( sTable );
		dstBox.appendChild( dTable );

		if( this.type == 1 ){
			for( let si in src ){
				let sobj = src[ si ];
				if( !this.#checkingFields( sobj, findFields ) ) continue;
				// Find object to compare
				for( let di in dst ){
					let dobj = dst[ di ];
					if( !this.#checkingFields( dobj, findFields ) ) continue;
					// Compare fields value
					if( this.#compareFields( sobj, dobj, findFields ) ){
						console.warn( sobj, dobj, typeof sobj, typeof dobj );
						// if( typeof value == Object ){

						// }

						let sTr										= document.createElement( 'tr' );
						let dTr										= document.createElement( 'tr' );
						let tdSrcPref								= document.createElement( 'td' );
						let tdSrcParam								= document.createElement( 'td' );
						let tdSrcValue								= document.createElement( 'td' );
						let tdDstPref								= document.createElement( 'td' );
						let tdDstParam								= document.createElement( 'td' );
						let tdDstValue								= document.createElement( 'td' );
						sTr.appendChild( tdSrcPref );
						sTr.appendChild( tdSrcParam );
						sTr.appendChild( tdSrcValue );
						dTr.appendChild( tdDstPref );
						dTr.appendChild( tdDstParam );
						dTr.appendChild( tdDstValue );
						sTable.appendChild( sTr );
						dTable.appendChild( dTr );
						tdSrcPref.innerHTML							= '<input type="checkbox" name="' + sobj.id + '">';
						tdDstPref.innerHTML							= '<input type="checkbox" readonly disabled>';
						tdSrcValue.innerText						= typeof sobj;
						tdDstValue.innerText						= typeof dobj;
						tdSrcValue.lang								= 'ID:' + sobj.id + ' [' + sobj.name + ']'
						tdDstValue.lang								= 'ID:' + dobj.id + ' [' + dobj.name + ']'
						tdSrcValue.addEventListener( 'mouseover', function( ev ){
							tooltipShow( ev.target.lang, ev );
						}, false);
						tdDstValue.addEventListener( 'mouseover', function( ev ){
							tooltipShow( ev.target.lang, ev );
						}, false);

						let cmpNum = this.compareObject( sTable, dTable, sobj, dobj, findFields, r );

						let total									= this.#countFields( sobj );
						tdSrcParam.innerText						= cmpNum + '/' + total;
						if( cmpNum != total ) sTr.classList.add( 'red' );
						break;
					}
				}
			}
		}
	}

	/**
	 * Compare data
	 * @param {Object} source DOM object
	 * @param {Object} destination DOM object
	 * @param {Object} source data object
	 * @param {Object} destination data object
	 * @param {Array} fields to find objects
	 * @param {Array} fields to without compare objects
	 * @param {Boolean} table struct output
	 * @param {String} preffix string for visible humanity data
	 */
	compareObject( srcBox = undefined, dstBox = undefined, src = {}, dst = {}, findFields = [], r = [], table = true, preffix = '|' )
	{
		let cmp = 0;

		for( let param in src ){
			let paramClass									= '';
			let srcParamClassList							= [];
			let dstParamClassList							= [];
			let srcValueClassList							= [];
			let dstValueClassList							= [];
			let valClass		= '';
			let srcValue									= src[ param ];
			let dstValue									= 'N/A';

			let find										= false;
			for( let i in r ){
				if( param == r[ i ] ){
					cmp++;
					find = true;
					break;
				}
			}
			if( find ) continue;

			if( dst.hasOwnProperty( param ) ){
				dstValue									= dst[ param ];

				//Found, compare...
				if( srcValue == dstValue ){
					cmp++;
				}

				
				paramClass = ' class="green"';
				valClass = ( dstValue == srcValue )? ' class="green"' : ' class="red"';

				srcParamClassList.push( 'green' );
				dstParamClassList.push( 'green' );

				srcValueClassList.push( ( ( dstValue == srcValue ) ? 'green' : 'red' ) );
				dstValueClassList.push( ( ( dstValue == srcValue ) ? 'green' : 'red' ) );
			}else{
				//Not found
				paramClass = ' class="red"';
				valClass = ' class="red"';

				srcParamClassList.push( 'red' );
				dstParamClassList.push( 'red' );

				srcValueClassList.push( 'red' );
				dstValueClassList.push( 'red' );
			}

			if( !table ){
				srcBox.innerHTML += '<div class="string"><text>' + preffix + '</text><text' + paramClass + '>' + param + '</text><text' + valClass + '>' + srcValue + '</text></div>';
			}else{
				let sTr										= document.createElement( 'tr' );
				let dTr										= document.createElement( 'tr' );
				let tdSrcPref								= document.createElement( 'td' );
				let tdSrcParam								= document.createElement( 'td' );
				let tdSrcValue								= document.createElement( 'td' );
				let tdDstPref								= document.createElement( 'td' );
				let tdDstParam								= document.createElement( 'td' );
				let tdDstValue								= document.createElement( 'td' );
				sTr.appendChild( tdSrcPref );
				sTr.appendChild( tdSrcParam );
				sTr.appendChild( tdSrcValue );
				dTr.appendChild( tdDstPref );
				dTr.appendChild( tdDstParam );
				dTr.appendChild( tdDstValue );
				srcBox.appendChild( sTr );
				dstBox.appendChild( dTr );

				tdSrcPref.innerText							= preffix;
				tdSrcParam.innerText						= param;
				tdSrcValue.innerText						= srcValue;
				tdDstPref.innerText							= preffix;
				tdDstParam.innerText						= param;
				tdDstValue.innerText						= dstValue;

				tdSrcParam.classList.add( srcParamClassList );
				tdDstParam.classList.add( dstParamClassList );
				tdSrcValue.classList.add( srcValueClassList );
				tdDstValue.classList.add( dstValueClassList );
			}
		}

		return cmp;
	}

	/**
	 * Compare value of fields in object
	 * @param {Object} master object
	 * @param {Object} slave object
	 * @param {Array} fields to finding in object
	 */
	#compareFields( master = undefined, slave = undefined, findFields = [] )
	{
		let res = false;
		if( master == undefined ) return res;
		if( slave == undefined ) return res;

		res = true;

		for( let i in findFields ){
			let field = findFields[ i ];
			if( !master.hasOwnProperty( field ) || !slave.hasOwnProperty( field ) ){
				res = false;
				break;
			}

			if( master[ field ] != slave[ field ] ){
				res = false;
				break;
			}
		}

		return res;
	}

	/**
	 * Checking to available fields in object
	 * @param {Object} object
	 * @param {Array} fields to finding in object
	 */
	#checkingFields( obj = undefined, findFields = [] )
	{
		let res = false;
		if( obj == undefined ) return res;

		res = true;

		for( let i in findFields ){
			if( !obj.hasOwnProperty( findFields[ i ] ) ){
				res = false;
				break;
			}
		}

		return res;
	}

	/**
	 * Count fields in Object
	 * @param {Object} object
	 * @return number fields
	 */
	#countFields( obj = undefined )
	{
		let count = 0;
		if( obj == undefined ) return count;

		for( let field in obj ) count++;

		return count;
	}
}