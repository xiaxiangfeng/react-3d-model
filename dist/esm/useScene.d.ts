import * as THREE from 'three';
declare function useScene(canvas: any, backgroundColor: string, isRotation?: boolean): {
    add2Scene: (scene: any) => void;
    scene: import("react").MutableRefObject<THREE.Scene | undefined>;
    renderer: import("react").MutableRefObject<THREE.WebGLRenderer | undefined>;
    render: () => void;
    animate: () => void;
};
export default useScene;
