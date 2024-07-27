# 什么是Gin

Gin是一个用Go语言编写的Web框架，它的设计目标是构建高性能的Web应用程序。以下是Gin框架的主要特点和用途：

1. 路由处理：
    - 支持RESTful API的设计
    - 可以轻松处理不同的HTTP方法（GET, POST, PUT, DELETE等）
    - 支持路由分组，便于管理大型应用
2. 中间件支持：
    - 可以在请求处理过程中添加自定义逻辑
    - 内置了一些常用中间件，如日志、错误恢复等
    - 可以轻松编写和集成自定义中间件
3. 参数绑定和验证：
    - 支持将请求参数自动绑定到Go结构体
    - 内置验证功能，可以验证请求数据的有效性
4. 渲染响应：
    - 支持JSON、XML、HTML等多种响应格式
    - 可以轻松渲染模板
5. 文件上传：
    - 提供了简单的文件上传和处理机制
6. 高性能：
    - Gin被设计为高性能框架，适合构建需要处理大量请求的应用
7. 可扩展性：
    - 易于与其他Go库集成
    - 可以根据需要添加自定义功能
8. 错误管理：
    - 提供了优雅的错误处理机制
9. 测试支持：
    - 内置了测试工具，便于编写单元测试和集成测试
10. 部署简便：
    - 由于Go的特性，Gin应用可以编译成单一的二进制文件，便于部署

使用场景：

1. RESTful API服务：Gin非常适合构建高性能的API服务。
2. Web应用后端：可以作为传统Web应用的后端。
3. 微服务：由于其轻量和高性能特性，Gin适合用于构建微服务。
4. 代理服务：可以用作反向代理或API网关。
5. 实时Web应用：配合WebSocket，可以构建实时通信应用。

总的来说，Gin框架是一个versatile的工具，适用于各种Web开发场景，特别是那些需要高性能和可扩展性的项目。它的学习曲线相对平缓，对于熟悉Go语言的开发者来说，可以快速上手并构建出高质量的Web应用。

# 创建 Gin 项目



## 先决条件

1. 安装 Go：从 Go 官方网站下载并安装适合您 macOS 版本的 Go 软件包：https://go.dev/doc/install
2. 设置 Go 环境：配置`GOPATH`环境变量以指向存储 GO 项目的目录。https://go.dev/wiki/SettingGOPATH

## 目录结构

```shell
myapp/
├── main.go
├── controllers/
│   └── user.go
├── models/
│   └── user.go
└── routers/
    └── router.go
```



## 创建项目

1. 创建项目目录：打开终端窗口并导航到项目所需的位置。创建一个目录来保存您的 Gin 项目文件：

   ```shell
   mkdir gin-project
   cd gin-project
   ```

2. 初始化 Go 模块：初始化 Go 模块来管理项目的依赖项：

   ```shell
   go mod init gin-project
   ```

3. 安装 Gin 框架：使用以下命令安装 Gin 框架`go get`:

   ```shell
   go get -u github.com/gin-gonic/gin
   ```

4. 创建主 Go 文件：创建一个名为的文件`main.go`作为 Gin 应用程序的入口点：

   ```shell
   touch main.go
   ```

5. 编写 Gin 应用程序代码：打开`main.go`并添加以下代码来创建一个简单的 Gin 应用程序：

   ```go
   package main
   import ("github.com/gin-gonic/gin")
   func main() {
   	router := gin.Default()
   	router.GET("/", func(c *gin.Context) {
   		c.JSON(200, gin.H{"message": "Hello World"})
   		router.Run(":8080")
   	})
   }
   ```

6. 运行 Gin 应用程序：使用以下命令运行 Gin 应用程序`go run`:

   ```shell
   go run main.go
   ```

   这将在端口 8080 上启动 Gin 服务器，

7. 添加依赖，直接在代码中import，然后运行

   ```shell
   go mod tidy
   ```

   

### Gin 安装

- go get -u GitHub.com/gin-gonic/gin
- -u:已存在相关的代码包，强制更新代码包及其依赖包
- 中国国内使用上面命令可能会导致安装错误，可以使用下面的软件源
- 阿里云：https://mirrors.aliyun.com/goproxy
- 微软：https://goproxy.io
- 七牛云：https://goproxy.cn

### 设置 Go 下载代码包的软件源

- go env -w GO111MODULE=on
- go env -w GOPROXY=https://goproxy.cn,direct

### go.sum 文件

它是 Go 模块的重要组成部分，Go 模块是 Go1.11 中引入的依赖管理系统，它确保项目的完整性和可重复性方面发挥着重要的作用。

