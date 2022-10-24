---
nav:
  title: PLY
  path: /guide
---

## 加载 FBX

Demo:

```tsx
import React from 'react';
import Model from 'react-3dmodelx';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.PLY src="./Lucy100k.ply" />
  </div>
);
```
