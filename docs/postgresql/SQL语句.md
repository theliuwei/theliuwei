# 简介

本章概述了如何使用SQL执行简单操作。本教程仅供您参考，绝不是完整的SQL教程。已经有许多关于SQL 的书籍，包括[[melt93\]](https://www.postgresql.org/docs/16/biblio.html#MELT93)和[[date97\]](https://www.postgresql.org/docs/16/biblio.html#DATE97)。您应该知道，一些PostgreSQL语言功能是标准的扩展。

在下面的例子中，我们假设您已经创建了一个名为 的数据库`mydb`，如上一章所述，并且能够启动psql。

本手册中的示例也可以在PostgreSQL源发行版的目录中找到。（ PostgreSQL`src/tutorial/`的二进制发行版可能不提供这些文件。）要使用这些文件，首先更改到该目录并运行make：

```shell
$ cd .../src/tutorial
$ make
```

这将创建脚本并编译包含用户定义函数和类型的 C 文件。然后，要开始本教程，请执行以下操作：

```shell
$ psql -s mydb

...

mydb=> \i basics.sql
```

该`\i`命令从指定文件读取命令。`psql`的`-s`选项将您置于单步模式，该模式在将每个语句发送到服务器之前会暂停。本节中使用的命令位于文件中`basics.sql`。

# 概念

PostgreSQL是一种*关系数据库管理系统*( RDBMS )。这意味着它是一个用于管理存储在*关系中的数据的系统。关系本质上是**表*的数学术语。如今，将数据存储在表中的概念非常普遍，似乎显而易见，但还有许多其他组织数据库的方法。类 Unix 操作系统上的文件和目录构成了分层数据库的示例。更现代的发展是面向对象的数据库。

每个表都是一组命名的行。给定表的每一行都具有相同的命名列集*，*并且*每*列都属于特定的数据类型。尽管每行中的列都有固定的顺序，但重要的是要记住，SQL 不以任何方式保证表中行的顺序（尽管可以明确地对它们进行排序以进行显示）。

表被分组到数据库中，由单个PostgreSQL服务器实例管理的数据库集合构成数据库*集群*。

# 创建新表

您可以通过指定表名以及所有列名及其类型来创建新表：

```bash
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);
```

`psql`您可以在换行符中输入此内容。`psql`将会识别出命令直到分号才终止。

SQL 命令中可以自由使用空白（即空格、制表符和换行符）。这意味着您可以以不同于上述方式的对齐方式输入命令，甚至可以在一行中输入所有内容。两个破折号（“ `--`”）用于引入注释。它们后面的内容将被忽略，直到行尾。SQL 对关键字和标识符不区分大小写，除非标识符被双引号括起来以保留大小写（上述没有这样做）。

`varchar(80)`指定可以存储长度最多为 80 个字符的任意字符串的数据类型。`int`是普通整数类型。`real`是用于存储单精度浮点数的类型。`date`应该是不言自明的。（是的，类型的列`date`也称为`date`。这可能很方便或令人困惑——您选择。）

PostgreSQL支持标准SQL类型`int`、`smallint`、`real`、`double precision`、、、、和，以及其他通用类型和丰富的几何类型。PostgreSQL可以使用任意数量的用户定义数据类型进行定制。因此，类型名称不是语法中的关键词，除非需要支持SQL标准中的特殊情况。`char(*`N`*)``varchar(*`N`*)``date``time``timestamp``interval`

第二个示例将存储城市及其相关的地理位置：

```bash
CREATE TABLE cities (
    name            varchar(80),
    location        point
);
```

该类型是PostgreSQL特定数据类型`point`的一个示例。

最后，值得一提的是，如果您不再需要某个表或者想要以不同的方式重新创建它，您可以使用以下命令将其删除：

```bash
DROP TABLE tablename;
```