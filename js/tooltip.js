class Tooltip{
	init;
	tooltipID;

	constructor()
	{
		this.init				= false;
		this.tooltipID			= 'tooltipBox';
		this.tooltipObj			= undefined;
	}

	/**
	 * Show method
	 * @param {String} text
	 * @param {Event} event
	 */
	show( text = '', event = undefined )
	{
		if( !this.init ) this.#init();

		if( text == undefined || text == '' || event == undefined ) return;
		if( this.tooltipObj == undefined ) return;

		this.tooltipObj.innerHTML = text;

		if( event.clientY != undefined ){
			var scroll = this.#getScroll();
			this.tooltipObj.style.top = ( event.clientY + 5 + scroll[1] ) + "px";
			this.tooltipObj.style.left = ( event.clientX + 3 + scroll[0] ) + "px";

			event.target.object = this;
			event.target.addEventListener( 'mouseout', function( event ){ this.object.hide( event ); } );
		}
		this.tooltipObj.className = 'show';
	}

	/**
	 * Hide method
	 * @param {Event} event
	 * @return none
	 */
	hide( event = undefined )
	{
		if( !this.init ) return;

		event.target.removeEventListener( 'mouseout', null );

		// let box = document.getElementById( tooltipID );
		if( this.tooltipObj == undefined ) return;

		this.tooltipObj.className = 'hide';
	}

	/**
	 * Initialize method
	 * @param none
	 * @return none
	 */
	#init()
	{
		let box = document.getElementById( this.tooltipID );
		if( box != undefined ) return;

		let obj = document.createElement( 'div' );
		obj.id = this.tooltipID;
		document.body.appendChild( obj );
		this.init = true;
		this.tooltipObj = obj;

		let style = document.createElement( 'style' );
		style.innerHTML = '#tooltipBox { width: auto; max-width: 300px; color: #fff; text-align: center; padding: 5px; border-radius: 6px; position: absolute; z-index: 10000; font-size: 9pt; pointer-events: none; left: -100px; top: -100px; transition: opacity 1s; background-color: rgba( 30, 30, 30, 0.75 ); color: burlywood; } #tooltipBox.show{ opacity: 1; } #tooltipBox.hide{ opacity: 0; }';
		document.body.appendChild( style );
	}

	/**
	 * Window get scroll values method
	 * @param none
	 * @return {Array} values
	 */
	#getScroll()
	{
		if( window.pageYOffset != undefined ){
			return [pageXOffset, pageYOffset];
		}else{
			let sx, sy, d = document,
				r = d.documentElement,
				b = d.body;
			sx = r.scrollLeft || b.scrollLeft || 0;
			sy = r.scrollTop || b.scrollTop || 0;
			return [sx, sy];
		}
	}
}