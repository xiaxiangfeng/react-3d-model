import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import useScene from '../useScene';
import conf from '../conf';
function FBX(
  {
    src,
    backgroundColor,
    onLoad,
    isRotation,
  }: { src: string; backgroundColor: string; onLoad: any; isRotation?: boolean },
  ref?: React.Ref<unknown>,
) {
  const initRef = useRef<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { add2Scene, scene, animate, renderer, render, setProps } = useScene(
    canvasRef,
    backgroundColor,
    isRotation,
  );

  useImperativeHandle(ref, () => ({
    getSnapshot: (quality:number = 0.5) => {
      render();
      return renderer.current?.domElement.toDataURL('image/jpeg', quality);
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

    const loader = new FBXLoader();
    loader.load(src, function (data) {
      onLoad && onLoad();
      add2Scene(data);
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(FBX);
