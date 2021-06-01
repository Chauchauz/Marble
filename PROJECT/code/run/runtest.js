setScene();
createFloor();
//createRoof();
createMarble();
addLight();
createCube();
createShapes();

addShapes();
//createWall(1,1,1);
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
animate();
movement();
// collision();
// boardTilt();
rainbowMarble();
buildGui();
window.addEventListener('resize', resizeScene);