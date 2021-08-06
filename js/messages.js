function messages_init()
{
	if( typeof app == "undefined" ){
		console.error( "app is undefined" );
		return;
	}

	if( app.message == undefined ){
		console.warn( "app.message is undefined" );
		return;
	}

	app.message = false;

	var div = document.createElement( "div" );

	messageBoxID	= "messageBox";
	div.id			= messageBoxID;
	div.className	= "animated";
	div.lang		= div.className;

	document.body.appendChild( div );
}

function message( message = "", type = "" )
{
	var obj = document.getElementById( "messageBox" );

	if( obj == undefined ) return;
	if( app.message ){
		//setTimeout( "message( \'" + message + "\' );", 5000 );
		return;
	}

	obj.classList.remove( "error" );
	obj.classList.remove( "warning" );
	obj.classList.remove( "info" );
	obj.classList.remove( "hidden" );

	switch( type ){
		case "info": obj.classList.add( "info" ); break;
		case "error": obj.classList.add( "error" ); break;
		case "warn": obj.classList.add( "warning" ); break;
	}

	obj.innerHTML = message;
	obj.classList.add( "animate__bounceInLeft" );
	obj.style.left = "15px";

	app.message = true;

	setTimeout( function(){
		obj.classList.remove( "animate__bounceInLeft" );
		obj.classList.add( "animate__bounceOutLeft" );
	}, 3000 );

	setTimeout( function(){
		obj.classList.add( "hidden" );
		obj.classList.remove( "animate__bounceOutLeft" );
		obj.style.left = "-1500px";
		app.message = false;
	}, 4000 );
}