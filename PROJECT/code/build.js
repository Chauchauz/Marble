/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var mesh = null;
var ambientlight;
var cameralight;
var floor = null;
var marble = null;
var cube = null;

//Define a function that loads any PLY model 
function loadModel(model) {

}

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
}

//Create Marble
function createMarble() {
    var marbleMaterial = new THREE.MeshPhongMaterial();
    marbleMaterial.color = new THREE.Color(0xFF00FF);
    marbleMaterial.wireframe = false;
    var marbleGeometry = new THREE.SphereGeometry(0.5, 20, 20);
    marble = new THREE.Mesh(marbleGeometry, marbleMaterial);
    marble.position.y = 0.5;
}

//Create Cube 

function createCube()
{
    var cubeMaterial = new THREE.MeshPhongMaterial();
    cubeMaterial.color = new THREE.Color(0xFF00FF);
    cubeMaterial.wireframe = false;
    var cubeGeometry = new THREE.BoxGeometry(1,1,1);
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 10;
}

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(marble);
    scene.add(camera);
    scene.add(ambientlight);
    scene.add(cube);
}

