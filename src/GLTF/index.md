---
nav:
  title: GLTF
  path: /guide
---

## 加载 GLTF

Demo:

```tsx
import React, { useRef } from 'react';
import Model from 'react-3dmodelx';

export default () => {
  const modelRef = useRef(null);
  const setLight = (color) => {
    modelRef.current.setLight('ambientLight', { color, intensity: 2 });
  };
  return (
    <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
      <div>
        <span
          onClick={() => {
            setLight('red');
          }}
          style={{ background: 'red', cursor: 'pointer' }}
        >
          红
        </span>
        <span
          onClick={() => {
            setLight('blue');
          }}
          style={{ background: 'blue', cursor: 'pointer' }}
        >
          蓝
        </span>
        <span
          onClick={() => {
            setLight('green');
          }}
          style={{ background: 'green', cursor: 'pointer' }}
        >
          绿
        </span>
      </div>
      <Model.GLTF ref={(object) => (modelRef.current = object)} src="./chair1.gltf" />
    </div>
  );
};
```
