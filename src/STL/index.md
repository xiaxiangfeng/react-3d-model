---
nav:
  title: STL
  path: /guide
---

## 加载 FBX

Demo:

```tsx
import React from 'react';
import Model from 'react-3d-model';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.STL src="./gear.stl" />
  </div>
);
```