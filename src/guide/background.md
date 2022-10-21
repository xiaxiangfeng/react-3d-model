---
nav:
  title: 背景色
  path: /guide/background
---

## 设置背景颜色

Demo:

```tsx
import React from 'react';
import Model from 'react-3d-model';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.Collada src="./elf.dae" backgroundColor="aliceblue" />
  </div>
);
```
