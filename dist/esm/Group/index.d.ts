import React from 'react';
interface model {
    url: string;
    type: string;
}
declare const _default: React.ForwardRefExoticComponent<{
    list: string[] | model[];
    backgroundColor: string;
    onLoad: any;
} & React.RefAttributes<unknown>>;
export default _default;
