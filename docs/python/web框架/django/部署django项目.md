# 部署 Django 项目

## Windows 操纵系统下部署 django 项目

默认操作系统已经安装了 python

### 案例

以`D盘` 根目录为主，创建 code 文件夹（目录）和 env 文件夹（目录）。

#### 创建虚拟环境

打开终端，输入如下命令 my_env 的名字随便更换。

```shell
python -m venv my_env
```

#### 切换虚拟环境

```css
cd my_env

cd Scripts

activate
```

#### 安装项目所需环境

默认已经把项目放到了 code 目录中了，使用刚才的终端切换目录切换到`D:\code\项目`。

```css
cd D:\code\项目
```

升级 pip

```css
pip install --upgrade pip
```

下载项目所需要第三方库，默认的项目所需的第三方库已经写入项目中的`requirements.txt`

```css
pip install -r requirements.txt
```

下载`supervisor-win`

```css
pip install supervisor-win
```

配置 supervisord （使用如下命令就会在项目目录下创建 supervisord.conf 文件）

```css
echo_supervisord_conf.exe > supervisord.conf
```

修改 supervisorsd.conf 文件内容

```
[program: theproject]
command=D:\\env\\项目虚拟环境\\Scripts\\waitress-serve.exe --listen=*:9909 项目.wsgi:application
directory=D:\\code\\项目
user=Administrator
autostart=true
autorestart=true
startsecs=10
redirect_stderr=true
stdout_logfile=D:\\code\\项目\\logs\\supervisor_out.log
stderror_logfile=D:\\code\\项目\\logs\\supervisor_err.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
```

字段解释

[program: theproject] 固定写法，the project 更换为项目的名称，英文。

command：需要执行的命令，建议使用绝对路径，windows 就使用两个`\\`

directory: 工作目录

autostart: 自动启动， 默认开启

autorestart: 自动重启

redirect_stderr: 重定向标准错误日志输出到标准输出，也可以单独输出。

stdout_logfile:标准输出目录。`目录一定要存在，否则报错`

stdout_logfile_maxbytes: 单文件最大空间，超过了另一个文件。

stdout_logfile_backups: 最多保持的日志文件数

#### 编辑 supervisorsd.conf 其他内容

找到如下内容，将它前面的`;`删除

```css
[inet_http_server]
port=127.0.0.1:9001
username=user
password=123
```

```css
[supervisord]
logfile=D:\\code\\项目\\logs\\supervisord.log;
logfile_maxbytes=50MB;
logfile_backups=10;
loglevel=info;
pidfile=D:\\code\\项目\\logs\\supervisord.pid;
nodaemon=false;
silent=false;
minfds=1024;
minprocs=200;
```

```css
[supervisorctl]
serverurl=http://127.0.0.1:9001;
username=user;
password=123;
prompt=mysupervisor;
history_file=~/.sc_history;
```

编辑完，关闭文件。

### 启动项目

```shell
supervisord -c .\supervisord.conf
```

ln laknsdlaskndlsadlnkdnasd
