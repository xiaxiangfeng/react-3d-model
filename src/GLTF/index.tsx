import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from '../useScene';
import conf from '../conf';

function GLTF(
  { src, backgroundColor, onLoad }: { src: string; backgroundColor: string; onLoad: any },
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
    const ambientLight = new THREE.AmbientLight(conf.ambientLightColor, conf.ambientLightIntensity);
    scene.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      conf.directionalLightColor,
      conf.directionalIntensity,
    );
    directionalLight.position.set(1, 1, 0).normalize();

    scene.current?.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(src, function (gltf) {
      onLoad && onLoad();
      add2Scene(gltf.scene);
      render();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(GLTF);
