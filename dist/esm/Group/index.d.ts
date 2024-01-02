import React from 'react';
interface model {
    url: string;
    type: string;
}
declare const _default: React.ForwardRefExoticComponent<{
    list: string[] | model[];
    backgroundColor: string;
    onLoad: any;
    isRotation?: boolean | undefined;
    decoderPath?: string | undefined;
} & React.RefAttributes<unknown>>;
export default _default;
