import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//model
gltfLoader.load( 'simple_sedan.gltf', function ( gltf ) {
    gltf.scene.scale.set(1,1,1)
    gltf.scene.rotation.set(4.75,0,0)
	scene.add( gltf.scene );
    gui.add(gltf.scene.rotation,'x').min(0).max(9)
    gui.add(gltf.scene.rotation,'y').min(0).max(9)
    gui.add(gltf.scene.rotation,'z').min(0).max(9)

}, undefined, function ( error ) {

	console.error( error );

} );

// Lights

const spotLight = new THREE.SpotLight(0xffffff, 1, 1)
spotLight.position.x = 0
spotLight.position.y = 0
spotLight.position.z = 0.1
scene.add(spotLight)

const spotLight2 = new THREE.SpotLight(0xffffff,1, -1)
spotLight2.position.x = 0
spotLight2.position.y = 0
spotLight2.position.z = 0.1
scene.add(spotLight2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0.1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()