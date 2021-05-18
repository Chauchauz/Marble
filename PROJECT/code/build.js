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

PrismGeometry = function ( vertices, height ) {

    var Shape = new THREE.Shape();

    ( function f( ctx ) {

        ctx.moveTo( vertices[0].x, vertices[0].y );
        for (var i=1; i < vertices.length; i++) {
            ctx.lineTo( vertices[i].x, vertices[i].y );
        }
        ctx.lineTo( vertices[0].x, vertices[0].y );

    } )( Shape );

    var settings = { };
    settings.amount = height;
    settings.bevelEnabled = false;
    THREE.ExtrudeGeometry.call( this, Shape, settings );

};

PrismGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );

var A = new THREE.Vector2( 0, 0 );
var B = new THREE.Vector2( 30, 10 );
var C = new THREE.Vector2( 20, 50 );

var height = 12;                   
var geometry = new PrismGeometry( [ A, B, C ], height ); 

var material = new THREE.MeshPhongMaterial( { color: 0x00b2fc, specular: 0x00ffff, shininess: 20 } );

var prism1 = new THREE.Mesh( geometry, material );
prism1.rotation.x = -Math.PI  /  2;

scene.add( prism1 );

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(marble);
    scene.add(camera);
    scene.add(ambientlight);
    scene.add(cube);
}

