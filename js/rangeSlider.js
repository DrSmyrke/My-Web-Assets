class RangeSlider{
	tabindex;
	sliders;

	constructor()
	{
		this.sliders	= Array();
		this.tabindex	= 0;

		let styleObj = document.createElement( 'style' );
		styleObj.innerHTML = '[slider] { position: relative; height: 7px; } [slider] > div { position: absolute; left: 13px; right: 15px; height: 14px; } [slider] > div > [inverse-left] {  position: absolute;  left: 0;  height: 7px;  border-radius: 10px;  background-color: var( --main-color );  margin: 0 7px;  }   [slider] > div > [inverse-right] {  position: absolute;  right: 0;  height: 7px;  border-radius: 10px;  background-color: var( --main-color );  margin: 0 7px;  }   [slider] > div > [range] {  position: absolute;  left: 0;  height: 7px;  border-radius: 14px;  background-color: rgb(255, 184, 0);  }    [slider] > div > [thumb] {  position: absolute;  top: -7px;  z-index: 2;  height: 20px;  width: 20px;  text-align: left;  margin-left: -11px;  cursor: pointer;  background-color: rgb(255, 184, 0);  border-radius: 50%;  outline: none;  }    [slider] > input[type=range] {  position: absolute;  pointer-events: none;  -webkit-appearance: none;  z-index: 3;  height: 14px;  top: -2px;  width: 100%;  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";  filter: alpha(opacity=0);  -moz-opacity: 0;  -khtml-opacity: 0;  opacity: 0;  }    div[slider] > input[type=range]::-ms-track {  -webkit-appearance: none;  background: transparent;  color: transparent;  }    div[slider] > input[type=range]::-moz-range-track {  -moz-appearance: none;  background: transparent;  color: transparent;  }    div[slider] > input[type=range]:focus::-webkit-slider-runnable-track {  background: transparent;  border: transparent;  }    div[slider] > input[type=range]:focus {  outline: none;  }    div[slider] > input[type=range]::-ms-thumb {  pointer-events: all;  width: 20px;  height: 20px;  border-radius: 0px;  border: 1;  }    div[slider] > input[type=range]::-moz-range-thumb {  pointer-events: all;  width: 20px;  height: 20px;  border-radius: 0px;  border: 1;  }    div[slider] > input[type=range]::-webkit-slider-thumb {  pointer-events: all;  width: 20px;  height: 20px;  border-radius: 0px;  border: 1;  -webkit-appearance: none;  }    div[slider] > input[type=range]::-ms-fill-lower {  background: transparent;  border: 0 none;  }    div[slider] > input[type=range]::-ms-fill-upper {  background: transparent;  border: 0 none;  }    div[slider] > input[type=range]::-ms-tooltip { display: none; }';
		document.body.appendChild( styleObj );
	}

	/**
	 * 
	 * @param {*} value
	 */
	static getPrz( value = 0, min = 0, max = 100 )
	{
		min = Number( min );
		max = Number( max );
		value = Number( value );
		return ( 100 / ( parseInt( max ) - parseInt( min ) ) ) * parseInt( value ) - ( 100 / ( parseInt( max ) - parseInt( min ) ) ) * parseInt( min );
	}

	/**
	 * 
	 * @param {*} value
	 */
	createSlider( parent = undefined, min = 0, max = 100, step = 1, minVal = 0, maxVal = 0, label = undefined )
	{
		min = Number( min );
		max = Number( max );
		minVal = Number( minVal );
		maxVal = Number( maxVal );
		step = Number( step );
		if( parent == undefined ) return;

		let valueL = RangeSlider.getPrz( minVal, min, max );
		let valueR = RangeSlider.getPrz( maxVal, min, max );

		let parentDiv = document.createElement( 'div' );
		let div = document.createElement( 'div' );
			let divIL = document.createElement( 'div' );
			divIL.setAttribute( 'inverse-left', '' );
			divIL.style.width = valueL + '%';
			let divIR = document.createElement( 'div' );
			divIR.setAttribute( 'inverse-right', '' );
			divIR.style.width = ( 100 - valueR ) + '%';
			let divRange = document.createElement( 'div' );
			divRange.setAttribute( 'range', '' );
			divRange.style.left = valueL + '%';
			divRange.style.right = ( 100 - valueR ) + '%';
			let thumbL = document.createElement( 'span' );
			thumbL.setAttribute( 'thumb', '' );
			thumbL.style.left = valueL + '%';
			let thumbR = document.createElement( 'span' );
			thumbR.setAttribute( 'thumb', '' );
			thumbR.style.left = valueR + '%';
		div.appendChild( divIL );
		div.appendChild( divIR );
		div.appendChild( divRange );
		div.appendChild( thumbL );
		div.appendChild( thumbR );

		let inputL = document.createElement( 'input' );
		inputL.type = 'range';
		inputL.min = min;
		inputL.max = max;
		inputL.step = step;
		inputL.value = minVal;
		inputL.label = label;
		inputL.setAttribute( 'tabindex', this.tabindex );
		inputL.addEventListener( 'input' , function(){
			let children = this.parentNode.childNodes[ 0 ].childNodes;
			this.value = Math.min( this.value, this.nextElementSibling.value - 1 );
			// var value = ( 100 / ( parseInt( this.max ) - parseInt( this.min ) ) ) * parseInt( this.value ) - ( 100 / ( parseInt( this.max ) - parseInt( this.min ) ) ) * parseInt( this.min );
			let value = RangeSlider.getPrz( this.value, this.min, this.max );
			children[ 0 ].style.width=value+'%'; children[ 2 ].style.left=value+'%'; children[ 3 ].style.left=value+'%';
			if( this.label == undefined ) return;
			let tmp = this.label.innerText.split( '-' );
			if( tmp.length != 2 ) return;
			this.label.innerHTML = this.value + '-' + tmp[ 1 ];
		});
		let inputR = document.createElement( 'input' );
		inputR.type = 'range';
		inputR.min = min;
		inputR.max = max;
		inputR.step = step;
		inputR.value = maxVal;
		inputR.label = label;
		inputR.setAttribute( 'tabindex', this.tabindex );
		inputR.addEventListener( 'input' , function(){
			let children = this.parentNode.childNodes[ 0 ].childNodes;
			this.value = Math.max( this.value, this.previousElementSibling.value - ( -1 ) );
			// var value = ( 100 / ( parseInt( this.max ) - parseInt( this.min ) ) ) * parseInt( this.value ) - ( 100 / ( parseInt( this.max ) - parseInt( this.min ) ) ) * parseInt( this.min );
			let value = RangeSlider.getPrz( this.value, this.min, this.max );
			children[ 1 ].style.width=(100-value)+'%'; children[ 2 ].style.right=(100-value)+'%'; children[ 4 ].style.left=value+'%';
			if( this.label == undefined ) return;
			let tmp = this.label.innerText.split( '-' );
			if( tmp.length != 2 ) return;
			this.label.innerHTML = tmp[ 0 ] + '-' + this.value;
		} );

		parentDiv.appendChild( div );
		parentDiv.appendChild( inputL );
		parentDiv.appendChild( inputR );

		parentDiv.setAttribute( 'slider', '' );

		parent.appendChild( parentDiv );

		this.tabindex++;


		if( label == undefined ) return;

		label.innerHTML = minVal + '-' + maxVal;
	}

}