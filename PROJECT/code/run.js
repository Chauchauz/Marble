setScene();
addLight();
createFloor();
createMarble();
createCube();
addShapes();
PrismGeometry();
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
animate();
rainbow();
window.addEventListener('resize', resizeScene);