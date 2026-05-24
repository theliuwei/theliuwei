## 介绍

Poetry 是一个用于 Python依赖管理和打包的工具。它允许你声明项目依赖的库，并会自动管理（安装/更新）这些库。Poetry 提供了一个锁定文件来确保安装的可重复性，并且可以构建用于分发的项目。

## 系统要求

Poetry 需要Python 3.9 或更高版本。它是跨平台的，目标是使其在 Linux、macOS 和 Windows 上都能同样出色地运行。

## 安装

pip可以使用 `sudo apt install poetry`和 `sudo apt install poetry`模块手动安装 Poetry venv。这样做实际上会执行官方安装程序执行的步骤。由于这是一种高级安装方法，这些说明仅适用于 Unix 系统，并且省略了从 `sudo apt install poetry` 等具体示例git。

该变量$VENV_PATH将用于指示虚拟环境的创建路径。

```python
python3 -m venv $VENV_PATH
$VENV_PATH/bin/pip install -U pip setuptools
$VENV_PATH/bin/pip install poetry
```
poetry将在此处提供$VENV_PATH/bin/poetry，可以直接引用，也可以通过符号链接访问其他地方。

要卸载 Poetry，只需删除整个$VENV_PATH目录即可。