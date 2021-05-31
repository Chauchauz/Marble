/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var mesh = null;
var ambientlight;
var cameralight;

var floor = null;
var marble = null;
var shape = null;
var walls = [];

function addLight() {
    //add basic light from camera towards the scene
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    camera.add(cameralight);
    //add ambient light
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
}

//Create floor
function createFloor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2; 
    floor.geometry.computeBoundingBox();
}

//Create Marble
function createMarble() {
    var marbleMaterial = new THREE.MeshPhongMaterial();
    marbleMaterial.color = new THREE.Color(0xFFFFFF);
    marbleMaterial.wireframe = false;
    var marbleGeometry = new THREE.SphereGeometry(0.5, 20, 20);
    marble = new THREE.Mesh(marbleGeometry, marbleMaterial);
    //marble.position.set(0, 0.5, 0);
    marble.position.set(4.5, 0.5, -4.5);
}

//Create Wall
function createWall(x, y, z) {
    var wallMaterial = new THREE.MeshPhongMaterial();
    wallMaterial.color = new THREE.Color(0x00AAFF);
    wallMaterial.wireframe = false;
    var wallGeometry = new THREE.BoxGeometry(0.1, 1, 1);
    wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(x, y, z);
    return wall;
}

//Group Walls
function groupWalls() {
    const x = floor.geometry.boundingBox.getSize().x * 2 + 1;
    const y = floor.geometry.boundingBox.getSize().y;

    // //GRID of walls
    for (i = 0; i < x; i++) {
        walls[i] = new Array((i % 2 == 0) ? y : y + 1);
        for (j = 0; j < walls[i].length; j++) {
            walls[i][j] = createWall((i % 2 == 0) ? -4.5 + j : -5 + j, 0.5, 5 - i / 2);
            walls[i][j].rotation.y = (i % 2 == 0) ? Math.PI / 2 : Math.PI;
        }
    }
    
    //SAMPLE MAZE
    for (i = 2; i < 20; i+= 2) {
        for (j = 0; j < 10; j++) {
            walls[i][j] = null;
            walls[(j % 2 == 0) ? 19 : 1][j] = null;
        }
    }

    //OUTER BOX of walls
    // for (i = 0; i < y; i++) {
    //     walls[i] = createWall(-4.5 + i, 0.5, -5); //Top Wall
    //     walls[i].rotation.y =  Math.PI / 2;
    //     walls[i + y] = createWall(-5, 0.5, -4.5 + i); //Left Wall
    //     walls[i + 2 * y] = createWall(5, 0.5, -4.5 + i); //Right Wall
    //     walls[i + 3 * y] = createWall(-4.5 + i, 0.5, 5);
    //     walls[i + 3 * y].rotation.y =  Math.PI / 2; //Bottom Wall
    // }
}

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(marble);

    for (i = 0; i < walls.length; i++) {
        for (j = 0; j < walls[i].length; j++) {
            if (walls[i][j] != null) {
                scene.add(walls[i][j]);
            }
        }
    }

    // for (i = 0; i < walls.length; i++) {
    //     scene.add(walls[i]);
    // }

    scene.add(camera);
    scene.add(ambientlight);
}