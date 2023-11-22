// ----- MOUSE --------------------------------------------------
document.addEventListener( 'contextmenu', function( ev ){
	if( app.debug && app.debugAll ) console.log( ev );

	let taskItemInContext = clickInsideElement( ev, 'customContextMenu' );

	if( taskItemInContext ){
		ev.preventDefault();
		app.contextMenu.toggleMenuOn( ev );
		app.contextMenu.positionMenu( ev );
	}else{
		// taskItemInContext = null;
		app.contextMenu.toggleMenuOff( ev );
	}
}, false);
document.addEventListener( 'click', function( ev ){
	if( app.debug && app.debugAll ) console.log( ev );

	let clickeElIsLink = clickInsideElement( ev, 'menu_item' );

	if ( clickeElIsLink ) {
		ev.preventDefault();
		clickeElIsLink.click();
	} else {
		var button = ev.which || ev.button;
		if ( button === 1 ) {
			app.contextMenu.toggleMenuOff();
		}
	}
}, false);
// ----- KEYBOARD -----------------------------------------------
document.addEventListener( 'keyup', function( ev ){
	// Контекстное меню
	if( ev.key == 'Escape' && typeof app.contextMenu == 'object' ){
		app.contextMenu.toggleMenuOff();
	}
}, false);
// ----- FRAME -------------------------------------------------
window.addEventListener( 'resize', function( ev ){
	app.contextMenu.toggleMenuOff();
}, false);
// ----- ON LOAD ------------------------------------------------
window.addEventListener( 'load', function( ev ){
	app.contextMenu = new ContextMenu();
}, false);

//-------------------------------------------------------------
class ContextMenu{
	object;

	constructor()
	{
		// Create object
		this.object						= document.createElement( 'nav' );
		this.object.className			= 'context-menu flex column hidden';
		document.body.appendChild( this.object );
	}

	//-------------------------------------------------------------
	/**
	 * Append custom context menu
	 * @param {String} text
	 * @param {String} menuid 
	 * @param {DOM Object} ico
	 * @param {Function} callBack (default: undefined)
	 * @returns 
	 */
	append( text = '', menuid = '', ico = undefined, callBack = undefined )
	{
		if( this.object == undefined ) return;
		if( text == '' || menuid == '' ) return;

		let button						= document.createElement( 'button' );

		if( ico != undefined  ){
			ico.classList.add( 'ico' );
			button.appendChild( ico );
		}
 
		let textBox						= document.createElement( 'text' );
		textBox.innerHTML				= text;
		button.appendChild( textBox );
		button.setAttribute( 'menuid', menuid );

		if( callBack != undefined ) button.onclick = callBack;

		this.object.appendChild( button );
	}

	//-------------------------------------------------------------
	/**
	 * Clear custom context menu
	 */
	clear()
	{
		if( this.object == undefined ) return;
		this.object.innerHTML = '';
	}

	//-------------------------------------------------------------
	/**
	 * Turns the custom context menu on.
	 * @param (Event) event
	 * @return none
	 */
	toggleMenuOn( event = undefined )
	{
		if( this.object == undefined ) return;

		if( event != undefined ){
			if( event.target != undefined ){
				this.object.target = event.target;
				let menuID = event.target.getAttribute( 'menuid' );
				if( menuID != '' && menuID != null ){
					for( let i = 0; i < this.object.children.length; i++ ){
						let elem = this.object.children[ i ];
						let buttonMenuID = elem.getAttribute( 'menuid' );
						if( buttonMenuID != menuID ){
							elem.classList.add( 'hidden' );
						}else{
							elem.classList.remove( 'hidden' );
						}
					}
				}
			}
		}

		if( this.object.classList.contains( 'hidden' ) ) {
			this.object.classList.remove( 'hidden' );
		}
	}

	//-------------------------------------------------------------
	/**
	 * Turns the custom context menu off.
	 * @param (Event) event
	 * @return none
	 */
	toggleMenuOff( event = undefined )
	{
		if( this.object == undefined ) return;

		if( !this.object.classList.contains( 'hidden' ) ) {
			this.object.classList.add( 'hidden' );
		}
	}

	//-------------------------------------------------------------
	/**
	* Positions the menu properly.
	* 
	* @param {Object} e The event
	*/
	positionMenu( ev )
	{
		let clickCoords = this.getPosition( ev );

		let menuWidth = this.object.offsetWidth + 4;
		let menuHeight = this.object.offsetHeight + 4;
	
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
	
		if( ( windowWidth - clickCoords.x ) < menuWidth ){
			this.object.style.left = windowWidth - menuWidth + 'px';
		}else{
			this.object.style.left = clickCoords.x + 'px';
		}
	
		if( ( windowHeight - clickCoords.y ) < menuHeight ){
			this.object.style.top = windowHeight - menuHeight + 'px';
		}else{
			this.object.style.top = clickCoords.y + 'px';
		}
	}
	//-------------------------------------------------------------

	/**
	* Get's exact position of event.
	* 
	* @param {Object} e The event passed in
	* @return {Object} Returns the x and y position
	*/
	getPosition( ev )
	{
		var posx = 0;
		var posy = 0;
	
		if( !ev ) var ev = window.event;
		
		if( ev.pageX || ev.pageY ){
			posx = ev.pageX;
			posy = ev.pageY;
		}else if( ev.clientX || ev.clientY ){
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
	
		return { x: posx, y: posy }
	}
	//-------------------------------------------------------------
}
