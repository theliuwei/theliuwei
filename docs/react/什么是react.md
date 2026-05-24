# 什么是react

React 是由 Meta（原 Facebook） 开发并维护的一款声明式、组件化、用于构建用户界面（UI）的 JavaScript 库，核心专注于「视图层」，可与其他库 / 框架（如 Redux、React Router）配合构建复杂单页应用（SPA）或多页应用。它目前是前端生态中最流行的框架之一，广泛用于抖音、Instagram、Airbnb、Netflix 等产品。

一、核心定位与设计理念
1. 核心定位
不算是「全能框架」（仅负责 UI 渲染），需搭配路由（React Router）、状态管理（Redux/Zustand）、请求库（Axios）等工具完成完整应用；
目标：让 UI 开发更高效、可维护，解决大型应用中「状态与 UI 同步」的复杂问题。
2. 三大核心设计理念
（1）声明式编程（Declarative）
传统命令式编程：需手动描述「如何操作 DOM 实现效果」（如 document.getElementById().innerHTML = ...）；
React 声明式：只需描述「UI 应该是什么样子」（基于当前状态），React 自动处理 DOM 操作。
```jsx
function TodoButton({ isCompleted, onClick }) {
  return (
    <button onClick={onClick} style={{ color: isCompleted ? 'gray' : 'black' }}>
      {isCompleted ? '已完成' : '未完成'}
    </button>
  );
}
```
（2）组件化（Component-Based）
将 UI 拆分为独立、可复用的「组件」（如按钮、导航栏、卡片），每个组件封装自己的结构（JSX）、样式和逻辑；
组件可嵌套组合，形成复杂 UI（如「页面」由「导航栏 + 内容区 + 页脚」组件组成）；
组件特性：单一职责、可复用、可测试。
（3）虚拟 DOM（Virtual DOM）
真实 DOM 操作昂贵（频繁修改会导致页面重绘 / 回流，影响性能）；
React 引入「虚拟 DOM」（本质是描述 DOM 结构的 JavaScript 对象），每次状态变化时：
先在内存中生成新的虚拟 DOM；
通过「Diff 算法」对比新旧虚拟 DOM 的差异；
只将差异部分更新到真实 DOM（最小化 DOM 操作），提升性能。

二、React 核心特性
1. JSX：JavaScript + XML
一种 React 专属的语法扩展，允许在 JavaScript 中直接写 HTML 风格的标签（本质是 React.createElement() 的语法糖）；
支持嵌入 JavaScript 表达式（用 {} 包裹）、条件渲染、循环渲染；
注意：JSX 不是 HTML，有细微差异（如 class → className、style 需传对象、标签必须闭合）。
```jsx
function UserCard({ name, age, isVIP }) {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <h3>姓名：{name}</h3>
      <p>年龄：{age > 18 ? '成年' : '未成年'}</p>
      {isVIP && <span className="vip-tag">VIP 用户</span>}
    </div>
  );
}
```
2. 组件与 Props（属性）
组件分类：
函数组件（推荐）：用函数定义，简洁高效，配合 Hooks 实现复杂逻辑；
类组件（旧写法）：用 class 定义，需继承 React.Component，已逐渐被函数组件替代。
Props（只读属性）：父组件向子组件传递数据的方式，子组件不能修改 Props（单向数据流）。
```jsx
// 父组件
function App() {
  return <UserCard name="张三" age={20} isVIP={true} />;
}
```
3. 状态（State）与生命周期
状态（State）：组件内部的可变数据，修改状态会触发组件重新渲染（必须通过 setState 或 React Hooks 中的 setXxx 修改，不能直接赋值）；
生命周期（类组件）：组件从创建到销毁的过程（如 componentDidMount 组件挂载后执行、componentDidUpdate 组件更新后执行）；
函数组件通过 React Hooks 替代生命周期（如 useEffect 覆盖挂载 / 更新 / 卸载逻辑）。
4. React Hooks（React 16.8+ 核心特性）
解决函数组件无法使用状态、生命周期的问题，让函数组件能实现复杂逻辑；
常用 Hooks：
useState：定义组件状态（如 const [count, setCount] = useState(0)）；
useEffect：处理副作用（如请求数据、订阅事件、操作 DOM）；
useContext：使用全局上下文数据；
useReducer：复杂状态逻辑的替代方案（类似 Redux）；
自定义 Hooks：抽离复用逻辑（如 useRequest 封装请求逻辑）。
示例：计数器组件（函数组件 + Hooks）
```jsx
import { useState, useEffect } from 'react';

function Counter() {
  // 定义状态：count 初始值 0，setCount 是修改状态的函数
  const [count, setCount] = useState(0);

  // 副作用：count 变化时打印日志（类似 componentDidUpdate）
  useEffect(() => {
    console.log(`当前计数：${count}`);
  }, [count]); // 依赖数组：仅 count 变化时执行

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>加 1</button>
    </div>
  );
}
```
5. 单向数据流
数据只能从「父组件」流向「子组件」（通过 Props），子组件不能直接修改父组件的状态；
若子组件需修改父组件数据，需通过父组件传递的「回调函数」实现（保证数据可追踪，减少 bug）。
三、React 生态系统
React 本身仅管 UI，实际开发需搭配以下生态工具：
路由：React Router → 实现页面跳转（SPA 核心）；
状态管理：
轻量：Zustand、Jotai（替代 Redux 的繁琐配置）；
重量级：Redux + Redux Toolkit（大型应用常用）；
样式方案：CSS Modules、Styled Components（组件级样式隔离）、Tailwind CSS（原子化 CSS）；
构建工具：Vite（快速）、Create React App（官方，零配置）、Next.js（服务端渲染框架）；
类型检查：TypeScript → 增强代码可读性和稳定性；
UI 组件库：Ant Design、Material-UI、Chakra UI（快速搭建美观界面）；
请求库：Axios + React Query/SWR（封装请求、缓存、重试逻辑）。
四、React 的优势与适用场景
优势
声明式编程，代码简洁易维护，减少 DOM 操作冗余；
组件化复用性强，适合大型项目团队协作；
虚拟 DOM + Diff 算法，性能优秀；
生态丰富，工具链成熟，社区活跃（问题易搜索解决）；
跨平台能力（React Native 用于开发 iOS/Android 原生应用，React Three Fiber 用于 3D 可视化）。
适用场景
大型单页应用（SPA）：如管理系统、电商平台；
跨平台应用：通过 React Native 开发移动 App；
复杂交互 UI：如数据可视化、实时更新的界面（如聊天软件）。
五、快速入门（最小示例）
安装依赖（需 Node.js 环境）：
bash
运行
# 用 Vite 快速创建 React 项目（推荐）
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
核心文件 src/App.jsx：
```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('React');
  return (
    <div className="App">
      <h1>Hello, {name}!</h1>
      <button onClick={() => setName('React 新手')}>修改名称</button>
    </div>
  );
}

export default App;
```
总结
React 以「声明式、组件化、虚拟 DOM」为核心，通过 Hooks 让函数组件具备强大能力，配合丰富的生态可满足从简单页面到大型跨平台应用的开发需求。它的核心价值是让 UI 开发更高效、可维护，是前端工程师必备的核心技能之一。
如果需要深入学习，推荐官方文档（React 中文文档），内容权威且更新及时。