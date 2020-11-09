var formRequest					= makeHttpObject();
var formViewBoxID				= "";

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
			console.log( "form.js: changeParam: viewBoxObj not found" );
			return;
		}
	}

	var formData = new FormData(form);
	request.open( "POST", form.action, false );
	request.send( formData );

	viewBoxObj.innerHTML = request.responseText;

	return false;
}
