import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from "../useScene";

function GLTF(_ref, ref) {
  var src = _ref.src,
      backgroundColor = _ref.backgroundColor;
  var canvasRef = useRef(null);

  var _useScene = useScene(canvasRef, backgroundColor),
      add2Scene = _useScene.add2Scene,
      scene = _useScene.scene,
      renderer = _useScene.renderer,
      render = _useScene.render;

  useImperativeHandle(ref, function () {
    return {
      getSnapshot: function getSnapshot() {
        var _renderer$current;

        render();
        return (_renderer$current = renderer.current) === null || _renderer$current === void 0 ? void 0 : _renderer$current.domElement.toDataURL('image/png', 1);
      }
    };
  });
  useEffect(function () {
    var environment = new RoomEnvironment();
    var pmremGenerator = new THREE.PMREMGenerator(renderer.current);
    scene.current && (scene.current.environment = pmremGenerator.fromScene(environment, 0.04).texture);
    var loader = new GLTFLoader();
    loader.load(src, function (gltf) {
      add2Scene(gltf.scene);
      render();
    });
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: '100%',
      height: '100%'
    }
  });
}

export default /*#__PURE__*/forwardRef(GLTF);