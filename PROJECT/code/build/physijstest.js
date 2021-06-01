// var floor = null;
var marble = null;

var ambientlight;
var cameralight;
var spotlight;
var spotLightHelper;

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
    // var floorGeometry = new THREE.PlaneGeometry(12, 12, 12, 12);
    var floorGeometry = new THREE.BoxGeometry(12, 1, 12);
    // floor = new Physijs.PlaneMesh(floorGeometry, floorMaterial);
    floor = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);
    // floor.rotation.x = Math.PI / 2;
    floor.__dirtyPosition = true;
    //mesh.position.set(0,90,180);
    floor.__dirtyRotation = true;
    floor.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    floor.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    floor.geometry.computeBoundingBox();
    floor.receiveShadow = true;


}

//Create Marble
function createMarble() {
    var marbleMaterial = new THREE.MeshPhongMaterial();
    marbleMaterial.color = new THREE.Color(0x000000);
    marbleMaterial.wireframe = false;
    var marbleGeometry = new THREE.SphereGeometry(0.5, 20, 20);
    marble = new Physijs.SphereMesh(marbleGeometry, marbleMaterial);
    marble.position.y = 2;
    // marble.__dirtyPosition = true;
    // marble.__dirtyRotation = true;
    // marble.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    // marble.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    // marble.position.x = 9;
    // marble.castShadow = true;

    marble.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        console.log("marble");
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
    });
}

function createCube(w, h, d, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new Physijs.BoxMesh(geometry_cube, material);

    var tra = new THREE.Matrix4();
    var combined = new THREE.Matrix4();
    tra.makeTranslation(2, 2, 2);
    combined.multiply(tra);
    square.applyMatrix(combined);

    square.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        console.log("square");
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
    });

    var readyHandler = function() {
        // object has been added to the scene
        console.log("added");
    };
    square.addEventListener( 'ready', readyHandler );
    return square;
}

function addShapes() {
    scene.add(floor);
    scene.add(marble);
    scene.add(ambientlight);
    scene.add(cameralight);
    scene.add(spotlight);
    scene.add(createCube(1, 1, 1, 'skyblue'));
}