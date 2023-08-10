import * as THREE from 'three';
declare function useScene(canvas: any, backgroundColor: string, isRotation?: boolean, rotationAxis?: string): {
    add2Scene: (scene: any) => void;
    scene: import("react").MutableRefObject<THREE.Scene | undefined>;
    renderer: import("react").MutableRefObject<THREE.WebGLRenderer | undefined>;
    render: () => void;
    animate: () => void;
    setProps: ({ isRotation, backgroundColor }: {
        isRotation?: boolean | undefined;
        backgroundColor?: string | undefined;
    }) => void;
};
export default useScene;
