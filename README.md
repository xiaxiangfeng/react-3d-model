# react-3dmodelx

> 3D models viewer with react.js。文档地址：https://xiaxiangfeng.github.io/react-3d-model/index.html#/

![Image text](https://xiaxiangfeng.github.io/react-3d-model/Animation.gif)

## 从 NPM 下载包

```npm
npm i react-3dmodelx
```

## Basic usage

```tsx
import React from 'react';
import Model from 'react-3dmodelx';

export default () => (
  <div style={{ maxWidth: 800, width: '100%', height: 400, margin: 'auto' }}>
    <Model.FBX src="./Samba%20Dancing.fbx" />
  </div>
);
```

Demo:

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father`,

```bash
$ npm run build
```
