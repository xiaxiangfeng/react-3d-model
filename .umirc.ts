import { defineConfig } from 'dumi';

export default defineConfig({
  resolve: { includes: ['docs', 'src'] },
  menus: {
    '/guide': [
      {
        title: '指南',
        children: [
          {
            title: '安装',
            path: '/guide/installation',
          },
        ],
      },
      {
        title: '示例',
        children: [
          {
            title: '自定义背景色',
            path: '/guide/background',
          },
          {
            title: '获取截图',
            path: '/guide/snapshot',
          },
          {
            title: '旋转模型',
            path: '/guide/rotation',
          },
          {
            title: 'GLTF格式',
            path: '/guide/gltf',
          },
          {
            title: 'Collada格式',
            path: '/guide/collada',
          },
          {
            title: 'FBX格式',
            path: '/guide/fbx',
          },
          {
            title: 'OBJ格式',
            path: '/guide/obj',
          },
          {
            title: 'PLY格式',
            path: '/guide/ply',
          },
          {
            title: 'STL格式',
            path: '/guide/stl',
          },
        ],
      },
    ],
  },
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
  publicPath: './',
  history: { type: 'hash' },
  title: 'react-3d-model',
  favicon: './3d.png',
  logo: './3d.png',
  outputPath: 'docs-dist',
  mode: 'site',
});
