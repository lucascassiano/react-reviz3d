import React from 'react';
import { storiesOf } from '@kadira/storybook';
//import { action } from '@storybook/addon-actions';
import * as THREE from 'three';
import { Container3d, CubeView } from './../src';
import './../src/css/style.css';

let cube;
let t = 0;
let mousePos = {
  x: 0,
  y: 0
};

window.addEventListener('mousemove', function(event) {
  var x = event.x;
  var y = event.y;
  mousePos = {
    x,
    y
  };
  //console.log(mousePos);
});

function setup(scene, camera, renderer) {
  var geometry = new THREE.BoxGeometry(5, 5, 5);
  var material = new THREE.MeshBasicMaterial({
    color: 0x0088aa
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function setup2(scene, camera, renderer) {
  var geometry = new THREE.SphereGeometry(3, 25, 25);
  var material = new THREE.MeshBasicMaterial({
    color: 0xf1c40f
  });
  var sun = new THREE.Mesh(geometry, material);
  sun.position.y = 10;
  sun.position.z = -10;

  scene.add(sun);

  var geometry2 = new THREE.BoxGeometry(18, 1, 18);
  var material2 = new THREE.MeshLambertMaterial({
    color: 0x2ecc71
  });
  var cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.y = -3.5;

  scene.add(cube2);
  cube2.castShadow = true; //default is false
  cube2.receiveShadow = true; //default
  cube2.material.shadowOpacity = 0.6;

  //light
  var light = new THREE.PointLight(0xf1c40f, 1, 100);
  light.position.set(sun.position.x, sun.position.y, sun.position.z);

  light.castShadow = true;
  light.shadow.darkness = 0.5;
  scene.add(light);

  scene.add(new THREE.AmbientLight(0x555555));

  var dir = new THREE.Vector3(-sun.position.x, -sun.position.y, -sun.position.z);

  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();

  var origin = new THREE.Vector3(sun.position.x, sun.position.y, sun.position.z);
  //origin.normalize();
  var length = 8;
  var hex = 0xf1c40f;

  var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);

  //light.shadowDarkness = 0.5;

  //trees
  var trees = Math.random() * 20 + 8;
  for (var i = 0; i < trees; i++) {
    var tree_geometry = new THREE.ConeGeometry(2, 5, 6);
    var tree_material = new THREE.MeshLambertMaterial({
      color: 0x16a085
    });
    tree_material.shadowOpacity = 0.6;
    var cone = new THREE.Mesh(tree_geometry, tree_material);
    cone.position.x = Math.random() * 10 - 5;
    cone.position.z = Math.random() * 10 - 5;
    cone.position.y = 0.6;
    scene.add(cone);
    cone.castShadow = true; //default is false
    cone.receiveShadow = true; //default
    var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 2, 6),
      new THREE.MeshLambertMaterial({
        color: 0x443322
      })
    );
    //trunk.position.x = cone.position.x;
    //trunk.position.z = cone.position.z;
    trunk.position.y = -3;

    cone.add(trunk);
    cone.objectType = 'tree';
  }
}

function update(scene, camera, renderer) {}

function setup3(scene, camera, renderer) {
  camera.position.set(0, -10, -10);
  //camera.lookAt(Vector3(0,0,0));
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var geometry = new THREE.BoxGeometry(5, 5, 5);

  var material = new THREE.MeshBasicMaterial({
    color: 0x0088aa
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = 0;
  scene.add(cube);
}

function onHoverStart(obj) {
  obj.originalColor = obj.material.color;
  obj.material = new THREE.MeshBasicMaterial({
    color: 0xf39c12
  });
}

function onHoverTreesStart(obj, scene) {
  console.log('begin hover object', obj);
  if (obj.objectType == 'tree') {
    obj.originalColor = obj.material.color;
    var outlineMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.BackSide
    });

    obj.material = new THREE.MeshBasicMaterial({
      color: 0xf39c12
    });
    obj.children[0].material = new THREE.MeshBasicMaterial({
      color: 0xf39c12
    });
  }
}

function onHoverTreesEnd(obj) {
  if (obj.objectType == 'tree') {
    obj.material = new THREE.MeshLambertMaterial({
      color: obj.originalColor
    });
    obj.material.castShadow = true;
    obj.material.receiveShadow = true;
    obj.children[0].material = new THREE.MeshLambertMaterial({
      color: 0x443322
    });
  }
}

function onHoverEnd(obj) {
  console.log('end hovering object', obj);
  if (obj.originalColor)
    obj.material = new THREE.MeshBasicMaterial({
      color: obj.originalColor
    });
}

function updateAngle(phi,theta){
  console.log(phi, theta);
}

