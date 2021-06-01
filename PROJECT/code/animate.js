//INPUT DETECTION
var tiltForward = false;
var tiltLeft = false;
var tiltBackward = false;
var tiltRight = false;

//MARBLE MOVEMENT
var controlMode = "floor"; //Control either the FLOOR or MARBLE
const floorSpeed = 0.00005;
var marbleXVel = 0;
var marbleZVel = 0;
const acceleration = 0.00;

//COLLISION FUNCTION
var rightRay = new THREE.Raycaster();
var rightCollision = false;
var leftRay = new THREE.Raycaster();
var leftCollision = false;
var forwardRay = new THREE.Raycaster();
var forwardCollision = false;
var backRay = new THREE.Raycaster();
var backCollision = false;

//RAINBOW FUNCTION
var rainbow = true;
var red = 0;
var green = 0;
var blue = 0;
var colorState = 1; //Red = 1, Yellow = 2, Green = 3, Cyan = 4, Blue = 5, Magenta = 6
const colorSpeed = 0.025;

//GUI
var gui;

function animate() {
    scene.simulate();
    renderer.render(scene, camera);
    requestAnimationFrame(movement);
    //controls.update();


    requestAnimationFrame(animate);
}

var alpha = 0;
var dalpha = 1*Math.PI/1000;

function movement() {
    if (controlMode == "floor") {
        if (tiltForward && floor.rotation.x > -0.5) {
            floor.rotation.x -= floorSpeed;
            parent.rotation.x -= floorSpeed;
            floor.__dirtyPosition = true;
            floor.__dirtyRotation = true;
            parent.__dirtyPosition = true;
            parent.__dirtyRotation = true;

            // alpha += dalpha;
            // scene.traverse( function (node) {
            //     if (node instanceof Physijs.BoxMesh && node.name == "cubes") {
            //         // node.rotateOnWorldAxis(new THREE.Vector3(1,0,0), floorSpeed);
            //         node.position.y += -cubeSpeed * Math.cos(alpha/2);
            //         node.position.z += cubeSpeed * Math.sin(alpha/2);
            //         node.__dirtyPosition = true;
            //         node.__dirtyRotation = true;
                      
            //     }
            // }) 
        }
        if (tiltLeft && floor.rotation.z < 0.5) {
            floor.rotation.z += floorSpeed;
            parent.rotation.z += floorSpeed;
            floor.__dirtyPosition = true;
            floor.__dirtyRotation = true;
            parent.__dirtyPosition = true;
            parent.__dirtyRotation = true;
        }
        if (tiltBackward && floor.rotation.x < 0.5) {
            floor.rotation.x += floorSpeed;
            parent.rotation.x += floorSpeed;
            floor.__dirtyPosition = true;
            floor.__dirtyRotation = true;
            parent.__dirtyPosition = true;
            parent.__dirtyRotation = true;


            // alpha -= dalpha;
            // scene.traverse( function (node) {
            //     if (node instanceof Physijs.BoxMesh && node.name == "cubes") {
            //         // node.rotateOnWorldAxis(new THREE.Vector3(1,0,0), floorSpeed);
            //         node.position.y -= -cubeSpeed * Math.cos(alpha/2);
            //         node.position.z -= cubeSpeed * Math.sin(alpha/2);
            //         node.__dirtyPosition = true;
            //         node.__dirtyRotation = true;
                      
            //     }
            // })
        }
        if (tiltRight && floor.rotation.z > -0.5) {
            floor.rotation.z -= floorSpeed;
            parent.rotation.z -= floorSpeed;
             floor.__dirtyPosition = true;
             floor.__dirtyRotation = true;
             parent.__dirtyPosition = true;
            parent.__dirtyRotation = true;
        }
    }
    
    // if (controlMode == "marble") {
    //     //ACCELERATION
    //     if (tiltForward && marbleZVel > -0.1) { //-Z
    //         marbleZVel -= acceleration;
    //     }
    //     if (tiltLeft && marbleXVel > -0.1) { //-X
    //         marbleXVel -= acceleration;
    //     }
    //     if (tiltBackward && marbleZVel < 0.1) { //+Z
    //         marbleZVel += acceleration;
    //     }
    //     if (tiltRight && marbleXVel < 0.1) { //+X
    //         marbleXVel += acceleration;
    //     }

    //     //DECELERATION
    //     if (!tiltForward && !tiltBackward) {
    //         marbleZVel -= (marbleZVel > 0) ? acceleration / 2 : -acceleration / 2;

    //         if (marbleZVel != 0 && Math.abs(marbleZVel) <= acceleration) {
    //             marbleZVel = 0;
    //         }
    //     }
    //     if (!tiltLeft && !tiltRight) {
    //         marbleXVel -= (marbleXVel > 0) ? acceleration / 2 : -acceleration / 2;

    //         if (marbleXVel != 0 && Math.abs(marbleXVel) <= acceleration) {
    //             marbleXVel = 0;
    //         }
    //     }
    // }

    //Bounce off walls
    // marbleXVel = ((rightCollision || leftCollision) && Math.abs(marbleXVel) > 0.01) ? -marbleXVel / 2 : marbleXVel;
    // marbleZVel = ((forwardCollision || backCollision) && Math.abs(marbleZVel) > 0.01) ? -marbleZVel / 2 : marbleZVel;

    // //Move marble by velocity
    // marble.position.x += ((marbleXVel > 0 && !rightCollision) || (marbleXVel < 0 && !leftCollision)) ? marbleXVel : 0;
    // marble.position.z += ((marbleZVel > 0 && !backCollision) || (marbleZVel < 0 && !forwardCollision)) ? marbleZVel : 0;

    requestAnimationFrame(movement);
}

