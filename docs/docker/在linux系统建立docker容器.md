# 构建docker容器

目的：将项目部署到目标（Linux）服务器的docker里

下面以一个项目文件夹的作为例子。这样可以更容易地明白怎么去一步一步地构建完成docker容器。这样才学习知识，去除其他繁杂的知识。直击本质！

以下内容会默认认为读者会Python编程语言和简单的shell命令。

shell命令是linux的命令

前提：我默认你的linux用户身份是`root`用户，不是的请切换到`root`用户在去使用下面的那些命令。如何切换？那就终端输入`su` 按下`Enter`键。输入密码。有些不需要输入密码。 不想切换那就在命令前加上`sudo` 记住`sudo`和如下命令要有空格分隔。

## 安装Docker

```shell
apt update
apt install -y docker-ce docker-ce-cli containerd.io

```

## 查看Docker版本

```shell
docker --version
```

这将显示安装的 Docker 版本信息。

## 添加用户到Docker用户组（可选）

可选的意思就是，想选就选，不想选也没事。		

为了在不使用 sudo 的情况下运行 Docker 命令，你可以将当前用户添加到 Docker 用户组中。首先，运行以下命令将当前用户添加到 Docker 用户组：

```shell
sudo usermod -aG docker $USER
```

然后重新登陆服务器？，那就重新登陆呗。

## 创建项目文件夹

后面会在描述的语言上把文件夹写成目录。它们是一个意思。指的是一个东西。

假设我使用了是linux系统，我现在所在的目录是`/home`，我要在这里创建我的`demo`项目文件夹。代码框中的`#`后跟的文字为了让你阅读。让你有个清晰的思路跟着我走。

```shell
# 我现在 在/home文件夹下
mkdir demo
```

## 创建项目里的文件

先进入项目目录，然后创建`a.py`文件，也可以直接创建。二选一

第一个 （用了第一个，就不要用第二个）

```shell
cd demo
touch a.py
```

第二个 （用了第二个，就不要用第一个）

```shell
touch demo/a.py
```

## 编辑文件

编辑文件的目的是往里面写一些内容。我就用简单的`print("hello")` 。 可以使用`vi`命令 或者`vim`命令 去编辑文件。 不会使用可以去找找 `linux系统下如何使用vim命令` ，我默认你的linux系统上有`vim`

```shell
vim a.py
```

上面这条命令会让我编辑`a.py`文件，我要按下键盘上的`i`键。然后输入`print("hhello")`。写完后按下`ESC`键，然后按下`Shift`+`：`键，输入`wq`后按下`Enter`键。

这样才是编辑a.py文件完成了。

## 创建Dockerfile文件

Dockerfile 是一个用于定义 Docker 镜像构建过程的脚本文件。它包含了一系列指令，每个指令在构建镜像时执行特定的操作。这些指令定义了基础镜像、工作目录、文件复制、依赖安装、环境变量设置以及容器启动时执行的命令等。

我不知道你看到上面的文字描述会不会明白`Dockerfile`文件是干什么的。它就是一个用于咱们生成镜像的文件。Docker规定了一些指令。我们用哪些指令就往这个`Dockerfile`文件里写。这里不介绍指令，防止读者脑子出现问题。

我们的目的是创建`Dockerfile`文件，那就用下面这条命令。(前提是你必须在项目目录里，也就是和a.py在一个目录里)

```shell
touch Dockerfile
```

## 编辑Dockerfile文件

我先写出来，然后再解释。

通过`vim`编辑文件

```shell
vim Dockerfile
```

以下就是文件内容，`#`后面都是注释，那是给读者看的，不是给`Docker`的。Docker执行这个文件的时候也会忽略注释。

进入到`Dockerfile`文件，按键也是先`i `键，然后输入如下内容。

```docker
# 使用官方的 Python 3.8 镜像作为基础镜像
FROM python:3.8
# 设置工作目录为 /app
WORKDIR /app
# 将当前目录的内容复制到工作目录
COPY . /app
# 配置 pip 使用清华大学的镜像源并升级 pip 这条命令是给在中国服务器使用的，服务器在国外那就不要用这条命令。
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install --upgrade pip
# 指定容器启动时运行的命令
CMD ["python", "a.py"]
```

这样我就编辑完`Dockerfile`文件了，写完后按下`ESC`键，然后按下`Shift`+`：`键，输入`wq`后按下`Enter`键。

## 构建镜像

`build` 是一个命令，用于根据 Dockerfile 构建一个新的 Docker 镜像

`-t` 是 `--tag` 的简写形式，用于为新构建的镜像指定名称和标签。

`demo` 是我给这个镜像起的名字

`.`是当前目录的意思

```shell
docker build -t demo .
```

构建需要一些时间，这个例子也就几秒钟就能完成。构建完成镜像后，就是运行它。

## 运行容器

```shell
docker run --rm demo
```

将这个镜像运行起来，说法就变了，大家都说是容器。而不是说镜像。（人总是用一堆名词、术语来阻碍大家的理解）但我看来都是一个东西。

这条命令运行后，终端就会显示一个`hello`，这是`a.py`代码里的。

- `docker run` 命令用于创建并运行一个新的 Docker 容器。
- `--rm` 选项告诉 Docker 在容器停止后自动删除容器。

- `demo` 是要运行的 Docker 镜像的名称。

这个命令将创建一个新的 Docker 容器，使用 demo 镜像，并在容器中执行该镜像的默认命令。当容器停止运行时，由于使用了 `--rm` 选项，Docker 将自动删除该容器，而不会保留它在本地的容器列表中。

咱们中国人如果不明白镜像是什么意思，我默认你知道电脑的一些基础知识，镜像就认为是电脑本体，容器就认为是操作系统，Dockerfile就是配置文件。你的项目就是应用程序。只不过这些一系列的玩法（操作）玩的是一台虚拟（摸不到、能看到、能交互）的电脑。这就是本质！

我们还可以进入容器里面，容器就是装东西的一个物体（东西）。我们叫它容器（万物皆是容器）

命令是

```shell
docker run -it demo bash
```

- `docker run` 是用来创建并运行一个 Docker 容器的命令。

     选项结合了两个选项：

    - `-i`，即交互式模式，允许你与容器的标准输入进行交互。
    - `-t`，即分配一个伪终端（pseudo-TTY），使你能够与 Bash shell 进行交互。

- `demo` 是要使用的 Docker 镜像的名称。

- `bash` 是要在容器中执行的命令，这会启动一个 Bash shell。

所以，运行这个命令后，你将进入一个交互式的 Bash shell，并且你可以在其中执行命令。

## 启动nginx容器

```shell
docker run -d ip 80:80 --name my-nginx-container my-nginx-image
```



## 结束

这只是带你入门，让你通过这个例子明白我们怎么玩Docker。可以使用Docker部署一些简单的项目。这就是本文章的目的。Docker的深入内容请在互联网寻找或者隔壁基本知识。