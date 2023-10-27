var dragData = {
	draggedElement: undefined,
	oldParentElement: undefined,
	newParentElement: undefined,
	callBack: undefined,
	type: undefined,
	acl: [],
};

document.addEventListener( 'dragstart', event => {
	if( event.target.draggable == undefined ) return event.preventDefault();
	if( event.target.draggable == false ) return event.preventDefault();
	
	dragData.draggedElement = event.target;
	dragData.oldParentElement = event.target.parentNode;
	dragData.draggedElement.classList.add( 'dragable' );
});
  
document.addEventListener( 'dragover', event => {
	event.preventDefault();
});
  
document.addEventListener( 'drop', (evt) => {
	evt.preventDefault();
	let dropzone = evt.target;


	if( dropzone.classList.contains( 'dropzone' ) ) {
		let access = dropzone.getAttribute( 'access' );
		if( access == null ) access = '';
		dragData.acl = access.split( ',' );
		
		try {
			dragData.type = dragData.draggedElement.getAttribute( 'type' );
		}catch( e ){
			dragData.type = '';
		}
		
		if( evt.dataTransfer.files.length > 0 ) dragData.type = 'file';
		if( evt.dataTransfer.files.length > 1 ) dragData.type = 'files';
		access = false;
		for( let num in dragData.acl ){
			if( dragData.acl[ num ] == dragData.type ){
				access = true;
				break;
			}
		}

		dragData.draggedElement.classList.remove( 'dragable' );
		dropzone.classList.remove( 'dragable' );

		if( access ){
			dragData.newParentElement = dropzone;
			if( dragData.callBack != undefined ) access = dragData.callBack( dragData.draggedElement, dragData, evt );
		}else{
			console.log( dragData.acl );
			app.messages.error( 'Это сюда дропать нельзя' );
		}
	}else if( dragData.draggedElement.parentNode.classList.contains( 'window' ) ){
		evt.preventDefault();

		const x = Number( evt.dataTransfer.getData('x') );
		const y = Number( evt.dataTransfer.getData('y') );
		
		let draggableElement = dragData.draggedElement.parentNode;

		let ex = ( evt.clientX - x );
		let ey = ( evt.clientY - y );

		ex = Math.round( ex / 10 ) * 10;
		ey = Math.round( ey / 10 ) * 10;

		draggableElement.style.left = ex + "px";
		draggableElement.style.top = ey + "px";

		evt.dataTransfer.clearData();
	}
});

