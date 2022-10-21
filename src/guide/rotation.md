---
nav:
  title: 旋转
  path: /guide/rotation
---

## 旋转模型

Demo:

```tsx
import React from 'react';
import Model from 'react-3d-model';

export default () => {
  return (
    <>
      <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
        <Model.Collada src="./elf.dae" isRotation={true} />
      </div>
    </>
  );
};
```
