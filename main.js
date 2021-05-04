// Scene + Camera + Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true});
const loader = new THREE.TextureLoader();

var platforms = [];
// Delete item from platforms
// scene.remove( platforms[0] );
// platforms.shift();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#eee");
document.body.appendChild( renderer.domElement );
camera.position.z = 18;

// Resize canvas on resize window
window.addEventListener( 'resize', () => {
   let width = window.innerWidth;
   let height = window.innerHeight;
   renderer.setSize( width, height );
   camera.aspect = width / height;
   camera.updateProjectionMatrix();
})

var receptionistDeskBox = new THREE.BoxGeometry(5.2, 3, 2.5);
var receptionistDeskMaterial = new THREE.MeshStandardMaterial( { color: 0x583702, flatShading: true, metalness: 0, roughness: 1 });
var receptionistDesk = new THREE.Mesh ( receptionistDeskBox, receptionistDeskMaterial );
scene.add( receptionistDesk );
receptionistDesk.position.set(4.2, 2, 2.8);

// ambient light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2);
scene.add( ambientLight );

// point light
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

setInterval(() => { renderer.render( scene, camera ); }, 10)
renderer.render( scene, camera );

window.onresize = function() { renderer.render( scene, camera ); };

var controls = new THREE.OrbitControls(camera, renderer.domElement);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Create Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var wallColor = 0xeeeeee;
var floorImg = loader.load('https://squirrel-314.github.io/vegetable-dash/Images/Plots/plot.png');

createRoom();
function createRoom() {
   // Create platforms
   newSquare(-5.6, -5.6);
   newSquare(-2.8, -5.6);
   newSquare(0, -5.6);
   newSquare(2.8, -5.6);
   newSquare(5.6, -5.6);

   newSquare(-5.6, -2.8);
   newSquare(-2.8, -2.8);
   newSquare(0, -2.8);
   newSquare(2.8, -2.8);
   newSquare(5.6, -2.8);

   newSquare(-5.6, 0);
   newSquare(-2.8, 0);
   newSquare(0, 0);
   newSquare(2.8, 0);
   newSquare(5.6, 0);

   newSquare(-5.6, 2.8);
   newSquare(-2.8, 2.8);
   newSquare(0, 2.8);
   newSquare(2.8, 2.8);
   newSquare(5.6, 2.8);

   newSquare(-5.6, 5.6);
   newSquare(-2.8, 5.6);
   newSquare(0, 5.6);
   newSquare(2.8, 5.6);
   newSquare(5.6, 5.6);

   // Floor lines
   newFloorLine1(1.4);
   newFloorLine1(4.2);
   newFloorLine1(7.0);
   newFloorLine1(-1.4);
   newFloorLine1(-4.2);
   newFloorLine1(-7.0);

   newFloorLine2(1.4);
   newFloorLine2(4.2);
   newFloorLine2(7.0);
   newFloorLine2(-1.4);
   newFloorLine2(-4.2);
   newFloorLine2(-7.0);

   // Walls
   newWall(0, 7.5);
   newWall(2.8, 7.5);
   newWall(5.6, 7.5);
   newWall(-2.8, 7.5);
   newWall(-5.6, 7.5);

   newWall(0, -7.5);
   newWall(2.8, -7.5);
   newWall(5.6, -7.5);
   newWall(-2.8, -7.5);
   newWall(-5.6, -7.5);
}

function newSquare(distance, secondDistance) {
   var square = new THREE.BoxGeometry(2.5, .5, 2.5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, flatShading: true, metalness: 0, roughness: 1, map: floorImg, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   platforms.push(platformSquare);
   scene.add( platformSquare );
   platformSquare.position.set(distance, 0, secondDistance);
}
function newWall(distance, secondDistance) {
   var square = new THREE.BoxGeometry(2.5, 8, .5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: wallColor, flatShading: true, metalness: 0, roughness: 1 });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(distance, 4, secondDistance);
}
function newFloorLine1(distance) {
   var object = new THREE.BoxGeometry(.3, .5, 15);
   var material = new THREE.MeshStandardMaterial( { color: 0x222222, flatShading: true, metalness: 0, roughness: 1 });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(distance, 0, 0);
}
function newFloorLine2(distance) {
   var object = new THREE.BoxGeometry(15, .5, .3);
   var material = new THREE.MeshStandardMaterial( { color: 0x222222, flatShading: true, metalness: 0, roughness: 1 });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(0, 0, distance);
}
