import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// Scene + Camera + Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true});

renderer.setSize( window.innerWidth, window.innerHeight );
// sets renderer background color
renderer.setClearColor("#eee");
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

// resize canvas on resize window
window.addEventListener( 'resize', () => {
   let width = window.innerWidth;
   let height = window.innerHeight;
   renderer.setSize( width, height );
   camera.aspect = width / height;
   camera.updateProjectionMatrix();
})

// basic cube
var geometry = new THREE.CylinderGeometry(1.5, 1.5, .2, 500);
var material = new THREE.MeshStandardMaterial( { color: 0xe351d1, flatShading: true, metalness: 0, roughness: 1 });
var cube = new THREE.Mesh ( geometry, material );
scene.add( cube );

cube.position.set(-3, 0, 0);
cube.rotation.set(50, 0, 25);

newSquare(0);
newSquare(2.8);
newSquare(5.6);
function newSquare(distance) {
   var square = new THREE.BoxGeometry(2.5, .5, 2.5);
   var sqaureMaterial = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, flatShading: true, metalness: 0, roughness: 1 });
   var platformSquare = new THREE.Mesh ( square, sqaureMaterial );
   scene.add( platformSquare );
   platformSquare.position.set(distance, 0, 0);
   platformSquare.rotation.set(.25, 0, 0);
}

// ambient light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2);
scene.add( ambientLight );

// point light
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

// const geometryOther = new THREE.BoxGeometry(3, 1, 3);
// const materialOther = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
// const mesh = new THREE.Mesh(geometryOther, materialOther);
//
// scene.add(mesh);
//
// mesh.position.set(2, 0, 0);
// mesh.rotation.set((15 / 180) * Math.PI, 2, 0);

setInterval(() => { renderer.render( scene, camera ); }, 500)
renderer.render( scene, camera );

window.onresize = function() { renderer.render( scene, camera ); };


// var CameraControl = (function () {
//     function CameraControl(renderer, camera, updateCallback) {
//         var _this = this;
//         this.camera = camera;
//         this.zoomMode = false;
//         this.press = false;
//         this.sensitivity = 0.02;
//         renderer.domElement.addEventListener('mousemove', function (event) {
//             if (!_this.press) {
//                 return;
//             }
//             if (event.button == 0) {
//                 camera.position.y -= event.movementY * _this.sensitivity;
//                 camera.position.x -= event.movementX * _this.sensitivity;
//             }
//             else if (event.button == 2) {
//                 camera.quaternion.y -= event.movementX * _this.sensitivity / 10;
//                 camera.quaternion.x -= event.movementY * _this.sensitivity / 10;
//             }
//             updateCallback();
//         });
//         renderer.domElement.addEventListener('mousedown', function () { _this.press = true; });
//         renderer.domElement.addEventListener('mouseup', function () { _this.press = false; });
//         renderer.domElement.addEventListener('mouseleave', function () { _this.press = false; });
//         document.addEventListener('keydown', function (event) {
//             if (event.key == 'Shift') {
//                 _this.zoomMode = true;
//             }
//         });
//         document.addEventListener('keyup', function (event) {
//             if (event.key == 'Shift') {
//                 _this.zoomMode = false;
//             }
//         });
//         renderer.domElement.addEventListener('mousewheel', function (event) {
//             if (_this.zoomMode) {
//                 camera.fov += event.wheelDelta * _this.sensitivity;
//                 camera.updateProjectionMatrix();
//             }
//             else {
//                 camera.position.z += event.wheelDelta * _this.sensitivity;
//             }
//             updateCallback();
//         });
//     }
//     return CameraControl;
// }());
// this.cameraControl = new CameraControl(renderer, camera, function () {
//     // you might want to rerender on camera update if you are not rerendering all the time
//     window.requestAnimationFrame(function () { return renderer.render(scene, camera); });
// });
//
// controls = new THREE.OrbitControls( camera, renderer.domElement );
