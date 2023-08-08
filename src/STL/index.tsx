import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import useScene from '../useScene';
import conf from '../conf';
function STL({ src, backgroundColor }: { src: string; backgroundColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate } = useScene(canvasRef, backgroundColor);

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(conf.ambientLightColor, conf.ambientLightIntensity);
    scene.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      conf.directionalLightColor,
      conf.directionalIntensity,
    );
    directionalLight.position.set(1, 1, 0).normalize();

    scene.current?.add(directionalLight);

    const loader = new STLLoader();
    loader.load(src, function (geometry) {
      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      add2Scene(mesh);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default STL;
