var formRequest					= makeHttpObject();
var formViewBoxID				= "";

function onUpdateParam( input )
{
	var statusBoxObj	= document.getElementById( input.name + "_status" );
	if( statusBoxObj == undefined ){
		console.log( "form.js: onUpdateParam: statusBoxObj not found", input.name );
		return;
	}

	var type			= input.lang;
	var name			= input.name;
	var action			= input.getAttribute( "data-action" );
	var cmd				= input.getAttribute( "data-cmd" );
	var id				= input.getAttribute( "data-id" );

	if( action == undefined || action == "" ){
		console.log( "form.js: onUpdateParam: action", action );
		return;
	}

	formRequest.open( "POST", action, false );
	formRequest.setRequestHeader( 'Content-type','application/x-www-form-urlencoded' );
	var string			= "";

	if( cmd != "" )		string += "cmd=" + cmd;
	if( id != "" )		string += "&data[id]=" + id;
	if( type != "" )	string += "&data[type]=" + type;
	if( name != "" )	string += "&data[param]=" + name;

	string += "&data[value]=" + input.value;

	formRequest.send( string );

	statusBoxObj.innerHTML = formRequest.responseText;
}

function changeParam( form, viewBoxID )
{
	var viewBoxObj = document.getElementById( viewBoxID );
	if( viewBoxObj == undefined ){
		viewBoxObj = document.getElementById( formViewBoxID );
		if( viewBoxObj == undefined ){
			console.log( "form.js: changeParam: viewBoxObj not found" );
			return;
		}
	}

	var arrayInput = form.getElementsByTagName("INPUT");
	var arraySelect = form.getElementsByTagName("SELECT");
	var finalData = Array();
	var finalString = "";

	for( i = 0; i < arrayInput.length; i++ ){
		if( arrayInput[i].name == "" ) continue;
		if( arrayInput[i].value != "" ) finalData.push( arrayInput[i].name + "=" + arrayInput[i].value );
	}
	for( i = 0; i < arraySelect.length; i++ ){
		if( arraySelect[i].name == "" ) continue;
		if( arraySelect[i].value != "" ) finalData.push( arraySelect[i].name + "=" + arraySelect[i].value );
	}

	finalString = finalData.join( "&" );

	formRequest.open( "POST", form.action, false );
	formRequest.setRequestHeader( 'Content-type','application/x-www-form-urlencoded' );
	formRequest.send( finalString );

	viewBoxObj.innerHTML = formRequest.responseText;

	return false;
}

function uploadForm( form, viewBoxID )
{
	var viewBoxObj = document.getElementById( viewBoxID );
	if( viewBoxObj == undefined ){
		viewBoxObj = document.getElementById( formViewBoxID );
		if( viewBoxObj == undefined ){
			console.log( "form.js: uploadForm: viewBoxObj not found" );
			return;
		}
	}

	var formData = new FormData(form);
	request.open( "POST", form.action, false );
	request.send( formData );

	viewBoxObj.innerHTML = request.responseText;

	return false;
}
