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
camera.position.z = 8;

// Resize canvas on resize window
window.addEventListener( 'resize', () => {
   let width = window.innerWidth;
   let height = window.innerHeight;
   renderer.setSize( width, height );
   camera.aspect = width / height;
   camera.updateProjectionMatrix();
})

function deg(degree) { return degree * (Math.PI/180); }

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
var floorImg = loader.load('https://v1.nitrocdn.com/snDxVfBRHMQMIThQzFNPrEKuMHQNnVWM/assets/static/optimized/rev-6e5321e/wp-content/gallery/slate-and-quartzite-natural-stone-tile/thumbs/thumbs_1-Shimmer-Grey-Quartzite.jpg');
var wallpaper;

createRoom();
function createRoom() {
   // Create platforms
   newSquare(0, 0);
   // newSquare(0, 5.8);
   // newSquare(0, -5.8);
   // newSquare(5.8, 0);
   // newSquare(-5.8, 0);
   // newSquare(5.8, 5.8);
   // newSquare(-5.8, -5.8);
   // newSquare(5.8, -5.8);
   // newSquare(-5.8, 5.8);

   // Floor lines
   // newFloorLine1(2.9);
   // newFloorLine1(8.7);
   // newFloorLine1(-2.9);
   // newFloorLine1(-8.7);
   //
   // newFloorLine2(2.9);
   // newFloorLine2(8.7);
   // newFloorLine2(-2.9);
   // newFloorLine2(-8.7);

   // Walls
   // newWall1(0, 9);
   // newWall1(5.5, 9);
   // newWall1(-5.5, 9);
   // newWall1(0, -9);
   // newWall1(5.5, -9);
   // newWall1(-5.5, -9);
   //
   // newWall2(0, 9);
   // newWall2(5.5, 9);
   // newWall2(-5.5, 9);
   // newWall2(0, -9);
   // newWall2(5.5, -9);
   // newWall2(-5.5, -9);

   // Wall line
   // newWallLine(8.8, 8.8);
   // newWallLine(-8.8, -8.8);
   // newWallLine(-8.8, 8.8);
   // newWallLine(8.8, -8.8);

   // Miscellaneous items
   newCountertop();
   newPot();
}

function newSquare(distance, secondDistance) {
   var square = new THREE.BoxGeometry(5, .5, 5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, flatShading: true, metalness: 0, roughness: 1, map: floorImg, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   platforms.push(platformSquare);
   scene.add( platformSquare );
   platformSquare.position.set(distance, 0, secondDistance);
}
function newWall1(distance, secondDistance) {
   var square = new THREE.BoxGeometry(5.8, 8, .5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: wallColor, flatShading: true, metalness: 0, roughness: 1, map: wallpaper, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(distance, 4, secondDistance);
}
function newWall2(distance, secondDistance) {
   var square = new THREE.BoxGeometry(.5, 8, 5.8);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: wallColor, flatShading: true, metalness: 0, roughness: 1, map: wallpaper, });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(secondDistance, 4, distance);
}
function newFloorLine1(distance) {
   var object = new THREE.BoxGeometry(.8, .5, 18);
   var material = new THREE.MeshStandardMaterial( { color: 0x222222, flatShading: true, metalness: 0, roughness: 1 });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(distance, 0, 0);
}
function newFloorLine2(distance) {
   var object = new THREE.BoxGeometry(18, .5, .8);
   var material = new THREE.MeshStandardMaterial( { color: 0x222222, flatShading: true, metalness: 0, roughness: 1 });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(0, 0, distance);
}
function newWallLine(num1, num2) {
   var object = new THREE.BoxGeometry(1, 8, 1);
   var material = new THREE.MeshStandardMaterial( { color: 0xeeeeee, flatShading: true, metalness: 0, roughness: 1 });
   var result = new THREE.Mesh ( object, material );
   scene.add( result );
   result.position.set(num1, 4, num2);
}
function newCountertop() {
   var countertopShape = new THREE.BoxGeometry(4, 3, 4);
   var countertopMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness: 0, roughness: 5, map: loader.load('https://images.freecreatives.com/wp-content/uploads/2016/01/Dark-Wood-Texture-for-Free-Download.jpg') });
   var countertop = new THREE.Mesh ( countertopShape, countertopMaterial );
   scene.add( countertop );
   countertop.position.set(0, 1.5, 0);
}
function newPot() {
   function potHandle(pos) {
      var potHandleShape = new THREE.TorusGeometry( .5, .15, 50, 50 );
      var potHandleMaterial = new THREE.MeshStandardMaterial( { color: 0x222222, flatShading: true, metalness: 0 });
      var potHandle = new THREE.Mesh (  potHandleShape, potHandleMaterial );
      potHandle.position.set(pos, 4.5, 0);
      potHandle.rotation.x = deg(90);
      scene.add( potHandle );
   }
   potHandle(1.45);
   potHandle(-1.45);

   var potShape = new THREE.CylinderGeometry(1.5, 1.5, 2, 20);
   var potMaterial = new THREE.MeshStandardMaterial( { color: 0x444444, flatShading: true, metalness: 0, roughness: 1 });
   var pot = new THREE.Mesh ( potShape, potMaterial );
   pot.position.set(0, 4, 0);
   scene.add( pot );
}

document.body.onmouseover = raycast(event)

function raycast (e) {
// Step 1: Detect light helper
    //1. sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );

    //3. compute intersections (note the 2nd parameter)
    var intersects = raycaster.intersectObjects( scene.children, true );

    for ( var i = 0; i < intersects.length; i++ ) {
        console.log( intersects[ i ] );
        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
    }
// Step 2: Detect normal objects
    //1. sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );

    //3. compute intersections (no 2nd parameter true anymore)
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        console.log( intersects[ i ] );
        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
    }

}
