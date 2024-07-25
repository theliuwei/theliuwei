# Hooks

## React内置Hook

Hook目的是帮助在组件中使用不同的React功能。你可以使用内置的Hook或使用自定义Hook。

## State Hook

状态帮助组件"记住用户输入的信息"，例如：一个表单组件可以使用状态存储输入值，而一个图像库组件可以使用状态存储所选的图像索引。

使用以下Hook向组件添加状态

- 使用`useState`声明可以直接更新的状态变量
- 使用`useReducer`在`reducer`函数中声明带有更新逻辑的`state`变量

```javascript
import React, { useState } from 'react';

function ImageGallery() {
  // 使用 useState 声明状态变量 `index`，初始值为 0
  const [index, setIndex] = useState(0);

  // 该组件其他代码可能包括一个图像库的实现，例如：
  // - 显示当前图像
  // - 控制前后图像的按钮
  // - 其他与图像库相关的逻辑

  return (
    <div>
      <p>Current image index: {index}</p>
      <button onClick={() => setIndex(index - 1)}>Previous</button>
      <button onClick={() => setIndex(index + 1)}>Next</button>
    </div>
  );
}

export default ImageGallery;

```

### 详细解释

#### 导入`useState`

```javascript
import React, { useState } from 'react';
```

在使用`useState`之前，必须先从React中导入它。

#### 声明状态变量

```javascript
const [index, setIndex] = useState(0);
```

这里`useState`接受一个初始状态（这里是0）,返回一个包含两个元素的数组。

- `index`是状态变量，当前值是`0`
- `setIndex`是一个函数，用于更新`index`的值。

#### 使用状态变量

```javascript
<p>{index}</p>
```

#### 更新状态变量

```javascript
<button onClick={() => setIndex(index - 1)}>减少</button>
<button onClick={() => setIndex(index + 1)}></button>
```

通过调用`setIndex`并传入新的值，可以更新`index`。每次点击按钮时，`index`的值降增加或者减少。

#### 总结

- `useState`使的函数组件可以拥有状态，并且能够在重新渲染时“记住”这些状态。
- 状态变量可以是任何类型，如数字、字符串、数组或对象。
- 每次调用`setIndex`，组件都会重新渲染并更新UI。
- 通过`useState`，前端程序员可以在函数组件中管理和更新状态，方便获取用户的输入和动态修改数据的信息。跟踪用户的操作。

```javascript
import React, {useState} from "react";

const [a, setA] = UseState("a")
```

```javascript
import React, {useState} from "react";

const [a, setA] = useState([1,2,3])
```

```javascript
import React, {useState} from "react";

const [a, SetA] = useState({"name":"张三"})
```

