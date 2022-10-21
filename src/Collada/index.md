---
nav:
  title: Collada
  path: /guide
---

## 加载 Collada

Demo:

```tsx
import React from 'react';
import Model from 'react-3d-model';

export default () => {
  return (
    <>
      <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
        <Model.Collada src="./elf.dae" />
      </div>
    </>
  );
};
```
