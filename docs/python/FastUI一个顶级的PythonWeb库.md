# FastUI简介

FastUI是一个基于Python的Web框架，它旨在提供一种快速、简单且高效的方式来创建Web应用。FastUI的设计理念是"快速开发、优雅呈现"，它通过简化开发流程，让开发者能够专注于应用的核心功能。

项目地址：https://github.com/pydantic/FastUI

## 工作原理

FastUI通过提供一套简洁的API来处理HTTP请求和响应。当你创建一个FastUI应用时，你实际上是定义一系列的路由规则和对应的处理函数。当用户访问你的Web应用时，FastUI会根据请求的URL和HTTP方法，调用相应的处理函数，并返回处理结果。

## 安装

```shell
pip install fastui
```

### 创建第一个FastUi应用

```python
from fastui import FastApp, web

app = FastApp()

@app.route("/")
def home():
  return "Welcome to FastUI"

if __name__ == "__main__":
  web.run(app)
```

这段代码做了以下几件事情

1. 倒入FastUI库中的FastApp和web模块
2. 创建一个FastApp应用实例
3. 定义一个路由(@app.route("/"))，这意味着当用户访问根URL("/")时，将调用home函数。
4. 在home函数中，返回字符串Welcome to FastUI
5. 如果这个脚本作为主程序运行，那么启动FastUI的Web服务器
6. 运行这段代码，然后在浏览器中访问`http://127.0.0.1:8000`，将看到"Welcome to FastUI"。

## 路由和请求处理

FastUI通过路由来确定如何处理特定的HTTP请求，路由是URL的一部分，它告诉FastUI应该调用哪个函数来处理请求。

### 定义路由

你可以为不同的URL和HTTP方法定义不同的路由，例如：下面的代码定义了两个路由，一个用于GET请求，一个用于POST请求。

```python
@app.route("/get", methods=["GET"])
def get_request():
    return "this is get"
@app.route("/post", methods=["POST"])
def post_request():
    return "this is post"
```

### 处理请求参数

FastUi可以自动将URL中参数传递给处理函数

```python
@app.route("/user/<username>")
def user_profile(username):
    return f"Welcome,{username}"
```

### 模板渲染

FastUI支持模板渲染，这意味着开发者可以创建动态的HTML页面，FastUI内置了模板引擎，你可以直接在应用中使用它。

```python
@app.route("/template")
def template_example():
    return "Hello, {{name}}", {"name": "Bob"}
```

在这个例子中，`template_example`函数返回一个字符串和一个字典，字符串是模板内容，字典是模板需要的上下文数据。FastUI会自动将{{name}}替换为字典中的name值。

### 高级特性

开发者可以使用FastUI提供的插件来扩展其功能，例如：添加数据库支持、身份验证、上传文件处理等。