该文件的主要目的`go.sum`是验证项目依赖项的校验和加密哈希。当程序员运行`go mod download`命令时，Go 会从指定的模块注册表中获取所需的依赖项并生成相应的`go.sum`文件。该文件包含每个下载的依赖项的校验和记录。

### go.mod 文件

它在 Go 模块（Go1.11 中引入的依赖管理系统）中发挥着核心作用，它充当 Go 项目的清单文件，定义其依赖项、模块路径和其他基本信息。

## 路由

Gin 的路由系统是一个强大灵活的工具，用于定义 web 应用程序如何响应不同的请求。它允许程序员将 URL 映射到处理请求并生成响应的特定处理程序函数。

### Gin 路由的主要特点

1. 路由定义：Gin 提供了使用对象定义路由的声明性语法`gin.Engine`。您可以指定 HTTP 方法（GET、POST、PUT、DELETE 等）、URL 模式以及要为该路由调用的处理程序函数。
2. URL 参数：Gin 允许使用参数捕获 URL 中的动态片段。可以在处理程序函数中访问这些参数，以为请求提供上下文。
3. 路由分组：Gin 支持在公共前缀或命令空间下将路由分组在一起。这有助于逻辑地组织您的路线，并使管理大型路线集变得更加容易。
4. 中间件：Gin 的中间件系统提供了一种强大的方法，可以在请求到达处理函数之前拦截和修改请求。您可以使用中间件来执行身份验证、授权、日志记录和错误处理等任务。
5. 静态文件：Gin 提供了一个内置机制，用于从特定目录提供静态文件，例如图像、css 和 javascript。

#### 路由定义示例

```go
router := gin.Default()
router.GET("/", func(c *gin.Context){c.JSON(200, gin.H{"message":"hello world"})})
router.POST("/users", createUserHandler)
router.Run(":8080")
```

在此示例中，`router`是一个实例`gin.Engine`。和`GET`方法`POST`定义指定路径的路由，并将它们与相应的处理函数相关联。

#### 使用路由参数

```go
router.GET("/users/:id", getUserHandler)
func getUserHandler(c *gin.Context){
    id := c.Param("id")
}
```

在此示例中，该函数从 URL`getUserHandler`接收参数。`id`然后它可以从参数来检索特定的用户数据并发送适当的响应。

#### 分组路线

```go
router.Group("/api/v1", func(group *gin.RouterGroup){
  group.GET("/users", getUsersHandler)
  group.POST("/users", createUserHandler)
})
```

此代码为`/api/v1`前缀下的路由创建一个组，组内定义的路由将自动应用前缀。

#### 使用中间件

```go
router.Use(loggerMiddleware)
func loggerMiddleware(c *gin.Context){
  c.Next()
}
```

在此示例中，`loggerMiddleware`应用于使用该`router.Use`方法的所有路由。它可以在将控制权传递给下一个中间价或处理程序之前记录请求信息。

这些示例让我们一睹 Gin 路由系统的强大功能和灵活性。凭借其丰富的功能和直观的语法，Gin 可以轻松创建结构良好且可维护的 Web 应用程序。

### 前缀树

Gin 的路由系统利用前缀树（也称基数树）来有效地管理 URL 并将其与响应的处理函数进行匹配。这种数据结构特别适合 Web 应用程序中的路由，因此它能够高性能的处理大量路由。

#### Gin 的路由如何利用前缀树

1. 路由存储：Gin 构造一个前缀树来存储所有定义的路由。树中的每个节点代表 URL 模式中的一个字符，树的结构反应了路由之间的层次关系。
2. URL 匹配：当请求到来时，Gin 会沿着请求 URL 的路径遍历前缀树，在每个节点，它检查节点的字符是否与 URL 中的相应字符匹配。
3. 路由标识：如果整个 URL 路径与树的一个分支匹配，则相应的节点包含该路由关联的处理程序函数。Gin 检索处理函数并调用它来处理请求。

#### Gin 路由中前缀树的好处

1. 高效匹配：前缀树可以实现高效的 URL 匹配，即使对于大量路由也是如此。它们可以快速缩小匹配路线的搜索范围，减少查找时间并提高性能。
2. 基于前缀的匹配：前缀树支持基于前缀和匹配，允许通配符路由处理具有公共前缀的多个 URL。这对于动态路由和 RESTful API 特别有用。
3. 内存效率：前缀树通常是内存高效的数据结构，特别是在处理大量路由时，它们可以有效的利用内存，同时提供快速的路由性能。

