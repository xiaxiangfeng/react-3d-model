import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScene from '../useScene';
import conf from '../conf';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

function GLTF(
  {
    src,
    backgroundColor,
    onLoad,
    isRotation,
    decoderPath,
  }: {
    src: string;
    backgroundColor: string;
    onLoad: any;
    isRotation?: boolean;
    decoderPath?: string;
  },
  ref?: React.Ref<unknown>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initRef = useRef<boolean>(true);
  const { add2Scene, scene, renderer, render, animate, setProps } = useScene(
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
    if (initRef.current === false) {
      setProps({ backgroundColor, isRotation });
    }
    initRef.current = false;
  }, [backgroundColor, isRotation]);

  useEffect(() => {
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

    const loader = new GLTFLoader();
    if (decoderPath) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(decoderPath);
      loader.setDRACOLoader(dracoLoader);
    }

    loader.load(src, function (gltf) {
      onLoad && onLoad();
      add2Scene(gltf.scene);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(GLTF);
