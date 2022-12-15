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
	var verbose = true;
	var viewBoxObj = document.getElementById( viewBoxID );
	if( viewBoxObj == undefined ){
		viewBoxObj = document.getElementById( formViewBoxID );
		if( viewBoxObj == undefined ){
			console.warn( "form.js: changeParam: viewBoxObj not found" );
			verbose = false;
		}
	}

	var arrayInput			= form.getElementsByTagName("INPUT");
	var arraySelect			= form.getElementsByTagName("SELECT");
	var arrayTextarea		= form.getElementsByTagName("TEXTAREA");
	var finalData			= Array();
	var finalString			= "";

	for( i = 0; i < arrayInput.length; i++ ){
		if( arrayInput[i].name == "" ) continue;
		if( arrayInput[i].type == "radio" && !arrayInput[i].checked ) continue;
		if( arrayInput[i].value != "" ) finalData.push( arrayInput[i].name + "=" + arrayInput[i].value );
	}
	for( i = 0; i < arraySelect.length; i++ ){
		if( arraySelect[i].name == "" ) continue;
		if( arraySelect[i].value != "" ) finalData.push( arraySelect[i].name + "=" + arraySelect[i].value );
	}
	for( i = 0; i < arrayTextarea.length; i++ ){
		if( arrayTextarea[i].name == "" ) continue;
		if( arrayTextarea[i].value != "" ) finalData.push( arrayTextarea[i].name + "=" + arrayTextarea[i].value );
	}

	finalString = finalData.join( "&" );

	formRequest.open( form.method, form.action, true );
	formRequest.setRequestHeader( 'Content-type','application/x-www-form-urlencoded' );
	formRequest.send( finalString );

	formRequest.onreadystatechange = function(){
		if( formRequest.readyState == 4 && formRequest.status == 200 ){
			if( verbose ) viewBoxObj.innerHTML = formRequest.responseText;
		}
	}	

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

	viewBoxObj.innerHTML = '<img src="/data/images/loader.gif">';

	var formData = new FormData( form );
	formRequest.open( "POST", form.action, false );
	formRequest.send( formData );

	viewBoxObj.innerHTML = formRequest.responseText;

	return false;
}

function sendForm( form )
{
	var formData = new FormData( form );
	formRequest.open( "POST", form.action, false );
	formRequest.send( formData );

	return JSON.parse( ( formRequest.responseText != '' ) ? formRequest.responseText : '{}' );
}

//-------------------------------------------------------------------------------------------------------
//<input type="tel" name="data[phone]" value="+7(___)___-__-__" onInput="phoneMask( this );">
function phoneMask( input )
{
	let patStringArr = "+7(___)___-__-__".split('');
	let arrPush = [3, 4, 5, 7, 8, 9, 11, 12, 14, 15]
	let val = input.value;
	let arr = val.replace(/\D+/g, "").split('').splice(1);
	let n;
	let ni;
	arr.forEach((s, i) => {
		n = arrPush[i];
		patStringArr[n] = s
		ni = i
	});
	arr.length < 10 ? input.style.color = 'red' : input.style.color = 'green';
	input.value = patStringArr.join('');
	n ? v.setSelectionRange(n + 1, n + 1) : input.setSelectionRange(17, 17)
}

//-------------------------------------------------------------------------------------------------------
function checkMinMaxfield( field )
{
	let min = Number( field.min );
	let max = Number( field.max );

	if( field.value != '*' ){
		let value = Number( field.value );
		if( value < min ){
			field.value = min;
		}else if( value > max ){
			field.value = max;
		}
	}
}

//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------