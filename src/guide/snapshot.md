---
nav:
  title: 截图
  path: /guide/snapshot
---

## 获取截图

Demo:

```tsx
import React, { useRef } from 'react';
import Model from 'react-3dmodelx';

export default () => {
  const model = useRef();
  return (
    <>
      <button
        onClick={() => {
          const str = model.current.getSnapshot();
          const a = document.createElement('a');
          a.href = str;
          a.download = true;
          a.click();
        }}
      >
        获取截图
      </button>
      <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
        <Model.Collada src="./elf.dae" ref={model} />
      </div>
    </>
  );
};
```
