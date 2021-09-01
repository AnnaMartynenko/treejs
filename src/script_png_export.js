//import './style.css'
///example from https://discourse.threejs.org/t/exporting-single-object-to-image/6865
import * as THREE from 'three'

let camera, scene1, scene2, renderer;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 5;

    scene1 = new THREE.Scene();
    scene2 = new THREE.Scene();

    const geometry = new THREE.BoxBufferGeometry();
    const material = new THREE.MeshNormalMaterial();

    const mesh1 = new THREE.Mesh( geometry, material );
    mesh1.position.x = 2;
    scene1.add( mesh1 );
    
    const mesh2 = new THREE.Mesh( geometry, material );
    mesh2.position.x = - 2;
    scene2.add( mesh2 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    //renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.autoClear = false;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // this renderer is only used for the export
    
    //const rendererExport = new THREE.WebGLRenderer( { antialias: true } );
    const rendererExport = new THREE.WebGLRenderer( {antialias: true , alpha: true } );
    rendererExport.setSize( window.innerWidth, window.innerHeight );
    rendererExport.setClearColor( 0x000000, 0 );
    const exportLink = document.getElementById( 'exportLink' );
    exportLink.addEventListener( 'click', () => {
    
    	rendererExport.render( scene1, camera ); // only export mesh1
      const dataURL = rendererExport.domElement.toDataURL( 'image/png' );
      
      exportLink.href = dataURL;
    	exportLink.download = "export.png";
    
    } );

}


function animate() {

    requestAnimationFrame( animate );
    renderer.clear();
    renderer.render( scene1, camera );
    renderer.render( scene2, camera );

}