/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var mesh = null;
var ambientlight;
var cameralight;
var dLight;
var spotlight;
var helper;
var spotLightHelper;

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

    // add directionalLight
    dLight = new THREE.DirectionalLight(new THREE.Color(0,1,1), 0.2);
    dLight.position.set(10,10,-5);
    dLight.castShadow = true;
    dLight.shadow.mapSize.x = 296;
    dLight.shadow.mapSize.y = 296;

    dLight.shadow.camera.left = -10;
    dLight.shadow.camera.right = 10;
    dLight.shadow.camera.top = 10;
    dLight.shadow.camera.bottom = -10;
    dLight.shadow.radius = 8;
    helper = new THREE.DirectionalLightHelper( dLight, 5 );

    // add spotlight
    spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.position.y = 10;
    spotlight.position.x = 10;
    spotlight.position.z = -8;
    spotlight.castShadow = true;
    spotlight.penumbra = 0;

    spotLightHelper = new THREE.SpotLightHelper( spotlight );

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
    floor.receiveShadow = true;
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
    marble.castShadow = true;
}

//Create Wall
function createWall(x, y, z) {
    var wallMaterial = new THREE.MeshPhongMaterial();
    wallMaterial.color = new THREE.Color(0x00AAFF);
    wallMaterial.wireframe = false;
    var wallGeometry = new THREE.BoxGeometry(0.1, 1, 1);
    wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(x, y, z);
    wall.castShadow=true;
    return wall;
}

//Group Walls
function groupWalls() {
    const x = floor.geometry.boundingBox.getSize().x;
    const y = floor.geometry.boundingBox.getSize().y * 2 + 1;

    //GRID of walls
    // for (i = 0; i < x; i++) {
    //     walls[i] = new Array(y);
    //     for (j = 0; j < walls[i].length; j++) {
    //         walls[i][j] = createWall((j % 2 == 0) ? -4.5 + i : -5 + i, 0.5, 5 - j / 2);
    //         walls[i][j].rotation.y = (j % 2 == 0) ? Math.PI / 2 : Math.PI;
    //     }
    // }

    //OUTER BOX of walls
    for (i = 0; i < x; i++) {
        walls[i] = createWall(-4.5 + i, 0.5, -5); //Top Wall
        walls[i].rotation.y =  Math.PI / 2;
        walls[i + x] = createWall(-5, 0.5, -4.5 + i); //Left Wall
        walls[i + 2 * x] = createWall(5, 0.5, -4.5 + i); //Right Wall
        walls[i + 3 * x] = createWall(-4.5 + i, 0.5, 5);
        walls[i + 3 * x].rotation.y =  Math.PI / 2; //Bottom Wall
    }
}

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(marble);

    // for (i = 0; i < walls.length; i++) {
    //     for (j = 0; j < walls[i].length; j++) {
    //         scene.add(walls[i][j]);
    //     }
    // }

    for (i = 0; i < walls.length; i++) {
        scene.add(walls[i]);
    }

    scene.add(camera);
    scene.add(ambientlight);
    // scene.add(dLight);
    // scene.add( helper );
    scene.add(spotlight);
    scene.add(spotLightHelper);
}