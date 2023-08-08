import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import useScene from '../useScene';
import conf from '../conf';
function OBJ(
  { src, backgroundColor, onLoad }: { src: string; backgroundColor: string; onLoad: any },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate, render, renderer } = useScene(canvasRef, backgroundColor);

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

    const loader = new OBJLoader();
    loader.load(src, function (data) {
      onLoad && onLoad();
      add2Scene(data);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(OBJ);