// function boardTilt() {
    
    

//     // add event listener to highlight dragged objects

//     controls.addEventListener( 'dragstart', function ( event ) {
//         console.log("start drag");
//     } );

//     controls.addEventListener( 'dragend', function ( event ) {
//         console.log("end drag");
//     } );

//     requestAnimationFrame(boardTilt);
// }

// function collision() {
//     rightRay.set(marble.position, new THREE.Vector3(1, 0, 0).normalize());
//     var rightIntersects = rightRay.intersectObjects(scene.children);
//     leftRay.set(marble.position, new THREE.Vector3(-1, 0, 0).normalize());
//     var leftIntersects = leftRay.intersectObjects(scene.children);
//     forwardRay.set(marble.position, new THREE.Vector3(0, 0, -1).normalize());
//     var forwardIntersects = forwardRay.intersectObjects(scene.children);
//     backRay.set(marble.position, new THREE.Vector3(0, 0, 1).normalize());
//     var backIntersects = backRay.intersectObjects(scene.children);

//     if (rightIntersects.length > 0) {
//         rightCollision = (rightIntersects[0].object.position.x - marble.position.x < 0.5) ? true : false;
//     }
//     if (leftIntersects.length > 0) {
//         leftCollision = (marble.position.x - leftIntersects[0].object.position.x < 0.5) ? true : false;
//     }
//     if (forwardIntersects.length > 0) {
//         forwardCollision = (marble.position.z - forwardIntersects[0].object.position.z < 0.5) ? true : false;
//     }
//     if (backIntersects.length > 0) {
//         backCollision = (backIntersects[0].object.position.z - marble.position.z < 0.5) ? true : false;
//     }
    
//     requestAnimationFrame(collision);
// }

function rainbowMarble() {
    if (rainbow) {
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
        requestAnimationFrame(rainbowMarble);
    }

    // marble.material.color = new THREE.Color(red, green, blue);
    // requestAnimationFrame(rainbowMarble);
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

// function buildGui() {
//     gui = new dat.GUI();

//     var spotLightFolder = gui.addFolder('Spotlight');
//     var spotLightParams = {
//         color: spotlight.color.getHex(),
//         intensity: spotlight.intensity
//     }

//     spotLightFolder.addColor(spotLightParams, 'color').onChange(function(val) {
//         spotlight.color.setHex(val);
//     })
//     spotLightFolder.add(spotLightParams, 'intensity', 0, 1).step(0.1).onChange(function(val) {
//         spotlight.intensity = val;
//     })

//     var ballFolder = gui.addFolder('Marble');
//     var ballParams = {
//         rainbow_color: rainbow,
//         color: marble.material.color.getHex()
//     }

//     ballFolder.add(ballParams, 'rainbow_color').listen().onChange(function(val) {
//         rainbow = val;

//         if (val) {
//             requestAnimationFrame(rainbowMarble);
//         }
//     })
//     ballFolder.addColor(ballParams, 'color').onChange(function(val) {
//         rainbow = false;
//         ballParams.rainbow_color = false;
//         cancelAnimationFrame(rainbowMarble);
//         marble.material.color.setHex(val);
//     })
    



//     // spotLightFolder.add(params, 'intensity', {Stopped: 0, medium: 0.5, strong: 1}).onChange(function(val) {
//     //     spotlight.intensity = val;
//     // })
//     ;

//     // gui.add(params, 'velocity_tissue',0,1).onChange(function(val){
//     //     velocity = val;
//     // });
//     gui.open();
//}