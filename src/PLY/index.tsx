import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import useScene from '../useScene';

function PLY({ src, backgroundColor }: { src: string; backgroundColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate } = useScene(canvasRef, backgroundColor);

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();

    scene.current?.add(directionalLight);

    const loader = new PLYLoader();
    loader.load(src, function (geometry) {
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      add2Scene(mesh);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default PLY;
