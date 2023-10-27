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
	// prevent default to allow drop
	event.preventDefault();
});
  
document.addEventListener( 'drop', (evt) => {
	// prevent default action (open as link for some elements)
	evt.preventDefault();
	// move dragged element to the selected drop target
	let dropzone = evt.target;
	

	// Если перетаскиваем в дроп зону
	if( dropzone.classList.contains( 'dropzone' ) ) {
		// Проверяем разрешено ли нам сюда дропаться
		let access = dropzone.getAttribute( 'access' );
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

		// console.warn( access, type, dragData.acl, dragData, evt );
		dragData.draggedElement.classList.remove( 'dragable' );
		dropzone.classList.remove( 'dragable' );

		if( access ){
			dragData.newParentElement = dropzone;
			if( dragData.callBack != undefined ) access = dragData.callBack( dragData.draggedElement, dragData, evt );
			// dragData.draggedElement = undefined;
			// dragData.oldParentElement = undefined;
			// dragData.newParentElement = undefined;
			// dragData.callBack = undefined;
			// dragData.type = undefined;
		}else{
			console.log( dragData.acl );
			message.error( 'Это сюда дропать нельзя' );
		}
	}
});

