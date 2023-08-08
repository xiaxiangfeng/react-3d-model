---
nav:
  title: 模型组
  path: /guide
---

## 加载 模型组

Demo:

```tsx
import React from 'react';
import Model from 'react-3dmodelx';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.Group
      list={[
        { url: './chair1.gltf', type: 'gltf' },
        { url: './chair.gltf', type: 'gltf' },
      ]}
      onLoad={() => {}}
    />
  </div>
);
```
