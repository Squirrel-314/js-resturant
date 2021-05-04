/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Minimum
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true});
const loader = new THREE.TextureLoader();

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


setInterval(() => { renderer.render( scene, camera ); }, 10)
renderer.render( scene, camera );

window.onresize = function() { renderer.render( scene, camera ); };

var controls = new THREE.OrbitControls(camera, renderer.domElement);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lights
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var ambientLight = new THREE.AmbientLight ( 0x404040, 2 );
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0xffffff, .5 );
pointLight.position.set( 0, 50, 0 );
scene.add( pointLight );

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Room
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var platforms = [];
// Delete item from platforms
// scene.remove( platforms[0] );
// platforms.shift();

var wallColor = 0xeeeeee;
var floorImg = loader.load('https://squirrel-314.github.io/vegetable-dash/Images/Plots/plot.png');
var wallpaper;

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
   newWall1(0, 7.5);
   newWall1(2.8, 7.5);
   newWall1(5.6, 7.5);
   newWall1(-2.8, 7.5);
   newWall1(-5.6, 7.5);

   newWall1(0, -7.5);
   newWall1(2.8, -7.5);
   newWall1(5.6, -7.5);
   newWall1(-2.8, -7.5);
   newWall1(-5.6, -7.5);

   // newWall2(0, 7.5);
   newWall2(2.8, 7.5);
   newWall2(5.6, 7.5);
   newWall2(-2.8, 7.5);
   newWall2(-5.6, 7.5);

   newWall2(0, -7.5);
   newWall2(2.8, -7.5);
   newWall2(5.6, -7.5);
   newWall2(-2.8, -7.5);
   newWall2(-5.6, -7.5);

   newDesk();
   newClock();
}

function newSquare(distance, secondDistance) {
   var square = new THREE.BoxGeometry(2.5, .5, 2.5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, flatShading: true, metalness: 0, roughness: 1, map: floorImg, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   platforms.push(platformSquare);
   scene.add( platformSquare );
   platformSquare.position.set(distance, 0, secondDistance);
}
function newWall1(distance, secondDistance) {
   var square = new THREE.BoxGeometry(2.8, 8, .5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: wallColor, flatShading: true, metalness: 0, roughness: 1, map: wallpaper, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(distance, 4, secondDistance);
}
function newWall2(distance, secondDistance) {
   var square = new THREE.BoxGeometry(.5, 8, 2.8);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: wallColor, flatShading: true, metalness: 0, roughness: 1, map: wallpaper, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(secondDistance, 4, distance);
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
function newDesk() {
   var receptionistDeskBox = new THREE.BoxGeometry(5.2, 3, 2.5);
   var receptionistDeskMaterial = new THREE.MeshStandardMaterial( { color: 0x583702, flatShading: true, metalness: 0, roughness: 1 });
   var receptionistDesk = new THREE.Mesh ( receptionistDeskBox, receptionistDeskMaterial );
   scene.add( receptionistDesk );
   receptionistDesk.position.set(4.2, 2, 2.8);
}
function newClock() {
   var object = new THREE.CylinderGeometry(1.8, 1.8, .6, 200);
   var material = new THREE.MeshStandardMaterial( { color: 0xb9a7f4, flatShading: true, metalness: 0, roughness: 1, map: loader.load('https://squirrel-314.github.io/js-resturant/Images/clock.png') });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(7, 5.5, -4);
   result.rotation.set(1.6, 0, 1.6);
}