storiesOf('Container3d', module)
  .add('with grid', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        addControls={true}
        marginBottom={110}
      />
    </div>
  ))

  .add('without grid', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        marginBottom={110}
        addGrid={false}
        addControls={true}
        setup={setup}
      />
    </div>
  ))

  .add('zoom disabled', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        onHoverStart={null}
        marginBottom={110}
        enableZoom={false}
        setup={setup3}
      />
    </div>
  ))

  .add('with Hover', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        marginBottom={110}
        enableZoom={false}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        addGrid={false}
        addControls={true}
        setup={setup}
        update={update}
      />
    </div>
  ))

  .add('Multiple objects', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        marginBottom={110}
        enableZoom={false}
        onHoverStart={onHoverTreesStart}
        onHoverEnd={onHoverTreesEnd}
        addGrid={false}
        addControls={true}
        setup={setup2}
        update={update}
        addLight={false}
      />
    </div>
  ))

  .add('Removed Lights', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        marginBottom={110}
        onHoverStart={onHoverTreesStart}
        onHoverEnd={onHoverTreesEnd}
        addGrid={false}
        setup={setup2}
        addControls={true}
        update={update}
        addLight={false}
      />
    </div>
  ))
  .add('Removed Controls', () => (
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={16 / 9}
        percentageWidth={'100%'}
        fitScreen
        marginBottom={110}
        onHoverStart={onHoverTreesStart}
        onHoverEnd={onHoverTreesEnd}
        setup={setup3}
        update={update}
        addLight={false}
        addControls={false}
      />
    </div>
  ))

  .add('onUpdateAngle', () => (
    <div>
    <div className="canvas-3d">
      <Container3d
        marginTop={30}
        aspect={1 / 1}
        percentageWidth={'50%'}
        marginBottom={110}
        enableZoom={false}
        onHoverStart={onHoverTreesStart}
        onHoverEnd={onHoverTreesEnd}
        addGrid={false}
        addControls={true}
        setup={setup}
        update={update}
        addLight={false}
        onUpdateAngles={updateAngle}
      />
    </div>
    </div>
  ));



var cubeview, container;

var updateAngles = (phi, theta) => {
	if(container)
	    container.setAngles(phi, theta);
};

var updateAngles2 = (phi, theta)=>{
    if(cubeview){
      cubeview.setAngles(phi, theta);
    }
}

//3D ui controllers
var getDomContainer = () =>{
	return ReactDOM.findDOMNode(container);
}

function getDomCube() {
	return ReactDOM.findDOMNode(cube);
}

storiesOf('CubeView', module)
	.add('simple', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={1} 
			hoverColor={0x0088ff} 
			cubeSize={2} 
			zoom={6} 
			antialias={false} 
			width={200}
			height={200}/>
		</div>
	))
	.add('bigger', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={1} 
			hoverColor={0x0088ff} 
			cubeSize={2} 
			zoom={6} 
			antialias={false} 
			width={500}
			height={500}/>
		</div>
	))
	.add('zoom out', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={1} 
			hoverColor={0x0088ff} 
			cubeSize={2} 
			zoom={12} 
			antialias={false} 
			width={500}
			height={500}/>
		</div>
	))
	.add('antialias On', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={1} 
			hoverColor={0x0088ff} 
			cubeSize={3} 
			zoom={6} 
			antialias={true} 
			width={500}
			height={500}/>
		</div>
	))
	.add('16:9 aspect', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={16/9} 
			hoverColor={0x0088ff} 
			cubeSize={2} 
			zoom={6} 
			antialias={true} 
			width={500}
			height={500}/>
		</div>
	))
	.add('custom hover color', () => (
		<div className="canvas-cube-view">
			<CubeView aspect={1} 
			hoverColor={0xff0000} 
			cubeSize={2} 
			zoom={6} 
			antialias={true} 
			width={500}
			height={500}/>
		</div>
  ));
  
  storiesOf('Container3d + cubeView', module).add('sync angles', () => (
		<div>
			<Container3d
				className="canvas-3d"
				percentageWidth={'100%'}
				fitScreen
				ref={c => (container = c)}
				marginBottom={30}
				addLight={true}
				addControls={true}
				addGrid={true}
				antialias={false}
        onUpdateAngles={updateAngles2}
			/>

			<div className="cube-view">
				<CubeView
					aspect={1}
					hoverColor={0x0088ff}
					cubeSize={2}
					ref={c => (cubeview = c)}
					zoom={6}
					antialias={false}
                    key={'cv'}
                    width={150}
                    height={150}
					onUpdateAngles={updateAngles}
				/>
			</div>
		</div>
	));

