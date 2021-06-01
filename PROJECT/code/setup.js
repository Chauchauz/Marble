var scene;
var camera;
var renderer;
var controls;

var floor = null;

Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';


//Setup the 3 main components: scene, camera, renderer
function setScene() {

    
    scene = new Physijs.Scene();
    scene.background = new THREE.Color('black');

    var bgTexture = new THREE.TextureLoader().load("code/background.jpg");
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;

    scene.addEventListener( 'update', function() {
    });

    
    var ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    camera.position.set(0, 27, 15);
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
}

//Resize the scene and update the camera aspect to the screen ration
var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};

function clearScene() {
    for (let i = scene.children.length - 1; i >= 0; i--)
        if (scene.children[i].type === "Mesh")
            scene.remove(scene.children[i]);
}