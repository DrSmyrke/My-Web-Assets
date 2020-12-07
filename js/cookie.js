function setCookie( cname, cvalue )
{
	var d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie( name )
{
	/*
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
  */
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  if( match ) return match[2];

  return undefined;
}

function cookieInit()
{
	var obj					= document.createElement( "div" );
	var objText				= document.createElement( "div" );
	var objButton			= document.createElement( "div" );

	var cookieText = {
		"ru": "Используя этот сайт, вы соглашаетесь на использование нами файлов cookie. Мы используем куки, чтобы предоставить вам удобство использования и помочь нашему веб-сайту работать эффективно.",
		"en": "By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.",
	};

	obj.id					= "cookieBox";
	obj.style.background	= "gray";
	obj.style.fontSize		= "21pt";
	obj.style.position		= "fixed";
	obj.style.left			= "0px";
	obj.style.bottom		= "0px";
	obj.style.width			= "100%";
	obj.style.alignItems	= "center";
	obj.style.display		= "none";

	objText.style.margin	= "10px";

	objButton.style.width				= "173px";
	objButton.style.height				= "173px";
	objButton.style.border				= "1px solid orange";
	objButton.style.color				= "orange";
	objButton.style.fontWeight			= "bold";
	objButton.style.cursor				= "pointer";
	objButton.style.display				= "flex";
	objButton.style.justifyContent		= "center";
	objButton.style.alignItems			= "center";
	objButton.style.margin				= "10px";

	objText.innerHTML		= cookieText[ document.head.lang ];
	objButton.innerHTML		= "OK";
	objButton.addEventListener('click', function(){
		acceptCookie();
	}, false);

	obj.appendChild( objText );
	obj.appendChild( objButton );

	document.body.appendChild( obj );
}

function chkCookie()
{
	var cookieElem = document.getElementById( "cookieBox" );
	if( cookieElem == undefined ) cookieInit();
	if( getCookie( "acceptCookie" ) != "true" ){
		document.getElementById( "cookieBox" ).style.display = "flex";
	}
}

function acceptCookie()
{
	setCookie( "acceptCookie", true );
	document.location.reload();
}
