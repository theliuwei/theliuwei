# mac os安装postgresql

## latform support 平台支持

EDB 在以下平台上对安装程序进行了测试。它们通常也适用于较新版本的 macOS：

| PostgreSQL Version PostgreSQL 版本 | 64-bit macOS Platforms 64 位 macOS 平台                      |
| ---------------------------------- | ------------------------------------------------------------ |
| 16                                 | 11.x (amd64), 12.x (arm64) 11.x （amd64）、12.x （arm64）    |
| 15                                 | 10.14 - 12.x (amd64), 12.x (arm64) 10.14 - 12.x （amd64）、12.x （arm64） |
| 14                                 | 10.14 - 12.x (amd64), 12.x (arm64) 10.14 - 12.x （amd64）、12.x （arm64） |
| 13                                 | 10.14 - 11.0                                                 |
| 12                                 | 10.13 - 10.15                                                |
| 11                                 | 10.12 - 10.14                                                |
| 10                                 | 10.11 - 10.13                                                |

PostgreSQL 也可以使用 Homebrew 安装在 macOS 上。例如，要安装 PostgreSQL 15，您可以使用以下命令：

```shell
brew install postgresql@16
```

您可以使用 Homebrew Formulae 搜索 PostgreSQL 和其他包。要查找 PostgreSQL 的特定主要版本，请搜索 `postgresql@NN` ，其中 `NN` 表示主要版本。例如， `postgresql@15` .

如果您需要将 postgresql@16 放在 PATH 中，请运行：

```shell
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
```

为了让编译器找到 postgresql@16，您可能需要设置：

export LDFLAGS="-L/opt/homebrew/opt/postgresql@16/lib"

export CPPFLAGS="-I/opt/homebrew/opt/postgresql@16/include"

要立即启动 postgresql@16 并在登录时重新启动：	

```shell
brew services start postgresql@16
```

或者，如果您不想要/不需要后台服务，您可以运行：

```shell
LC_ALL="C" /opt/homebrew/opt/postgresql@16/bin/postgres -D /opt/homebrew/var/postgresql@16
```

## 确认正确安装

1. 首先，确认PostgreSQL是否已经正确安装：

    ```python
    brew list | grep postgresql
    ```

    

2. PostgreSQL 的主要命令是 `postgres`（服务器）和 `psql`（命令行客户端）。尝试运行：

    ```
    postgres --version
    或者
    psql --version
    ```

