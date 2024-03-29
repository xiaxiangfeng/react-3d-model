import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import useScene from '../useScene';
import conf from '../conf';
function Collada(
  {
    src,
    backgroundColor,
    isRotation,
  }: { src: string; backgroundColor: string; isRotation?: boolean },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate, renderer, render } = useScene(
    canvasRef,
    backgroundColor,
    isRotation,
    'z',
  );

  useImperativeHandle(ref, () => ({
    getSnapshot: (quality:number = 0.5) => {
      render();
      return renderer.current?.domElement.toDataURL('image/jpeg', quality);
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

    const loader = new ColladaLoader();
    loader.load(src, function (data) {
      add2Scene(data.scene);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(Collada);
