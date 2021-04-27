var tiltForward = false;
var tiltLeft = false;
var tiltBackward = false;
var tiltRight = false;

var controlMode = "marble"; //Control either the FLOOR or MARBLE
const floorSpeed = 0.01;
var marbleXVel = 0.1;
var marbleZVel = 0.1;

var red = 1;
var green = 0;
var blue = 0;

var colorState = 1; //Red = 1, Yellow = 2, Green = 3, Cyan = 4, Blue = 5, Magenta = 6
const colorSpeed = 0.025;

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);

    if (controlMode == "floor") {
        if (tiltForward && floor.rotation.x > 2 * Math.PI / 5) {
            floor.rotation.x -= floorSpeed;
        }
        if (tiltLeft && floor.rotation.y < Math.PI / 10) {
            floor.rotation.y += floorSpeed;
        }
        if (tiltBackward && floor.rotation.x < 3 * Math.PI / 5) {
            floor.rotation.x += floorSpeed;
        }
        if (tiltRight && floor.rotation.y > -1 * Math.PI / 10) {
            floor.rotation.y -= floorSpeed;
        }
    }
    else if (controlMode == "marble") {
        if (tiltForward && marble.position.z >= -4.5) {
            marble.position.z -= marbleZVel;
        }
        if (tiltLeft && marble.position.x >= -4.5) {
            marble.position.x -= marbleXVel;
        }
        if (tiltBackward && marble.position.z <= 4.5) {
            marble.position.z += marbleZVel;
        }
        if (tiltRight && marble.position.x <= 4.5) {
            marble.position.x += marbleXVel;
        }
    }
}

function rainbow() {
    if (colorState == 1) {
        green += colorSpeed;
        if (green >= 1) {
            colorState = 2;
        }
    }
    else if (colorState == 2) {
        red -= colorSpeed;
        if (red <= 0) {
            colorState = 3;
        }
    }
    else if (colorState == 3) {
        blue += colorSpeed;
        if (blue >= 1) {
            colorState = 4;
        }
    }
    else if (colorState == 4) {
        green -= colorSpeed;
        if (green <= 0) {
            colorState = 5;
        }
    }
    else if (colorState == 5) {
        red += colorSpeed;
        if (red >= 1) {
            colorState = 6;
        }
    }
    else if (colorState == 6) {
        blue -= colorSpeed;
        if (blue <= 0) {
            colorState = 1;
        }
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