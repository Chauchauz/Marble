/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var mesh = null;
var ambientlight;
var cameralight;
var spotlight;
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
    var floorGeometry = new THREE.PlaneGeometry(12, 12, 12, 12);
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
    marble.position.y = 0.5;
    marble.position.x = 9;
    marble.castShadow = true;
}

//Create Wall
function createWall(x, y, z) {
    var wallMaterial = new THREE.MeshPhongMaterial();
    wallMaterial.color = new THREE.Color(0x00AAFF);
    wallMaterial.wireframe = false;
    var wallGeometry = new THREE.BoxGeometry(0.1, 2, 1);
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
        walls[i] = createWall(-5.5 + i, 0.5, -6); //Top Wall
        walls[i].rotation.y =  Math.PI / 2;
        walls[i + x] = createWall(-6, 0.5, -5.5 + i); //Left Wall
        walls[i + 2 * x] = createWall(6, 0.5, -5.5 + i); //Right Wall
        walls[i + 3 * x] = createWall(-5.5 + i, 0.5, 6);
        walls[i + 3 * x].rotation.y =  Math.PI / 2; //Bottom Wall
    }
}

function createCube(w, h, d, color) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new THREE.Mesh(geometry_cube, material);
    return square;
}


//create maze
var array = [];
array[0] = [0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0];
array[1] = [0 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0];
array[2] = [0 ,1 ,1 ,1 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0];
array[3] = [0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,0];
array[4] = [0 ,0 ,0 ,1 ,1 ,1, 1 ,0 ,1 ,0 ,1 ,0];
array[5] = [0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,0];
array[6] = [0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,0];
array[7] = [0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,1 ,0];
array[8] = [0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,1 ,0];
array[9] = [0 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0];
array[10] = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0];
array[11] = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0];
var n = 12;
var cubes = [];
var group = new THREE.Group();

function createShapes(){
    for (let j = 0; j < n; j++){
        for (let i = 0; i < n; i++) {
            if(array[i][j] == 0){
                var sca = new THREE.Matrix4();
                var tra = new THREE.Matrix4();
                var combined = new THREE.Matrix4();
                
                sca.makeScale(1, 1 , 1);
                tra.makeTranslation(((i)-5.5), 0.6, ((j)-5.5));
                combined.multiply(tra);
                combined.multiply(sca);

                var color = new THREE.Color(0xffffff);
                color.setHex(Math.random() * 0xffffff);
                cubes[i] = createCube(1, 1, 1, color);
                cubes[i].applyMatrix(combined);
                group.add(cubes[i]);

            }
        }
    }
}

function generateMaze() {
    var maze = new Array(12);

    for (var i = 0; i < maze.length; i++) {
        maze[i] = new Array(12);
    }

    var starting_side = Math.floor(Math.random() * 2);
    var starting_ind = Math.floor(Math.random() * 12);
    var ending_ind = starting_ind > 5 ? Math.floor(Math.random() * 6) : Math.floor((Math.random() * 6) + 6);

    var starting_pos;

    switch (starting_side) {
        case 0:
            starting_pos = maze[0][starting_ind];
            ending_pos = maze[11][ending_ind];
            break;
        case 1:
            starting_pos = maze[starting_ind][0];
            ending_pos = maze[ending_ind][11]
            break;
    }
    
    
    console.log(starting_side);
    console.log(starting_ind);
    console.log(ending_ind);
    console.log(starting_pos);
}

function test() {
    
}

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(marble);
    scene.add(group);

    // for (i = 0; i < walls.length; i++) {
    //     for (j = 0; j < walls[i].length; j++) {
    //         scene.add(walls[i][j]);
    //     }
    // }

    // for (i = 0; i < walls.length; i++) {
    //     scene.add(walls[i]);
    // }

    scene.add(camera);
    scene.add(ambientlight);
    scene.add(spotlight);
    scene.add(spotLightHelper);
}