import PLY from './PLY';
import STL from './STL';
declare const _default: {
    GLTF: import("react").ForwardRefExoticComponent<{
        src: string;
        backgroundColor: string;
    } & import("react").RefAttributes<unknown>>;
    Collada: import("react").ForwardRefExoticComponent<{
        src: string;
        backgroundColor: string;
        isRotation?: boolean | undefined;
    } & import("react").RefAttributes<unknown>>;
    FBX: import("react").ForwardRefExoticComponent<{
        src: string;
        backgroundColor: string;
    } & import("react").RefAttributes<unknown>>;
    OBJ: import("react").ForwardRefExoticComponent<{
        src: string;
        backgroundColor: string;
    } & import("react").RefAttributes<unknown>>;
    PLY: typeof PLY;
    STL: typeof STL;
    Group: import("react").ForwardRefExoticComponent<{
        list: string[];
        backgroundColor: string;
    } & import("react").RefAttributes<unknown>>;
};
export default _default;
