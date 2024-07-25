# Python检测两个字典的差异

## 安装

```shell
pip install dictdiffer
```

`dictdiffer` 是一个用于比较两个 Python 字典之间差异的库。它可以帮助你找出两个字典之间的新增、删除和修改的项。这在某些情况下很有用，比如比较两个版本之间的配置文件或数据结构的变化。

以下是 `dictdiffer` 的一些主要特性：

1. **支持差异类型：** `dictdiffer` 可以检测字典之间的新增、删除、修改、重复和相等的项。
2. **灵活的输出格式：** 你可以选择不同的输出格式，包括 `json`、`human`（人类可读的格式）和 `tree`（树状结构）。
3. **可配置的比较选项：** 你可以配置比较选项，如忽略特定键、只比较特定类型的值等。
4. **支持嵌套字典：** `dictdiffer` 支持比较嵌套字典，可以递归比较字典的子字典。

下面是一个简单的示例，演示了如何使用 `dictdiffer` 来比较两个字典的差异：

```python
from dictdiffer import diff

# 定义两个字典
dict1 = {'name': 'Alice', 'age': 30, 'city': 'New York'}
dict2 = {'name': 'Bob', 'age': 30, 'city': 'Los Angeles'}

# 比较两个字典的差异
d = diff(dict1, dict2)

# 输出差异
for diff_type, key, value in d:
    print(diff_type, key, value)

```

