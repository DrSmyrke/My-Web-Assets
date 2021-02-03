function addClass( obj, name )
{
	if( obj == undefined ) return;
	if( obj.className == undefined ) return;
	if( name == undefined ) return;
	if( name == "" ) return;

	var classList		= obj.className.split( " " );
	var find			= false;

	for( i = 0; i < classList.length; i++ ){
		if( classList[i] == name ){
			find = true;
			break;
		}
	}

	if( !find ){
		classList.push( name );
		obj.className = classList.join( " " );
	}
}

function removeClass( obj, name )
{
	if( obj == undefined ) return;
	if( obj.className == undefined ) return;
	if( name == undefined ) return;
	if( name == "" ) return;

	var classList		= obj.className.split( " " );
	var find			= false;

	for( i = 0; i < classList.length; i++ ){
		if( classList[i] == name ){
			if( !find ) find = true;
			classList.splice( i, 1 );
			i--;
		}
	}

	if( find ){
		obj.className = classList.join( " " );
	}
}