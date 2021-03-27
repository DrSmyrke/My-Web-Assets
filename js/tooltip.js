var tooltipID = "tooltipBox";

function tootipInit()
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
		box.style.top = ( event.clientY + 5 ) + "px";
		box.style.left = ( event.clientX + 3 ) + "px";

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