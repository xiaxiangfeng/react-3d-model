import { useEffect, useCallback, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const box = new THREE.Box3();

function getSize(object: THREE.Object3D) {
  box.setFromObject(object);

  return box.getSize(new THREE.Vector3());
}

function getCenter(object: THREE.Object3D) {
  box.setFromObject(object);

  return box.getCenter(new THREE.Vector3());
}

function useScene(
  canvas: any,
  backgroundColor: string,
  isRotation?: boolean,
  rotationAxis?: string,
) {
  let sceneRef = useRef<THREE.Scene>();
  let rendererRef = useRef<THREE.WebGLRenderer>();
  let cameraRef = useRef<THREE.PerspectiveCamera>();
  const timer = useRef<number>();
  const mixer = useRef<THREE.AnimationMixer>();
  const model = useRef<any>();
  const isRotationRef = useRef<boolean>(isRotation || false);

  const clock = useMemo(() => {
    return new THREE.Clock();
  }, []);

  const render = useCallback(() => {
    rendererRef.current?.render(
      sceneRef.current as THREE.Scene,
      cameraRef.current as THREE.PerspectiveCamera,
    );
  }, []);

  useEffect(() => {
    const { offsetHeight, offsetWidth } = canvas.current;
    const camera = new THREE.PerspectiveCamera(45, offsetWidth / offsetHeight, 0.01, 100000);

    cameraRef.current = camera;

    camera.up.set(0, 1, 0);
    camera.position.set(0, 0, 0);

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(backgroundColor || 0xbbbbbb);

    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    });

    rendererRef.current = renderer;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(offsetWidth, offsetHeight);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.addEventListener('change', render); // use if there is no animation loop
    controls.update();

    return () => {
      cancelAnimationFrame(timer.current as number);
      scene.clear();
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  const add2Scene = useCallback((scene: any) => {
    const distance = getSize(scene).length();
    const center = getCenter(scene);

    model.current = scene;

    if (scene.animations[0]) {
      mixer.current = new THREE.AnimationMixer(scene);

      const action = mixer.current.clipAction(scene.animations[0]);
      action.play();
    }

    cameraRef.current && (cameraRef.current.position.z = distance);
    scene.position.copy(center.negate());
    sceneRef.current?.add(scene);
  }, []);

  const animate = useCallback(() => {
    timer.current = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.current?.update(delta);
    if (isRotationRef.current && model.current) {
      model.current.rotation[rotationAxis || 'y'] += delta * 0.5;
    }

    render();
  }, []);

  const setProps = useCallback(
    ({ isRotation, backgroundColor }: { isRotation?: boolean; backgroundColor?: string }) => {
      if (typeof isRotation !== undefined) {
        isRotationRef.current = isRotation || false;
      }
      if (backgroundColor && sceneRef.current) {
        sceneRef.current.background = new THREE.Color(backgroundColor);
      }
    },
    [],
  );

  return { add2Scene, scene: sceneRef, renderer: rendererRef, render, animate, setProps };
}

export default useScene;
