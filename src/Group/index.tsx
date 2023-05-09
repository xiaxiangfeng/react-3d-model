import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from '../useScene';

function Group(
  { list, backgroundColor, onLoad }: { list: string[]; backgroundColor: string; onLoad: any },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate, renderer, render } = useScene(canvasRef, backgroundColor);

  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      render();
      return renderer.current?.domElement.toDataURL('image/png', 1);
    },
  }));

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();

    scene.current?.add(directionalLight);

    let loadCount = 0;
    let modelCount = list.length;

    list.forEach((url) => {
      const lowerUrl = url.toLowerCase();

      if (lowerUrl.endsWith('fbx')) {
        const loader = new FBXLoader();
        loader.load(url, function (data: any) {
          loadCount = loadCount + 1;
          if (loadCount === modelCount) {
            onLoad && onLoad();
          }
          add2Scene(data);
          animate();
        });
      }
      if (lowerUrl.endsWith('gltf') || lowerUrl.endsWith('glb')) {
        const loader = new GLTFLoader();
        loader.load(url, function (gltf: any) {
          loadCount = loadCount + 1;
          if (loadCount === modelCount) {
            onLoad && onLoad();
          }
          add2Scene(gltf.scene);
          render();
        });
      }
    });

    return () => {
      loadCount = 0;
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(Group);
