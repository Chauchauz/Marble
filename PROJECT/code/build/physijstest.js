// var floor = null;
var marble = null;
var parent;
//var wall;
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
    spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 1);
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
    floor.__dirtyPosition = true;
    
    floor.__dirtyRotation = true;
    floor.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    floor.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    floor.geometry.computeBoundingBox();
    floor.receiveShadow = true;

    floor.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        console.log("floor");
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
    });
   

}

//Create Marble
function createMarble() {
    var marbleMaterial = new THREE.MeshPhongMaterial();
    marbleMaterial.color = new THREE.Color(0x000000);
    marbleMaterial.wireframe = false;
    var marbleGeometry = new THREE.SphereGeometry(0.35, 15, 15);
    marble = new Physijs.SphereMesh(marbleGeometry, marbleMaterial);
    marble.position.x = -5.5;
    marble.position.y = 1;
    marble.position.z = -4.5;
    marble.castShadow=true;
    


    marble.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        console.log("marble");
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
    });
}

// function createWall(x, y, z) {
//     var wallMaterial = new THREE.MeshPhongMaterial();
//     wallMaterial.color = new THREE.Color(0x00AAFF);
//     wallMaterial.wireframe = false;
//     var wallGeometry = new THREE.BoxGeometry(0.1, 1, 1);
//     wall = new Physijs.BoxMesh(wallGeometry, marbleMaterial);
//     //wall = new THREE.Mesh(wallGeometry, wallMaterial);
//     wall.position.set(x, y, z);
//     wall.castShadow=true;
//     return wall;
// }


function createCube(w, h, d, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new Physijs.BoxMesh(geometry_cube, material, 0);
    square.castShadow=true;

    square.name="cubes";    

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
    parent = createCube(1, 1, 1, 'skyblue');
    for (let j = 0; j < n; j++){
        for (let i = 0; i < n; i++) {
            if(array[i][j] == 0){
                var sca = new THREE.Matrix4();
                var tra = new THREE.Matrix4();
                var combined = new THREE.Matrix4();
                
                sca.makeScale(1, 1 , 1);
                tra.makeTranslation(((i)-5.5), 1, ((j)-5.5));
                combined.multiply(tra);
                combined.multiply(sca);

                var color = new THREE.Color(0xffffff);
                color.setHex(Math.random() * 0xffffff);
                cubes[i] = createCube(1, 1, 1, color);
                cubes[i].applyMatrix4(combined);
                parent.add(cubes[i]);

            }
        }
    }
}

function addShapes() {
    scene.add(floor);
    //scene.add(wall);
    scene.add(parent);
    scene.add(marble);
    scene.add(ambientlight);
    scene.add(cameralight);
    scene.add(spotlight);
}