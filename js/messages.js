var messageBoxID;

function messages_init()
{
	var div = document.createElement( "div" );

	messageBoxID	= "messageBox";
	div.id			= messageBoxID;
	div.className	= "messageBox animated";
	div.lang		= div.className;

	document.body.appendChild( div );

	message_hide();
}

function message( text, success = true, timeout = 3000 )
{
	var box = document.getElementById( messageBoxID );

	if( box == undefined ){
		console.log( "message : box undefined" );
		return;
	}

	successClass	= ( success ) ? ' success' : ' error';
	box.innerHTML	= text;
	box.className	= box.lang + successClass + " animate__bounceInLeft";

	setTimeout( "message_hide()", timeout );
}

function message_hide()
{
	var box = document.getElementById( messageBoxID );

	if( box == undefined ){
		console.log( "message : box undefined" );
		return;
	}

	box.className	= box.lang + " animate__bounceOutLeft";

	setTimeout( "message_clear()", 1000 );
}

function message_clear()
{
	var box = document.getElementById( messageBoxID );

	if( box == undefined ){
		console.log( "message : box undefined" );
		return;
	}

	box.innerHTML	= "";
}
