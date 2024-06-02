class Tooltip{
	init;
	tooltipID;
	pageOffset;

	constructor()
	{
		this.init				= false;
		this.tooltipID			= 'tooltipBox';
		this.tooltipObj			= undefined;
		this.pageOffset			= 5;
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
			let x = event.clientX + 5 + scroll[ 0 ];
			let y = event.clientY + 5 + scroll[ 1 ];
			let pageWidth = Math.max(
				document.body.scrollWidth, document.documentElement.scrollWidth,
				document.body.offsetWidth, document.documentElement.offsetWidth,
				document.body.clientWidth, document.documentElement.clientWidth
			);
			let pageHeight = Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);
			
			let rx = ( x + this.tooltipObj.clientWidth + this.pageOffset ) - pageWidth;
			let ry = ( y + this.tooltipObj.clientHeight + this.pageOffset ) - pageHeight;

			if( rx > 0 ) x -= rx;
			if( ry > 0 ) y -= ry;

			this.tooltipObj.style.top = y + 'px';
			this.tooltipObj.style.left = x + 'px';

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

		this.tooltipObj.className = 'hide';

		event.target.removeEventListener( 'mouseout', null );

		// let box = document.getElementById( tooltipID );
		if( this.tooltipObj == undefined ) return;
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
		let sx, sy, d = document,
			r = d.documentElement,
			b = d.body;
		sx = r.scrollLeft || b.scrollLeft || 0;
		sy = r.scrollTop || b.scrollTop || 0;
		return [sx, sy];
	}
}
