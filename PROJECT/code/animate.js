var tiltForward = false;
var tiltLeft = false;
var tiltBackward = false;
var tiltRight = false;

var red = 1;
var green = 0;
var blue = 1;
//Magenta = 1, Yellow = 2, Cyan = 3
var colorState = 0;
var colorSpeed = 0.025;

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);

    if (tiltForward && floor.rotation.x > 2 * Math.PI / 5) {
        floor.rotation.x -= 0.01;
    }
    if (tiltLeft && floor.rotation.y < Math.PI / 10) {
        floor.rotation.y += 0.01;
    }
    if (tiltBackward && floor.rotation.x < 3 * Math.PI / 5) {
        floor.rotation.x += 0.01;
    }
    if (tiltRight && floor.rotation.y > -1 * Math.PI / 10) {
        floor.rotation.y -= 0.01;
    }
}

function rainbow() {
    if (red >= 1 && blue >= 1) {
        colorState = 1;
    }
    else if (red >= 1 && green >= 1) {
        colorState = 2;
    }
    else if (green >= 1 && blue >= 1) {
        colorState = 3;
    }

    if (colorState == 1) {
        blue -= colorSpeed;
        green += colorSpeed;
    }
    else if (colorState == 2) {
        red -= colorSpeed;
        blue += colorSpeed;
    }
    else if (colorState == 3) {
        green -= colorSpeed;
        red += colorSpeed;
    }

    marble.material.color = new THREE.Color(red, green, blue);
    requestAnimationFrame(rainbow);
}

var onKeyUp = function ( event ) {

    switch( event.keyCode ) {

      //case 38: // up
      case 87: // w
        tiltForward = false;
        break;

      //case 37: // left
      case 65: // a
        tiltLeft = false;
        break;

      //case 40: // down
      case 83: // s
        tiltBackward = false;
        break;

      //case 39: // right
      case 68: // d
        tiltRight = false;
        break;

    }
}

var onKeyDown = function ( event ) {

    switch( event.keyCode ) {

        //case 38: // up
        case 87: // w
        tiltForward = true;
        break;

        //case 37: // left
        case 65: // a
        tiltLeft = true;
        break;

        //case 40: // down
        case 83: // s
        tiltBackward = true;
        break;

        //case 39: // right
        case 68: // d
        tiltRight = true;
        break;

    }
}