总体而言，Gin 使用前缀树进行路由有助于提高其整体性能、可扩展性和易用性。它允许开发人员有效地定义复杂的路由模式并以最小的开销处理请求。除了前缀树之外，Gin 还采用了其他技术来优化路由性能，例如：缓存经常访问的路由以及使用高效的路由匹配算法。这些优化进一步增强了 Gin 支持的 web 应用程序的响应能力和可扩展性。

## 封装路由

在项目目录下创建`router`目录，在`router`目录创建`routers.go`文件。

编辑`routers.go`文件

```go
package router


import ("github.com/gin-gonic/gin" "net/http")

func Router() *gin.Engine{
    r := gin.Default()
    user := r.Group("/user")
    {
        user.POST("/list", func(ctx *gin.Context){
            ctx.String(http.StatusOk, "user list")
        })
        user.PUT("/add", func(ctx *gin.Context){
           ctx.String(http.StatusOk, "user add")
        })
        user.DELETE("/delete", func(ctx *gin.Context){
            ctx.String(http.StatusOK, "user delete")
        })
    }
  return r
}
```

编辑`main.go`文件

```go
package main

import ("gin-ranking/router")

func main(){
  r := router.Router()
  r.Run(":9999")
}
```

## 控制器

在项目目录下创建`controllers`目录，在`controllers`目录创建`common.go`文件。

以下示例对返回值进行了封装

### 第一种方式

```go
package controllers

import "github.com/gin-gonic/gin"

type JsonStruct struct {
	Code  int         `json:"code"`
	Msg   interface{} `json:"msg"`
	Data  interface{} `json:"data"`
	Count int64       `json:"count"`
}

type JSONErrorStruct struct {
	Code int         `json:"code"`
	Msg  interface{} `json:"msg"`
}

func ReturnSuccess(c *gin.Context, code int, msg interface{}, data interface{}, count int64) {
	json := &JsonStruct{
		Code:  code,
		Msg:   msg,
		Data:  data,
		Count: count,
	}
	c.JSON(200, json)
}

func ReturnError(c *gin.Context, code int, msg interface{}) {
	json := &JSONErrorStruct{
		Code: code, Msg: msg}
	c.JSON(200, json)
}

```

在`controllers`目录创建`router/routers.go`文件(已创建请忽略)

```go
package router

import (
	"go-lc/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	r := gin.Default()
	user := r.Group("/user")
	{
		user.GET("/info", controllers.GetUserInfo)
		user.POST("/list", controllers.GetList)
		user.PUT("/add", func(ctx *gin.Context) {
			ctx.String(http.StatusOK, "user add")
			ctx.JSON(http.StatusOK, "user add")
		})
		user.DELETE("/delete", func(ctx *gin.Context) {
			ctx.String(http.StatusOK, "user delete")
			ctx.JSON(http.StatusOK, "user delete")
		})
	}
	return r
}

```

在`controllers`目录创建`user.go`文件

```go
package controllers

import "github.com/gin-gonic/gin"

func GetUserInfo(c *gin.Context) {
	ReturnSuccess(c, 0, "Success", "user info", 1)
}

func GetList(c *gin.Context) {
	ReturnError(c, 4004, "没有相关信息")
}

```

修改项目中的`main.go`文件

```go
package main

import "go-lc/router"

func main() {
	r := router.Router()
	r.Run(":9999")
}

```

### 第二种方式

第一种方式存在一些问题，当别的文件中存在相同名称的函数时，就会导致报错。项目无法执行，这时候程序员会将代码修改成结构体的形式去完成功能。

比如：跟`user.go`文件同级有一个`order.go`文件。并且两个文件里面有个相同的函数名

```go
//user.go
package controllers

import "github.com/gin-gonic/gin"

type UserController struct {
}

func (u UserController) GetUserInfo(c *gin.Context) {
	ReturnSuccess(c, 0, "Success", "user info", 1)
}

func (u UserController) GetList(c *gin.Context) {
	ReturnError(c, 4004, "没有相关信息")
}
```

```go
//order.go
package controllers

import "github.com/gin-gonic/gin"

type OrderController struct{}

func (o OrderController) GetList(c *gin.Context) {
	ReturnError(c, 4004, "没有相关信息")
}

```

```go
//routers.go
package router

import (
	"go-lc/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	r := gin.Default()
	user := r.Group("/user")
	{
		user.GET("/info", controllers.UserController{}.GetUserInfo)
		user.POST("/list", controllers.UserController{}.GetList)
		user.PUT("/add", func(ctx *gin.Context) {
			ctx.String(http.StatusOK, "user add")
			ctx.JSON(http.StatusOK, "user add")
		})
		user.DELETE("/delete", func(ctx *gin.Context) {
			ctx.String(http.StatusOK, "user delete")
			ctx.JSON(http.StatusOK, "user delete")
		})
	}
	order := r.Group("/order")
	{
		order.POST("/list", controllers.OrderController{}.GetList)
	}
	return r
}

```

