import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from "../useScene";
import conf from "../conf";

function GLTF(_ref, ref) {
  var src = _ref.src,
      backgroundColor = _ref.backgroundColor,
      onLoad = _ref.onLoad,
      isRotation = _ref.isRotation;
  var canvasRef = useRef(null);
  var initRef = useRef(true);

  var _useScene = useScene(canvasRef, backgroundColor, isRotation),
      add2Scene = _useScene.add2Scene,
      scene = _useScene.scene,
      renderer = _useScene.renderer,
      render = _useScene.render,
      animate = _useScene.animate,
      setProps = _useScene.setProps;

  useImperativeHandle(ref, function () {
    return {
      getSnapshot: function getSnapshot() {
        var _renderer$current;

        render();
        return (_renderer$current = renderer.current) === null || _renderer$current === void 0 ? void 0 : _renderer$current.domElement.toDataURL('image/png', 1);
      },
      setLight: function setLight(type, _ref2) {
        var _scene$current;

        var color = _ref2.color,
            intensity = _ref2.intensity;
        var light = (_scene$current = scene.current) === null || _scene$current === void 0 ? void 0 : _scene$current.getObjectByName(type);

        if (light) {
          if (color !== undefined) {
            light.color = new THREE.Color(color);
          }

          if (intensity !== undefined) {
            light.intensity = intensity;
          }

          render();
        }
      }
    };
  });
  useEffect(function () {
    if (initRef.current === false) {
      setProps({
        backgroundColor: backgroundColor,
        isRotation: isRotation
      });
    }

    initRef.current = false;
  }, [backgroundColor, isRotation]);
  useEffect(function () {
    var _scene$current2, _scene$current3;

    var ambientLight = new THREE.AmbientLight(conf.ambientLightColor, conf.ambientLightIntensity);
    ambientLight.name = 'ambientLight';
    (_scene$current2 = scene.current) === null || _scene$current2 === void 0 ? void 0 : _scene$current2.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(conf.directionalLightColor, conf.directionalIntensity);
    directionalLight.name = 'directionalLight';
    directionalLight.position.set(1, 1, 0).normalize();
    (_scene$current3 = scene.current) === null || _scene$current3 === void 0 ? void 0 : _scene$current3.add(directionalLight);
    var loader = new GLTFLoader();
    loader.load(src, function (gltf) {
      onLoad && onLoad();
      add2Scene(gltf.scene);
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

export default /*#__PURE__*/forwardRef(GLTF);