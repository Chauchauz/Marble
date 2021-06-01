setScene();
createFloor();
createMarble();
addLight();
createCube();
createShapes();

addShapes();
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
animate();
movement();
rainbowMarble();
buildGui();
window.addEventListener('resize', resizeScene);