import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import useScene from "../useScene";

function FBX(_ref, ref) {
  var src = _ref.src,
      backgroundColor = _ref.backgroundColor;
  var canvasRef = useRef(null);

  var _useScene = useScene(canvasRef, backgroundColor),
      add2Scene = _useScene.add2Scene,
      scene = _useScene.scene,
      animate = _useScene.animate,
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
    var _scene$current, _scene$current2;

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    (_scene$current = scene.current) === null || _scene$current === void 0 ? void 0 : _scene$current.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    (_scene$current2 = scene.current) === null || _scene$current2 === void 0 ? void 0 : _scene$current2.add(directionalLight);
    var loader = new FBXLoader();
    loader.load(src, function (data) {
      add2Scene(data);
      animate();
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

export default /*#__PURE__*/forwardRef(FBX);