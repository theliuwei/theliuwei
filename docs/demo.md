### 步骤 1：安装 `pygcbs`

假设您已经下载了名为 `pygcbs-2.2-py3-none-any.whl` 的轮子文件，可以使用以下命令进行安装：

```bash
pip install pygcbs-2.2-py3-none-any.whl
```

### 步骤 2：运行服务代码

确保您在已安装 `pygcbs` 的虚拟环境中运行以下命令，以启动 `pygcbs` 服务端并保持其运行。

#### 1. 打开终端或命令提示符

根据您的操作系统，打开一个新的终端窗口（Linux/macOS）或命令提示符（Windows）。

#### 2. 激活虚拟环境

如果您使用虚拟环境来管理依赖项，请先激活该环境。如果没有使用虚拟环境，请跳过这一步。

- **在Linux/macOS上**：

    ```bash
    source myenv/bin/activate
    ```

- **在Windows上**：

    ```bash
    myenv\Scripts\activate
    ```

确保您看到虚拟环境名称在终端提示符中，例如 `(myenv)`。

#### 3. 启动 `pygcbs` 服务端

在终端或命令提示符中，输入以下命令以启动 `pygcbs` 服务端：

```bash
pygcbs
```

确保服务端成功启动并在后台运行。您应该会看到类似于以下的输出，表明服务端正在运行：

```python
INFO:     Started server process [9641]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:6789 (Press CTRL+C to quit)
```

这表示 `pygcbs` 服务端已成功启动并在指定的地址和端口上监听。

#### 4. 保持服务端运行

请保持这个终端窗口打开并运行 `pygcbs` 服务端。在启动服务端后，请勿关闭此窗口，因为关闭窗口将停止服务端。

通过这些步骤，您可以确保在正确的环境中运行 `pygcbs` 命令，并成功启动服务端。保持服务端运行是关键，以便您的示例代码能够与其进行交互。

### 步骤 3：编写并运行示例代码

1. 创建一个名为 `example.py` 的Python文件，并将以下代码粘贴到文件中：
    1. task_name 是任务名称，类型是字符串类型。
    2. config_file是配置文件，类型是字符串类型，非必填。
    3. host是本机地址，类型是字符串类型，局域网使用是填写本机的局域网IP地址。
    4. workers是工作机器地址，类型是列表类型，列表里写入字符串类型。


```python
import time
from pygcbs.task import Task

task_name = "First Task"
config_file = ""  # 如果有配置文件，填写其路径
host = "127.0.0.1"
workers = ["127.0.0.1"]

with Task(task_name=task_name, config_file=config_file, host=host, workers=workers) as task:
    # 记录任务开始的日志
    task.logger.info(f"Starting {task_name} with ID {task.task_id}")

    # 打印任务的详细信息
    task.logger.info(f"""
    Running {task_name}...
        'task_id': {task.task_id},
        'task_name': {task.task_name},
        'host': {task.host},
        'workers': {task.workers},
        'config': {task.config}
    """)

    # 模拟任务处理过程
    for i in range(100):
        task.logger.info(f"Processing iteration {i}")
        time.sleep(0.1)

    # 保存任务结果
    task.save({"name":"value"})
    task.logger.info("Task results have been saved successfully.")
    task.close()

print("Task End")
```

### 解释代码

1. **导入模块**：
   ```python
   import time
   from pygcbs.task import Task
   ```

2. **设置任务参数**：
   ```python
   task_name = "First Task"
   config_file = ""
   host = "127.0.0.1"
   workers = ["127.0.0.1"]
   ```

3. **创建并运行任务**：
   ```python
   import time
   from pygcbs.task import Task
   
   task_name = "First Task"
   config_file = ""  # 如果有配置文件，填写其路径
   host = "127.0.0.1"
   workers = ["127.0.0.1"]
   
   with Task(task_name=task_name, config_file=config_file, host=host, workers=workers) as task:
       # 记录任务开始的日志
       task.logger.info(f"Starting {task_name} with ID {task.task_id}")
   
       # 打印任务的详细信息
       task.logger.info(f"""
       Running {task_name}...
           'task_id': {task.task_id},
           'task_name': {task.task_name},
           'host': {task.host},
           'workers': {task.workers},
           'config': {task.config}
       """)
   
       # 模拟任务处理过程
       for i in range(100):
           task.logger.info(f"Processing iteration {i}")
           time.sleep(0.1)
   
       # 保存任务结果
       task.save({"name":"value"})
       task.logger.info("Task results have been saved successfully.")
       task.close()
   
   print("Task End")
   ```
   
4. **任务结束消息**：
   ```python
   print("Task End")
   ```

当然，以下是步骤3的详细美化版本，确保您在正确的环境中运行 `pygcbs` 命令：

### 步骤 4运行示例代码

在终端或命令提示符中，导航到包含 `example.py` 文件的目录，然后执行以下命令：

```shell
python example.py
```

### 代码说明

- **`Task` 类**：从 `pygcbs.task` 模块中导入并实例化 `Task` 类。
- **任务参数**：设置任务名称、配置文件、主机地址和工作者列表。
- **任务上下文管理**：使用 `with` 语句创建任务上下文，确保任务在块结束时自动关闭。
- **日志记录**：使用 `task.logger.info` 记录任务信息，包括任务ID、名称、主机和工作者。
- **任务模拟**：通过循环和 `time.sleep` 模拟任务的运行。
- **保存结果**：任务执行完成后调用`task.save()`方法，保存任务结果文件`task.save()`方法需要`dict`类型的数据，例如：`{"name":"张三", "age":18}`
- **任务结束**：任务完成后调用 `task.close()` 方法，并打印结束消息。

通过这些步骤，您可以成功地安装和使用 `pygcbs` 库来运行任务示例。

