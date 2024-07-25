# 安装

在React项目中安装Three.js

```shell
pnpm install Three
```

## 创建Three组件

现在，现在src目录下创建放置Three.js相关代码的组件。

```javascript
// src/Threescene.jsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;

        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // 创建一个立方体
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);

            // 旋转立方体
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // 处理窗口大小调整
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default ThreeScene;
```

## 使用这个组件

在React应用的其他组件中去使用它

```javascript
// src/App.jsx
import React from 'react';
import ThreeScene from './Threescene';

function App() {
    return (
        <div className="App" style={{ width: '60vw', height: '40vh' }}>
            <ThreeScene />
        </div>
    );
}

export default App;

```
