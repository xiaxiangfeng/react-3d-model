---
nav:
  title: GLTF
  path: /guide
---

## 加载 GLTF

Demo:

```tsx
import React from 'react';
import Model from 'react-3dmodelx';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.GLTF src="https://taiji.dataojo.com/docloudresource/models/docity_builder/architecture/tianyan/TY/TY.min.glb" />
  </div>
);
```
