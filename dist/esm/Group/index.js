function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from "../useScene";

function Group(_ref, ref) {
  var list = _ref.list,
      backgroundColor = _ref.backgroundColor,
      onLoad = _ref.onLoad;
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
    var loadCount = 0;
    var modelCount = list.length;
    list.forEach(function (data) {
      var url = '';
      var type = '';

      if (typeof data === 'string') {
        url = data;
      }

      if (_typeof(data) === 'object') {
        url = data.url;
        type = data.type;
      }

      var lowerUrl = url.toLowerCase();
      var lowerType = type.toLowerCase();

      if (lowerUrl.endsWith('fbx') || lowerType === 'fbx') {
        var loader = new FBXLoader();
        loader.load(url, function (data) {
          loadCount = loadCount + 1;

          if (loadCount === modelCount) {
            onLoad && onLoad();
          }

          add2Scene(data);
          animate();
        });
      }

      if (lowerUrl.endsWith('gltf') || lowerUrl.endsWith('glb') || lowerType === 'glb' || lowerType === 'gltf') {
        var _loader = new GLTFLoader();

        _loader.load(url, function (gltf) {
          loadCount = loadCount + 1;

          if (loadCount === modelCount) {
            onLoad && onLoad();
          }

          add2Scene(gltf.scene);
          render();
        });
      }
    });
    return function () {
      loadCount = 0;
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: '100%',
      height: '100%'
    }
  });
}

export default /*#__PURE__*/forwardRef(Group);