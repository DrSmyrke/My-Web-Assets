var tooltipID = "tooltipBox";

function tooltipInit()
{
	var obj = document.createElement( "div" );
	obj.id = tooltipID;
	document.body.appendChild( obj );
}

function tooltipShow( text, event )
{
	if( text == undefined || text == "" ) return;

	var box = document.getElementById( tooltipID );
	if( box == undefined ) return;

	box.innerHTML = text;

	box.style.visibility = "visible";
	if( event.clientY != undefined ){
		var scroll = getScroll();
		box.style.top = ( event.clientY + 5 + scroll[1] ) + "px";
		box.style.left = ( event.clientX + 3 + scroll[0] ) + "px";

		event.target.addEventListener( 'mouseout', tooltipHide );
	}
	box.className = "show";
}

function tooltipHide( event )
{
	event.target.removeEventListener( 'mouseout', tooltipHide );

	var box = document.getElementById( tooltipID );
	if( box == undefined ) return;

	box.className = "hide";
}

function getScroll()
{
	if (window.pageYOffset != undefined) {
		return [pageXOffset, pageYOffset];
	} else {
		var sx, sy, d = document,
			r = d.documentElement,
			b = d.body;
		sx = r.scrollLeft || b.scrollLeft || 0;
		sy = r.scrollTop || b.scrollTop || 0;
		return [sx, sy];
	}
}