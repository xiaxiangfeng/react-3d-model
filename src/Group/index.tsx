import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from '../useScene';
import conf from '../conf';
interface model {
  url: string;
  type: string;
}

function Group(
  {
    list,
    backgroundColor,
    onLoad,
    isRotation,
  }: { list: string[] | model[]; backgroundColor: string; onLoad: any; isRotation?: boolean },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { add2Scene, scene, animate, renderer, render } = useScene(
    canvasRef,
    backgroundColor,
    isRotation,
  );

  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      render();
      return renderer.current?.domElement.toDataURL('image/png', 1);
    },
    setLight: (
      type: 'directionalLight' | 'ambientLight',
      { color, intensity }: { color?: string; intensity?: number },
    ) => {
      const light: any = scene.current?.getObjectByName(type);
      if (light) {
        if (color !== undefined) {
          light.color = new THREE.Color(color);
        }
        if (intensity !== undefined) {
          light.intensity = intensity;
        }
        render();
      }
    },
  }));

  useEffect(() => {
    const group = new THREE.Group();
    const ambientLight = new THREE.AmbientLight(conf.ambientLightColor, conf.ambientLightIntensity);
    ambientLight.name = 'ambientLight';
    scene.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      conf.directionalLightColor,
      conf.directionalIntensity,
    );
    directionalLight.name = 'directionalLight';
    directionalLight.position.set(1, 1, 0).normalize();

    scene.current?.add(directionalLight);

    let loadCount = 0;
    let modelCount = list.length;

    list.forEach((data) => {
      let url = '';
      let type = '';

      if (typeof data === 'string') {
        url = data;
      }

      if (typeof data === 'object') {
        url = data.url;
        type = data.type;
      }

      const lowerUrl = url.toLowerCase();
      const lowerType = type.toLowerCase();

      if (lowerUrl.endsWith('fbx') || lowerType === 'fbx') {
        const loader = new FBXLoader();
        loader.load(url, function (data: any) {
          group.add(data);
          loadCount = loadCount + 1;
          if (loadCount === modelCount) {
            add2Scene(group);
            animate();
            onLoad && onLoad();
          }
        });
      }
      if (
        lowerUrl.endsWith('gltf') ||
        lowerUrl.endsWith('glb') ||
        lowerType === 'glb' ||
        lowerType === 'gltf'
      ) {
        const loader = new GLTFLoader();
        loader.load(url, function (gltf: any) {
          group.add(gltf.scene);
          loadCount = loadCount + 1;
          if (loadCount === modelCount) {
            add2Scene(group);
            animate();
            onLoad && onLoad();
          }
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