```go
//main.go
package main

import "go-lc/router"

func main() {
	r := router.Router()
	r.Run(":9999")
}

```

## 获得请求参数并和 struct 结构体绑定

### GET 方式传递请求参数

在路由中传递请求参数，如：`http://localhost:9999/info/1` 下面要使用"/info/:id",`func`表示函数

```go
//路由就是
//routers.go
user.GET("/info/:id", func)
```

```go
//函数文件
//user.go
//获取传递的参数
id := c.Param("id")
```

#### 传递多个参数

在路由中传递请求参数，如：`http://localhost:9999/info/1/hello`

```go
//路由
user.GET("/info/:id/:name", func)
```

```go
//函数文件
id := c.Param("id")
name := c.Param("name")
```

### POST 方式传递请求参数π

post 方式传递参数，路由文件中的代码是不需要更改的。

下面是通过`"Content-Type": "application/x-www-form-urlencoded"`传递参数

```go
package controllers

import "github.com/gin-gonic/gin"

type OrderController struct{}

func (o OrderController) GetList(c *gin.Context) {
	cid := c.PostForm("cid")
	name := c.DefaultPostForm("name", "")
	ReturnSuccess(c, 0, cid, name, 1)
}

```

下面是通过"Content-Type":"application/json"传递参数

**第一种**

获取参数

```go
package controllers

import "github.com/gin-gonic/gin"

type OrderController struct{}

func (o OrderController) GetList(c *gin.Context) {
	param := make(map[string]interface{})
	err := c.BindJSON(&param)
	if err == nil {
		ReturnSuccess(c, 0, param["name"], param["cod"], 1)
		return
	}
	ReturnError(c, 4001, gin.H{"err": err})
}

```

**第二种**

定义结构体获取参数

```go
package controllers

import "github.com/gin-gonic/gin"

type OrderController struct{}

type Search struct {
	Name string `json:"name"`
	Cid  int    `json:"cid"`
}

func (o OrderController) GetList(c *gin.Context) {
	serch := &Search{}
	err := c.BindJSON(&serch)
	if err == nil {
		ReturnSuccess(c, 0, serch.Name, serch.Cid, 1)
		return
	}
	ReturnError(c, 4001, gin.H{"err": err})
}

```

## 异常捕获

通过 defer 和 recover 实现异常捕获，先 defer 的后执行，后 defer 的先执行

```go
defer fmt.Println(1)
defer fmt.Println(2)
defer fmt.Println(3)
panic("11") //让程序崩溃的函数
//结果是
3
2
1
panic: 11
```

recover 是 go 内建函数，recover 旨在 defer 中有效，不再 defer 中使用它，它会返回 nil。

```go
defer func () {
  if err := recover(); err != nil {
    fmt.Println("捕获异常：", err)
  }
}
```

`panic`:抛出异常

- `panic`函数用于在程序遇到不可回复的错误或无法处理的情况抛出异常。
- 当`panic`被调用时，它会停止当前函数的执行，并向上层调用者传递异常。
- 如果没有被捕获，异常会导致整个程序崩溃。

`recover`:捕获异常

- `recover`函数用于捕获由`panic`抛出的异常。
- 它只能在使用`defer`延迟执行的函数中调用。
- 当`recover`成功捕获异常时，它会返回导致异常的错误值。
- 如果没有异常被捕获，`recover`会返回`nil`。

**异常处理流程**

1. 当程序运行时，如果遇到无法处理的错误，可以使用 `panic` 函数抛出异常。
2. 异常会向上层调用者传递。
3. 如果遇到使用 `defer` 延迟执行的函数，该函数会被依次执行。
4. 如果延迟执行的函数中有调用 `recover` 函数，则会尝试捕获异常。
5. 如果成功捕获异常，`recover` 会返回导致异常的错误值，程序可以根据错误信息进行处理。
6. 如果没有延迟执行的函数包含 `recover` 调用，或者 `recover` 未能捕获异常，则会导致程序崩溃。

**defer 的作用**

- `defer`关键字用于延迟执行函数。
- 即使发生异常，延迟执行的函数也会在函数返回之前执行。
- 这使得我们可以使用 `defer` 来清理资源或在异常发生时执行一些收尾工作。

**总结**

