import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import useScene from "../useScene";
import conf from "../conf";

function OBJ(_ref, ref) {
  var src = _ref.src,
      backgroundColor = _ref.backgroundColor,
      onLoad = _ref.onLoad;
  var canvasRef = useRef(null);

  var _useScene = useScene(canvasRef, backgroundColor),
      add2Scene = _useScene.add2Scene,
      scene = _useScene.scene,
      animate = _useScene.animate,
      render = _useScene.render,
      renderer = _useScene.renderer;

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

    var ambientLight = new THREE.AmbientLight(conf.ambientLightColor, conf.ambientLightIntensity);
    (_scene$current = scene.current) === null || _scene$current === void 0 ? void 0 : _scene$current.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(conf.directionalLightColor, conf.directionalIntensity);
    directionalLight.position.set(1, 1, 0).normalize();
    (_scene$current2 = scene.current) === null || _scene$current2 === void 0 ? void 0 : _scene$current2.add(directionalLight);
    var loader = new OBJLoader();
    loader.load(src, function (data) {
      onLoad && onLoad();
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

export default /*#__PURE__*/forwardRef(OBJ);