# DrissionPage

## 简介

它是一个基于Python的网页自动化工具，它能控制浏览器，也能首发数据包。还能把两者合二为一。可兼顾浏览器自动化的便利性和requests的高效率。它功能强大，内置无数人性化设计和便携功能。它的语法简洁而高雅，代码量少，对新手友好。

## 背景

用requests做数据采集面对要登陆的网站时，要分析的数据包、js源码、构造复杂的请求，往往还要应付验证码、js混淆、签名参数等反爬手段。可以很大程度上绕开这些坑，但浏览器运行效率不高。

因此，这个库的设计初衷，是将 它们合二为一，同时实现“写得快”和“跑得快”。能够在不同需要时切换相应模式，并提供一种人性化的使用方法，提高开发和运行效率。除了合并二者外，本库还以网页为单位封装了常用功能，提供非常简便的操作和语句，使用户可减少细节、专注功能实现。以简单的方式实现强大的功能，使代码更加优雅。

以前的版本对selenium进行重新封装实现的，从3.0版本开始，作者另起炉灶，对底层进行了重新开发，摆脱了selenium的依赖，增强了功能，提升了运行效率。

## 核心功能

本库采用全自研的内核，内置了N多实用功能，对比selenium，有以下优点：

- 无webdriver特征
- 无需为不同版本的浏览器下载不同的驱动
- 运行速度更快
- 可以跨iframe查找元素，无需切入切出
- 把iframe看作普通元素，获取后可直接在其中查找元素，逻辑更清晰
- 可以同时操作浏览器中的多个标签页，即使标签页为非激活状态，无需切换
- 可以直接读取浏览器缓存来保存图片，无需用GUI点击另存
- 可以对真个网页截图，包括视口外的部分（90以上版本浏览器支持）
- 可处理非open状态的shadow-root

## 安装

```shell
pip install DrissionPage
```



## 入门演示

SessionPage对象和WebPage对象的s模式，可用收发数据包的形式访问网页。

顾名思义，SessionPage是一个实用Session（requests库）对象的页面，它使用POM模式封装了网络连接和html解析功能，使首发数据包也可以像操作页面一样便利。并且，由于加入了本库独创的查找元素方法，使数据的采集便利性超过requests+beautifulsoup结合。

SessionPage是本库几个页面对象中最简单的，我们先从它入手。

### 例子

```python
from DissionPage import SessionPage
#创建页面对象
page = SessionPage()
#访问网页
page.get("https://gitee.com/explore/all")
#在页面中查找元素
items = page.eles("t:h3")
#遍历元素
for item in items[:-1]:
  #获取当前<h3>元素下的<a>元素
  lnk = item("tag:a")
  #打印<a>元素的文本和href属性
  print(lnk.text, lnk.link)
```

页面类是最主要的工具，用于控制浏览器或收发数据包。

DrissionPage 包含三种主要页面类。根据需要在其中选择使用。

### 📌 `ChromiumPage

如果只要控制浏览器，导入`ChromiumPage`。

```python
from DrissionPage import ChromiumPage
```



------

### 📌 `SessionPage

如果只要收发数据包，导入`SessionPage`。

```python
from DrissionPage import SessionPage
```



------

### 📌 `WebPage`

`WebPage`是功能最全面的页面类，既可控制浏览器，也可收发数据包。

```python
from DrissionPage import WebPage
```



------

## ✅️ 配置工具

### 📌 `ChromiumOptions

`ChromiumOptions`类用于设置浏览器启动参数。

这些参数只有在启动浏览器时有用，接管已存在的浏览器时是不生效的。

```python
from DrissionPage import ChromiumOptions
```



------

### 📌 `SessionOptions

`SessionOptions`类用于设置`Session`对象启动参数。

用于配置`SessionPage`或`WebPage`s 模式的连接参数。

```python
from DrissionPage import SessionOptions
```



------

### 📌 `Settings

`Settings`用于设置全局运行配置，如找不到元素时是否抛出异常等。

```python
from DrissionPage.common import Settings
```



------

## ✅️ 其它工具

其它可能用到的工具，放在`DrissionPage.common`路径。

### 📌 `Keys`

键盘按键类，用于键入 ctrl、alt 等按键。

```python
from DrissionPage.common import Keys
```



------

### 📌 `Actions

动作链，用于执行一系列动作。

在浏览器页面对象中已有内置，无如特殊需要无需主动导入。

```python
from DrissionPage.common import Actions
```



------

### 📌 `By

与 selenium 一致的`By`类，便于项目迁移。

```python
from DrissionPage.common import By
```



------

### 📌 其它工具

- `wait_until`：可等待传入的方法结果为真
- `make_session_ele`：从 html 文本生成`ChromiumElement`对象
- `configs_to_here`：把配置文件复制到当前路径
- `get_blob`：获取指定的 blob 资源
- `tree`：用于打印页面对象或元素对象结构
- `from_selenium`：用于对接 selenium 代码
- `from_playwright`：用于对接 playwright 代码

```python
from DrissionPage.common import wait_until
from DrissionPage.common import make_session_ele
from DrissionPage.common import configs_to_here
```



------

## ✅️ 异常

异常放在`DrissionPage.errors`路径。

全部异常详见进阶使用章节。

```python
from DrissionPage.errors import ElementNotFoundError
```



------

## ✅️ 衍生对象类型

Tab、Element 等对象是由 Page 对象生成，开发过程中需要类型判断时需要导入这些类型。

可在`DrissionPage.items`路径导入。

```python
from DrissionPage.items import SessionElement
from DrissionPage.items import ChromiumElement
from DrissionPage.items import ShadowRoot
from DrissionPage.items import NoneElement
from DrissionPage.items import ChromiumTab
from DrissionPage.items import WebPageTab
from DrissionPage.items import ChromiumFrame
```