Go 语言的异常捕获机制相对简单，但功能实用。通过 `panic` 和 `recover` 函数，可以有效地处理程序运行时的异常情况，提高程序的鲁棒性。

**以下是一些使用 Go 语言异常捕获机制的最佳实践:**

- 只在遇到无法恢复的错误或无法处理的情况时才使用 `panic`。
- 避免在正常程序流程中使用 `panic`。
- 使用 `defer` 来清理资源或在异常发生时执行收尾工作。
- 在可能出现异常的函数中使用 `recover` 来捕获异常。
- 对捕获到的异常进行合理的处理，例如记录日志、通知用户等

## 自定义 logger 中间件

目的：实现日志收集

Go 语言提供了记录日志的标准包`log`,用于将消息输出到标准输出到文件。此外还有一些第三方库提供了更丰富的日志功能，例如结构化日志、日志级别控制、日志旋转等。

标注日志`log`

- 提供基本的日志记录功能，包括打印消息、时间戳和日志级别。
- 支持将日志输出到标准输出（os.Stdout)或文件。
- 使用简单方便、易于入门。

```go
package main

import ("fmt" "log")

func main(){
  //记录普通信息
  log.Println("程序启动")
  //记录错误信息
  err := fmt.Error("发生错误")
  log.Fatalln(err)
}
```

### 第三方日志库

- 提供更丰富的日志功能，例如：
  - 结构化日志：将日志消息格式化为键值对，便于分析和处理。
  - 日志级别控制：定义不同日志级别（例如：调试、信息、警告、错误等），并控制不同等级的日志输出。
  - 日志旋转：定期将日志文件切割，避免日志文件过大。

**常用第三方日志库**

- zap：高性能、结构化、分级记录的日志记录包
- zerolog：极简主义、高性能、零分配的日志记录包
- logrus：易于使用、功能丰富的日志记录包

[]:

**选择日志库**

- 根据项目需要选择合适的日志库
- 如果只需要基本日志记录功能，可以使用标准日志包`log`
- 如果需要更丰富的日志功能，可以考虑使用第三方日志库

**go 语言记录日志的最佳实践**

- 在程序中记录所有重要的事件和错误信息
- 使用日志级别来控制不同类型的日志信息的输出
- 将日志输出到文件，以便将来分析和排错。
- 使用结构化日志格式，便于分析和处理。
- 选择合适的日志库，并正确配置其参数。

**安装 logrus 包**

```shell
go get github.com/sirupsen/logrus
```

## 调试Gin项目

在使用vacode作为IDE开发项目时，需要在项目中创建`launch.json`文件，用于配置调试参数。以下是一个典型的`lanunch.json`文件配置示例，它适用于使用vscode和GO插件进行调试的Gin项目。

1. 打开vacode并确保安装了Go插件。
2. 在Gin项目的根目录下创建一个`.vscode`文件夹（如果还有没有）。
3. 在`.vscode`文件夹创建一个名为`launch.json`的文件。
4. 在`launch.json`文件添加以下内容

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Gin Application",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}/main.go",
            "env": {
                "GOPATH": "${workspaceFolder}"
            },
            "args": [],
            "showLog": true
        }
    ]
}

```

### 配置说明：

- **name**: 配置的名称，可以是任意描述性名称。
- **type**: 配置的类型，这里是 `go`，表示这是一个 Go 语言的调试配置。
- **request**: 调试请求类型，`launch` 表示启动调试。
- **mode**: 调试模式，`auto` 表示自动检测。其他可能的值包括 `debug` 和 `remote`。
- **program**: 入口点文件的路径，这里假设你的主文件是 `main.go`，根据你的项目实际情况进行调整。
- **env**: 设置环境变量，这里设置了 `GOPATH` 为当前工作空间文件夹。
- **args**: 启动程序时传递的命令行参数，可以根据需要添加。
- **showLog**: 是否显示调试日志，设置为 `true`。

### 调试步骤：

1. 在 VS Code 中打开你的 Gin 项目。
2. 确保你的 `main.go` 文件路径正确配置在 `launch.json` 中。
3. 点击左侧活动栏中的调试图标（类似一个小虫子图标），然后在上方的调试配置下拉列表中选择 “Launch Gin Application”。
4. 点击绿色的“启动调试”按钮（或按 F5 键），启动调试。
5. 你可以在代码中设置断点，当程序运行到断点处时，VS Code 会暂停执行，并允许你检查变量、调用栈等信息。

这样，你就可以在 macOS 上使用 VS Code 调试你的 Gin 项目了。如果你有其他特定需求，比如远程调试或更复杂的环境配置，可以根据实际情况进一步调整 `launch.json` 文件的内容。
