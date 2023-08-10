function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import { useEffect, useCallback, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
var box = new THREE.Box3();

function getSize(object) {
  box.setFromObject(object);
  return box.getSize(new THREE.Vector3());
}

function getCenter(object) {
  box.setFromObject(object);
  return box.getCenter(new THREE.Vector3());
}

function useScene(canvas, backgroundColor, isRotation, rotationAxis) {
  var sceneRef = useRef();
  var rendererRef = useRef();
  var cameraRef = useRef();
  var timer = useRef();
  var mixer = useRef();
  var model = useRef();
  var isRotationRef = useRef(isRotation || false);
  var clock = useMemo(function () {
    return new THREE.Clock();
  }, []);
  var render = useCallback(function () {
    var _rendererRef$current;

    (_rendererRef$current = rendererRef.current) === null || _rendererRef$current === void 0 ? void 0 : _rendererRef$current.render(sceneRef.current, cameraRef.current);
  }, []);
  useEffect(function () {
    var _canvas$current = canvas.current,
        offsetHeight = _canvas$current.offsetHeight,
        offsetWidth = _canvas$current.offsetWidth;
    var camera = new THREE.PerspectiveCamera(45, offsetWidth / offsetHeight, 0.01, 100000);
    cameraRef.current = camera;
    camera.up.set(0, 1, 0);
    camera.position.set(0, 0, 0);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor || 0xbbbbbb);
    sceneRef.current = scene;
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(offsetWidth, offsetHeight); // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1;
    // renderer.outputEncoding = THREE.sRGBEncoding;

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop

    controls.update();
    return function () {
      cancelAnimationFrame(timer.current);
      scene.clear();
      renderer.dispose();
      controls.dispose();
    };
  }, []);
  var add2Scene = useCallback(function (scene) {
    var _sceneRef$current;

    var distance = getSize(scene).length();
    var center = getCenter(scene);
    model.current = scene;

    if (scene.animations[0]) {
      mixer.current = new THREE.AnimationMixer(scene);
      var action = mixer.current.clipAction(scene.animations[0]);
      action.play();
    }

    cameraRef.current && (cameraRef.current.position.z = distance);
    scene.position.copy(center.negate());
    (_sceneRef$current = sceneRef.current) === null || _sceneRef$current === void 0 ? void 0 : _sceneRef$current.add(scene);
  }, []);
  var animate = useCallback(function () {
    var _mixer$current;

    timer.current = requestAnimationFrame(animate);
    var delta = clock.getDelta();
    (_mixer$current = mixer.current) === null || _mixer$current === void 0 ? void 0 : _mixer$current.update(delta);

    if (isRotationRef.current && model.current) {
      model.current.rotation[rotationAxis || 'y'] += delta * 0.5;
    }

    render();
  }, []);
  var setProps = useCallback(function (_ref) {
    var isRotation = _ref.isRotation,
        backgroundColor = _ref.backgroundColor;

    if (_typeof(isRotation) !== undefined) {
      isRotationRef.current = isRotation || false;
    }

    if (backgroundColor && sceneRef.current) {
      sceneRef.current.background = new THREE.Color(backgroundColor);
    }
  }, []);
  return {
    add2Scene: add2Scene,
    scene: sceneRef,
    renderer: rendererRef,
    render: render,
    animate: animate,
    setProps: setProps
  };
}

export default useScene;