// var floor = null;
var marble = null;
var parent;
var roof;
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
    var floorGeometry = new THREE.BoxGeometry(12, 1, 12);
    floor = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);
    floor.__dirtyPosition = true;
    
    floor.__dirtyRotation = true;
    floor.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    floor.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    floor.geometry.computeBoundingBox();
    floor.receiveShadow = true;

    floor.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
    });
   

}

function createRoof() {
    var roofMaterial = new THREE.MeshPhongMaterial();
    roofMaterial.color = new THREE.Color(1, 1, 1);
    roofMaterial.transparent = false;
    roofMaterial.opacity = 0;
    var roofGeo = new THREE.BoxGeometry(12, 1, 12);
    roof = new Physijs.BoxMesh(roofGeo, roofMaterial, 0);
    roof.position.y = 2.78 ;
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
        console.log("marble");
    });
}

function createCube(w, h, d, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new Physijs.BoxMesh(geometry_cube, material, 0);
    square.castShadow=true;

    square.name="cubes";    

    square.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        console.log("square");
    });

    var readyHandler = function() {
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
    scene.add(parent);
    scene.add(marble);
    scene.add(ambientlight);
    scene.add(cameralight);
    scene.add(spotlight);
}