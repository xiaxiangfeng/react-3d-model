---
hero:
  title: react-3d-model
  desc: react-3d-model site example
  actions:
    - text: Getting Started
      link: /guide
footer: Open-source MIT Licensed | Copyright © 2022<br />
---

```tsx
import React from 'react';
import Model from 'react-3d-model';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.FBX src="./Samba%20Dancing.fbx" />
  </div>
);
```
