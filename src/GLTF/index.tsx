import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from '../useScene';

function GLTF(
  { src, backgroundColor }: { src: string; backgroundColor: string },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, renderer, render } = useScene(canvasRef, backgroundColor);

  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      render();
      return renderer.current?.domElement.toDataURL('image/png', 1);
    },
  }));

  useEffect(() => {
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer.current as THREE.WebGLRenderer);

    scene.current &&
      (scene.current.environment = pmremGenerator.fromScene(environment, 0.04).texture);

    const loader = new GLTFLoader();
    loader.load(src, function (gltf) {
      add2Scene(gltf.scene);
      render();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(GLTF);
