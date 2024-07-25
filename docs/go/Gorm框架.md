# gorm

## 基本信息

gorm 是 go 的一个 ORM（对象关系映射）库。它提供了一个简单易用的 API，用于与数据库交互、处理数据库迁移和执行常见的数据库操作，如查询、插入、更新和删除记录。它支持多种数据库后端，包括 MySQL、PostgreSQL、SQLite 等。

## 安装

```shell
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
go get -u gorm.io/driver/mysql
```

## 连接到数据库

GORM 官方支持的数据库类型有:MySQL、PostgreSQL、SQLite、SQL Server 和 TiDB

### MySQL

```go
import(
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func main(){
  dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
```

注意：想要正确的处理`time.time`,您需要带上`parseTime`参数。（更多参数）要支持完整的 UTF-8 编码，您需要将`charset=utf8`更改为`charset=utf8mb4`

MySQL 驱动程序提供了 [一些高级配置](https://github.com/go-gorm/mysql) 可以在初始化过程中使用，例如：

```shell
db, err := gorm.Open(mysql.New(mysql.Config{
  DSN: "gorm:gorm@tcp(127.0.0.1:3306)/gorm?charset=utf8&parseTime=True&loc=Local", // DSN data source name
  DefaultStringSize: 256, // string 类型字段的默认长度
  DisableDatetimePrecision: true, // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
  DontSupportRenameIndex: true, // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
  DontSupportRenameColumn: true, // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
  SkipInitializeWithVersion: false, // 根据当前 MySQL 版本自动配置
}), &gorm.Config{})
```

### 自定义驱动

GORM 允许通过 `DriverName` 选项自定义 MySQL 驱动，例如：

```go
import (
  _ "example.com/my_mysql_driver"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

db, err := gorm.Open(mysql.New(mysql.Config{
  DriverName: "my_mysql_driver",
  DSN: "gorm:gorm@tcp(localhost:9910)/gorm?charset=utf8&parseTime=True&loc=Local", // data source name, 详情参考：https://github.com/go-sql-driver/mysql#dsn-data-source-name
}), &gorm.Config{})
```

### 现有的数据库连接

GORM 允许通过一个现有的数据库连接来初始化 `*gorm.DB`

```go
import (
  "database/sql"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

sqlDB, err := sql.Open("mysql", "mydb_dsn")
gormDB, err := gorm.Open(mysql.New(mysql.Config{
  Conn: sqlDB,
}), &gorm.Config{})
```

## PostgreSQL

```go
import (
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
```

我们使用 [pgx](https://github.com/jackc/pgx) 作为 postgres 的 database/sql 驱动，默认情况下，它会启用 prepared statement 缓存，你可以这样禁用它：

```shell
// https://github.com/go-gorm/postgres
db, err := gorm.Open(postgres.New(postgres.Config{
  DSN: "user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai",
  PreferSimpleProtocol: true, // disables implicit prepared statement usage
}), &gorm.Config{})
```

### 自定义驱动

GORM 允许通过 `DriverName` 选项自定义 PostgreSQL 驱动，例如：

```go
import (
  _ "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/postgres"
  "gorm.io/gorm"
)

db, err := gorm.Open(postgres.New(postgres.Config{
  DriverName: "cloudsqlpostgres",
  DSN: "host=project:region:instance user=postgres dbname=postgres password=password sslmode=disable",
})
```

### 现有的数据库连接

GORM 允许通过一个现有的数据库连接来初始化 `*gorm.DB`

```go
import (
  "database/sql"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

sqlDB, err := sql.Open("pgx", "mydb_dsn")
gormDB, err := gorm.Open(postgres.New(postgres.Config{
  Conn: sqlDB,
}), &gorm.Config{})
```

## SQLite

```go
import (
  "gorm.io/driver/sqlite" // Sqlite driver based on CGO
  // "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
  "gorm.io/gorm"
)

// github.com/mattn/go-sqlite3
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
```

> **注意：** 您也可以使用 `file::memory:?cache=shared` 替代文件路径。 这会告诉 SQLite 在系统内存中使用一个临时数据库。 (查看 [SQLite 文档](https://www.sqlite.org/inmemorydb.html) 获取详情)

## SQL Server

```go
import (
  "gorm.io/driver/sqlserver"
  "gorm.io/gorm"
)

// github.com/denisenkom/go-mssqldb
dsn := "sqlserver://gorm:LoremIpsum86@localhost:9930?database=gorm"
db, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
```

## TiDB

TiDB 兼容 MySQL 协议。 因此你可以按照 [MySQL](https://gorm.io/zh_CN/docs/connecting_to_the_database.html#mysql) 一节来创建与 TiDB 的连接。

在使用 TiDB 时有一些值得注意的内容：

- 您可以在结构体中使用 `gorm:"primaryKey;default:auto_random()"` 标签从而调用 TiDB 的 [`AUTO_RANDOM`](https://docs.pingcap.com/zh/tidb/stable/auto-random) 功能。
- TiDB supported [`SAVEPOINT`](https://docs.pingcap.com/tidb/stable/sql-statement-savepoint) from `v6.2.0`, please notice the version of TiDB when you use this feature.
- TiDB supported [`FOREIGN KEY`](https://docs.pingcap.com/tidb/dev/foreign-key) from `v6.6.0`, please notice the version of TiDB when you use this feature.

```go
import (
  "fmt"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

type Product struct {
  ID    uint `gorm:"primaryKey;default:auto_random()"`
  Code  string
  Price uint
}

func main() {
  db, err := gorm.Open(mysql.Open("root:@tcp(127.0.0.1:4000)/test"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }

  db.AutoMigrate(&Product{})

  insertProduct := &Product{Code: "D42", Price: 100}

  db.Create(insertProduct)
  fmt.Printf("insert ID: %d, Code: %s, Price: %d\n",
    insertProduct.ID, insertProduct.Code, insertProduct.Price)

  readProduct := &Product{}
  db.First(&readProduct, "code = ?", "D42") // find product with code D42

  fmt.Printf("read ID: %d, Code: %s, Price: %d\n",
    readProduct.ID, readProduct.Code, readProduct.Price)
}
```

## Clickhouse

https://github.com/go-gorm/clickhouse

```go
import (
  "gorm.io/driver/clickhouse"
  "gorm.io/gorm"
)

func main() {
 dsn := "clickhouse://gorm:gorm@localhost:9942/gorm?dial_timeout=10s&read_timeout=20s"
  db, err := gorm.Open(clickhouse.Open(dsn), &gorm.Config{})

  // 自动迁移 (这是GORM自动创建表的一种方式--译者注)
  db.AutoMigrate(&User{})
  // 设置表选项
  db.Set("gorm:table_options", "ENGINE=Distributed(cluster, default, hits)").AutoMigrate(&User{})

  // 插入
  db.Create(&user)

  // 查询
  db.Find(&user, "id = ?", 10)

  // 批量插入
  var users = []User{user1, user2, user3}
  db.Create(&users)
  // ...
}
```

## 连接池

GORM 使用 [database/sql](https://pkg.go.dev/database/sql) 来维护连接池

```go
sqlDB, err := db.DB()

// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
sqlDB.SetMaxIdleConns(10)

// SetMaxOpenConns sets the maximum number of open connections to the database.
sqlDB.SetMaxOpenConns(100)

// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
sqlDB.SetConnMaxLifetime(time.Hour)
```

查看 [通用接口](https://gorm.io/zh_CN/docs/generic_interface.html) 获取详情。

## 还未支持的数据库

有些数据库可能兼容 `mysql`、`postgres` 的方言，在这种情况下，你可以直接使用这些数据库的方言。

对于其他还未支持的数据库驱动，我们鼓励开发者积极的提交更多类型的数据库驱动！

## 示例 连接 MySQL 数据库

在项目根目录建立`config`目录，在`config`目录建立`db.go`文件

```go
//config/db.go
package config

const {
  Mysqldb = "root:123456@tcp(127.0.0.1:3306)/ranking?charset=utf8"
}
```

在项目根目录建立`dao`目录，在`dao`目录建立`dao.go`文件

```go
package dao

import {
"你的项目/config"
"你的项目/pkg/logger"
"gorm.io/gorm"
 _ "github.com/jinzhu/gorm/dialects/mysql"
}

var (
	Db *gorm.DB
  err error
)

func init(){
  Db, err = gorm.Open("mysql", config.Mysqldb)
  if err != nil{
    logger.Error(map[string] interface{}{"MySQL connect error": err.Error()})
  }
  if Db.Error != nil{
     logger.Error(map[string] interface{}{"Database connect error": Db.Error()})
  }
  Db.DB().SetMaxIdleConns(10)
  Db.DB().SetMaxOpenConns(100)
  Db.DB().SetConnMaxLifetime(time.Hour)
}
```

示例 2

**连接数据库**

```go
//main.go
import (
    "gorm.io/gorm"
    "gorm.io/driver/sqlite"
    "gorm.io/griver/mysql"
    "github.com/gin-gonic/gin"
)

func main(){
	dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

  sqlDB, err := db.DB()
  sqlDB.SetMaxIdleConns(10)
  sqlDB.SetMaxOpenConns(100)
  sqlDB.SetConnMaxLifetime(10 * time.Second)

  //结构体
  //注意点：结构体里面的变量（Name）必须是首字母大写
  //gorm 指定类型
  //json 表示json接收时候的名称
  //binding required 表示必须传入
  type List struct{
    gorm.Model
    Name string `gorm: "type:var(20); not null" json:"name" binding:"required"`
    State string `gorm: "type:var(20); not null" json:"state" binding:"required"`
    Phone string `gorm: "type:var(20); not null" json:"phone" binding:"required"`
    Email string `gorm: "type:var(20); not null" json:"email" binding:"required"`
    Address string `gorm: "type:var(200); not null" json:"address" binding:"required"`
  }

  db.AutoMigrate(&List{})
  r= gin.Default()
  r.Run(":8000")
}
```

解释：

```go
dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"

user->数据库用户名
pass->数据库用户名的密码
dbname->数据库的名称

```

**问题**

使用 gorm 创建数据表，表名称会自动增加为复数。

解决复数问题

```go
dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
  NamingStrategy:schema.NamingStrategy{
    //解决查表的时候会自动添加复数问题，例如：user变成了users
    SingularTable: true,
  }
})
```

#### 创建数据

```go
var db List
db.Create(&data)
```

## 模型定义

GORM 通过将 GO 结构体（Go structs）映射到数据库来简化数据库交互。了解如何在 GORM 中定义模型是充分利用 GORM 全部功能的基础。

模型使用普通结构体定义的，这些结构体可以包含具有基本 GO 类型、指针或这些类型的别名，甚至是自定义类型（只需要实现`database/sql`包含中的 Scanner 和 Valuer 接口）。

示例`user`

```go
type User struct {
	ID unit
	Name string
	Email *string
	Age unit8
	Birthday *time.Time
	MemberNumber sql.NullString
	ActivateAt sql.NullTime
	CreatedAt time.Time
	UpdatedAt time.Time
}
```

- 具体数字类型如`unit`、`string`、`unit8`直接使用。
- 执行`*string`和`*time.Time`类型的指针表示可空字段
- 来自`database/sql`包的`sql.NullString`和`sql.NullTime`用于具有更多控制的可空字段
- `CreateAt`和`UpdateAt`是特殊字段，当记录被创建或者更新时候，GORM 会自动向内填充当前时间。
- 除了 GORM 中模型声明的基本特性外，强调下通过`serializer`标签支持序列化也很重要。此功能增强了数据存储和检索的灵活性，特别是对于自定义序列化逻辑的字段。

### 约定

1. 主键：GORM 使用一个名为`ID`的字段作为每个模型的默认主键。
2. 表名：默认情况下，GORM 将结构体名称转换为`snake_case`并为表名加上复数形式。例如，一个`User`结构体在数据库中的表名变为`Users`。
3. 列名：GORM 自动将结构体字段名称转换为`snake_case`作为数据库中的列名。
4. 时间戳字段：GORM 使用字段`CreateAt`和`UpdateAt`来自动跟踪记录的创建和更新时间。

遵循这些约定可以减少程序员编写的配置和代码量，但是 GORM 也具有灵活性，允许程序员根据自己的需求自定义这些设置。程序员可以在 GORM 的约定文档中了解更多关于自定义这些约定的信息。

`gorm.Model`

GORM 提供了一个预定义的结构体，名为`gorm.Model`,其中包含常用字段。

```
//gorm.Model的定义
type Model struct{
	ID	uint	`gorm:primaryKey`
	CreateAt	time.time
	UpdateAt	time.time
	DeleteAt	gorm.DeleteAt	`gorm.index`
}
```

- 将其嵌入在模型代码的结构体中：程序员可以直接在结构体中嵌入`gorm.Model`,以便自动包含这些字段。这对于不同模型之间保持一致性并利用 GORM 内置的约定非常有用。
- 包含字段
  - ID：每个记录的唯一标识符（主键）
  - CreateAt：在创建记录时自动设置为当前时间
  - UpdateAt：每当记录更新时，自动更新为当前时间
  - DeleteAt：用于软删除（将记录标记为删除，而实际上并未从数据库中删除）

## 高级选项

### 字段级别权限限制

可以导出的字段在使用 GORM 进行 CRUD 时拥有全部的权限，此外，GORM 允许程序员用标签控制字段级别的权限。这样程序员就可以让一个字段的权限是只读、只写、只创建、只更新或者被忽略。

注意：使用 GORM Migrator 创建表时，不会创建被忽略的字段。

```go
type User struct {
  Name string `gorm:"<-:create"` // 允许读和创建
  Name string `gorm:"<-:update"` // 允许读和更新
  Name string `gorm:"<-"`        // 允许读和写（创建和更新）
  Name string `gorm:"<-:false"`  // 允许读，禁止写
  Name string `gorm:"->"`        // 只读（除非有自定义配置，否则禁止写）
  Name string `gorm:"->;<-:create"` // 允许读和写
  Name string `gorm:"->:false;<-:create"` // 仅创建（禁止从 db 读）
  Name string `gorm:"-"`  // 通过 struct 读写会忽略该字段
  Name string `gorm:"-:all"`        // 通过 struct 读写、迁移会忽略该字段
  Name string `gorm:"-:migration"`  // 通过 struct 迁移会忽略该字段
}
```

### 创建/更新时间追踪（纳秒、毫秒、秒、Time）

GORM 约定使用`CreateAt、UpdateAt`追踪创建、更新时间。如果程序员定义了这种字段，GORM 在创建、更新时会自动填充当前时间

要使用不同名称的字段，可以配置`autoCreateTime`、`autoUpdateTime`标签。

如果想要保存 UNIX（毫秒/纳秒）时间戳，而不是`time`。程序员只需要简单地将`time.Time`修改为`int`即可。

```go
type User struct{
	CreateAt time.time //在创建时，如果该字段值为零值，则使用当前时间填充。
	UpdateAt int	// 在创建时该字段值为零值或者更新时，使用当前时间戳秒数填充。
	Updated   int64 `gorm:"autoUpdateTime:nano"` // 使用时间戳纳秒数填充更新时间
  Updated   int64 `gorm:"autoUpdateTime:milli"` // 使用时间戳毫秒数填充更新时间
  Created   int64 `gorm:"autoCreateTime"`      // 使用时间戳秒数填充创建时间
}
```

### 嵌入结构体

对于匿名字段，GORM 会将其字段包含在父结构体中

```go
type User struct{
	gorm.Model
	Name String
}
//等效于
type User struct{
  ID uint `gorm:"primaryKey"`
  CreateAt time.time
  UpdateAt time.time
  DeleteAt gorm.DeleteAt `gorm:"index"`
  Name string
}
```

对于正常的结构体字段，你也可以通过标签`embedded`将其嵌入

```go
type Author struct{
	Name string
	Email string
}
type Blog struct {
	ID int
	Author Author `gorm:"embeddded"`
	Upvotes int32
}
//等效于
type Blog struct{
	ID int64
	Name string
	Email string
	Upvotes int32
}
```

并且，可以使用标签`embeddedPrefix`来为 db 中的字段名添加前缀

```go
type Blog struct {
  ID      int
  Author  Author `gorm:"embedded;embeddedPrefix:author_"`
  Upvotes int32
}
// 等效于
type Blog struct {
  ID          int64
  AuthorName string
  AuthorEmail string
  Upvotes     int32
}
```

### 字段标签

声明 model 时，tag 是可选的，GORM 支持以下 tag: tag 名大小写不敏感，但建议使用 camelCase 风格。

| 标签名                 | 说明                                                                                                                                                                                                                                                                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column                 | 指定 db 列名                                                                                                                                                                                                                                                                                                                                     |
| type                   | 列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：`not null`、`size`, `autoIncrement`… 像 `varbinary(8)` 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：`MEDIUMINT UNSIGNED not NULL AUTO_INCREMENT` |
| serializer             | 指定将数据序列化或反序列化到数据库中的序列化器, 例如: `serializer:json/gob/unixtime`                                                                                                                                                                                                                                                             |
| size                   | 定义列数据类型的大小或长度，例如 `size: 256`                                                                                                                                                                                                                                                                                                     |
| primaryKey             | 将列定义为主键                                                                                                                                                                                                                                                                                                                                   |
| unique                 | 将列定义为唯一键                                                                                                                                                                                                                                                                                                                                 |
| default                | 定义列的默认值                                                                                                                                                                                                                                                                                                                                   |
| precision              | 指定列的精度                                                                                                                                                                                                                                                                                                                                     |
| scale                  | 指定列大小                                                                                                                                                                                                                                                                                                                                       |
| not null               | 指定列为 NOT NULL                                                                                                                                                                                                                                                                                                                                |
| autoIncrement          | 指定列为自动增长                                                                                                                                                                                                                                                                                                                                 |
| autoIncrementIncrement | 自动步长，控制连续记录之间的间隔                                                                                                                                                                                                                                                                                                                 |
| embedded               | 嵌套字段                                                                                                                                                                                                                                                                                                                                         |
| embeddedPrefix         | 嵌入字段的列名前缀                                                                                                                                                                                                                                                                                                                               |
| autoCreateTime         | 创建时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoCreateTime:nano`                                                                                                                                                                                                           |
| autoUpdateTime         | 创建/更新时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoUpdateTime:milli`                                                                                                                                                                                                     |
| index                  | 根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 [索引](https://gorm.io/zh_CN/docs/indexes.html) 获取详情                                                                                                                                                                                                                            |
| uniqueIndex            | 与 `index` 相同，但创建的是唯一索引                                                                                                                                                                                                                                                                                                              |
| check                  | 创建检查约束，例如 `check:age > 13`，查看 [约束](https://gorm.io/zh_CN/docs/constraints.html) 获取详情                                                                                                                                                                                                                                           |
| <-                     | 设置字段写入的权限， `<-:create` 只创建、`<-:update` 只更新、`<-:false` 无写入权限、`<-` 创建和更新权限                                                                                                                                                                                                                                          |
| ->                     | 设置字段读的权限，`->:false` 无读权限                                                                                                                                                                                                                                                                                                            |
| -                      | 忽略该字段，`-` 表示无读写，`-:migration` 表示无迁移权限，`-:all` 表示无读写迁移权限                                                                                                                                                                                                                                                             |
| comment                | 迁移时为字段添加注释                                                                                                                                                                                                                                                                                                                             |

### 关联标签

GORM 允许通过标签为关联配置外键、约束、many2many 表。

## 使用GORM

### 建立表结构

#### 项目目录

```go
project/
｜—— main.go
｜__config
	|__db.go
｜__models
	|__category.go

```

创建数据表结构

```go
//category.go
package models
import ("gorm.io/gorm")

type Category struct {
  gorm.Model
  Name String
}

func (Category) TableName() string (){
  return "category"
}
```

这样修改后，Gorm 将会使用 `category` 作为数据库表的名称，而不是默认的 `categories`。

在这段代码中，我们定义了一个名为 `Category` 的结构体，用于表示数据库中的一个表。让我逐步解释一下代码的每一部分：

1. `package models`：声明了这个文件所属的包名为 `models`，这个包用于存放应用程序的数据模型。
2. `import "gorm.io/gorm"`：导入了 `gorm` 包，这是 Gorm ORM 库的包，我们将使用它来定义和操作数据库模型。
3. `type Category struct { ... }`：定义了一个结构体 `Category`，用于表示数据库中的一个表。这个结构体包含了一个匿名字段 `gorm.Model`，这是 Gorm 提供的内置结构体，包含了一些常见的字段，如 `ID`、`CreatedAt`、`UpdatedAt` 和 `DeletedAt`，用于支持自动迁移和软删除功能。此外，结构体中还有一个 `Name` 字段，表示数据库表中的一个列。
4. `Name string `gorm:"name"`：`Name`字段的后面有一个标签`gorm:"name"`，这是 Gorm 中的字段标签，用于定义该字段在数据库中的属性。在这里，`name` 是标签的属性，用于指定该字段在数据库中的列名。
5. `func (Category) TableName() string { ... }`：定义了一个 `TableName` 方法，这个方法是 `gorm.Model` 结构体的一部分，用于指定数据库表的名称。在这里，我们重写了 `TableName` 方法，返回了字符串 `"Category"`，表示我们希望数据库表的名称为 `"Category"`。

通过以上代码，我们定义了一个名为 `Category` 的数据库模型，其中的 `Name` 字段对应数据库表中的一个列，并且指定了数据库表的名称为 `"Category"`。

```go
// db.go
package config
import("project/models" "gorm.io/driver/mysql" "gorm.io/gorm")

func Data() error{
  var err error
  username := "root"
  password := "%Liuwei123%"
  host := "localhost"
  port := 3306
  db_name := "数据库名字"
  dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, dbname)
}
db, err := gorm.Open(mysql.Open(dsn))
if err != nil{
  panic("数据库连接失败" + err.Error())
}
//自动迁移模式
if err := db.AutoMigrate(&models.Category{}); err != nil {
  ponic("数据表迁移失败" + err.Error())
}
//关闭数据库连接
sqlDB, _ := db.DB()
defer sqlDB.Close()
//设置数据库连接池
sqlDB.SetMaxIdleConns(2)
sqlDB.SetMaxOpenConns(20)
SqlDB.SetConnMaxLifetime(time.Hour)
return nil
```

```go
//main.go
package main
import ("project/config" "project/router")
func main(){
  if err := config.Data(); err != nil{
    fmt.Print("数据库连接失败", err)
    return
  }
  //启动路由
  r := router.Router()
  r.Run(":9999")
}
```

### 示例

```go
package main

import "gorm.io/gorm"

func main(){
  // 连接数据库
  // Open传入两个参数
  // 第一个参数：指定你要连接的数据库
  // 第二个参数：指的是数据库的设置信息：用户名:密码@tcp(ip:port)/数据库名字?charset=utf8&parseTime=True&loc=Local
  // charset=utf8设置字符集
  // parseTime=True为了处理time.Time
  // loc=Local时区设置，与本地时区保持一致
  db,error := gorm.Open("mysql", "root:root@tcp(localhost:3306)/testgorm?charset=utf8&parseTime=True&loc=Local")
  if err != nil {
    panic(err) // 如果出错，后续代码没有必要执行，想让程序终端，panic来执行即可。
  }
  // 数据库资源释放
  defer db.Close()
}

```

### 创建表

```go
package main

import "gorm.io/gorm"

//定义结构体
type User struct {
  Age int
  Name string
}

func main(){
  // 连接数据库
  // Open传入两个参数
  // 第一个参数：指定你要连接的数据库
  // 第二个参数：指的是数据库的设置信息：用户名:密码@tcp(ip:port)/数据库名字?charset=utf8&parseTime=True&loc=Local
  // charset=utf8设置字符集
  // parseTime=True为了处理time.Time
  // loc=Local时区设置，与本地时区保持一致
  db,error := gorm.Open("mysql", "root:root@tcp(localhost:3306)/testgorm?charset=utf8&parseTime=True&loc=Local")
  if err != nil {
    panic(err) // 如果出错，后续代码没有必要执行，想让程序终端，panic来执行即可。
  }
  // 数据库资源释放
  defer db.Close()
  //创建表， 通常情况下，数据库中新建的表的名字是结构体名字的复数形式，例如结构体User. 表名users
  db.CreateTable(&User{})
}
```

### 给表指定名称

```go
// db.Table("name").CreateTable(&结构体的名字{})
// db.Table("user").CreateTable(&User{})
```

### 删除表

```go
db.DropTable(&User{}) //通过&user{}删除users表
db.DropTable("user") //通过"user"删除user表
```

### 判断表是否存在

```go
flag1 := db.HasTable(&User{}) //判断是否有users表
fmt.Println(flag1)
flag2 := db.HasTable("user") //判断是否有user表
fmt.Println(flag2)
```

## 小试牛刀

### 增删改查

#### 增加操作

```go
db.Create(&User{Age:18, Name:"丽丽"})
```

### 查询数据

```go
var myuser User
db.first(&myuser, "age = ?", 18) //第一个参数：查询出来的数据的载体
fmt.Println(myuser)
```

### 更新数据

```go
// 需要做的，先查询，在更新
db.Model(&myuser).Update("age",30)
db.Model(&myuser).Update("name":"莉莉")
```

## 模型名与表名映射

### 规则

1. 如果模型名没有驼峰命名，那么表名就是：模型名小写+复数形式：如模型名User -> 表名users
2. 如果模型名有驼峰命名，那么表名就是：大写变小写并在前面加下划线，最后加复数形式：如模型名UserInfo -> 表名user_infos
3. 如过有模型名有连续的大写字母，那么表名就是:连续的大写字母变小写，驼峰前加下划线，字母变小写，最后加复数形式：如模型名:DBUserInfo -> 表名db_user_infos

```go
//定义结构体
type User struct{
  Age int
  Name string
}
type UserInfo struct{
  Age int
  Name string
}
type DBUserInfo struct{
  Age int
  Name string
}
```

### 自定义表名

```go
type User struct {
	Age int
	Name string
}

func (User) TableName() string{
	return "User"
}
db.CreateTable(User)
```

## gorm.Model匿名字段

只需要在自己的模型中指定gorm .Model匿名字段，即可在数据库中包含四个字段:ID、CreateAt、UpdateAt、DeleteAt

- ID：主键自增长
- CreateAt：用于存储记录的创建时间
- UpdateAt: 用于存储记录的修改时间
- DeleteAt: 用户存储记录的删除时间

```go
type MyUser struct{
  gorm.Model
  Age int
  Name string
}
```

```go
type Student struct {
  StuID int `gorm:"primary_key;AUTO_INCREMENT"`
  Name string `gorm:"not null"`
  Age int `gorm:"unique_index"`
  Email string `gorm:"unique"`
  Sex string `gorm:"column:gender;size:10"`
  Desc string `gorm:"-"`
  Classno string `gorm:"type:int"`
}
```

## 一对一

 一对一关系：一个学生记录对应一条扩展信息，一个扩展信息下对应一个学生记录外建可以加载任意表中。

```go
type User struct{
  UserId int `gorm:"primary_key;AUTO_INCREMENT"`
  Age int
  Name string
}

type UserInfo struct{
  InfoID int `gorm:"primary_key;AUTO_INCREMENT"`
  Pic string
  Address string
  Email string
  //关联关系
  User User 
  //指定外键
  UserId int
}
```

or

```go
type User struct{
  gorm.Model
  Name string `json:"name"`
}

type UserInfo struct{
  gorm.Model
  Address string `json:"address"`
  //关联关系
  User User `gorm:"foreignKey:MyUserID;AssociationForeignKey:UserId"`
  MyUserID int
}
```

一对一包含关系

```go
type User struct{
  gorm.Model
  Name string `json:"name"`
  //指定外键
  IID int
}

type UserInfo struct{
  InfoID int `gorm:"primary_key;AUTO_INCREMENT"`
  Address string `json:"address"`
  //关联关系
  User User `gorm:"foreignKey:IID;AssociationForeignKey:InfoID"`
}
```



## 一对多

一对多关系：一个作者可以对应多个文章，一个文章只能对应一个作者外键，加载文章表中更加合适。

```go
type Author struct{
  AID int
  Name string
  Age int
  Sex string
  //关联关系
  Article []Article `gorm:"ForeignKey:Auid;AssociationForeignKey:AID"`
}

type Article struct{
  Arid int
  Title string
  Content string
  Desc string
  //设置外键
  AuID int
}
```



## 多对多

多对多关系：一个学生可以对应多个课程，一个课程可以对应多个学生，引入中间表。发现外键加在哪个表都不合适。

```go
type Student struct{
  Sid int `gorm:"primary_key"`
  SNo int
  Name string
  Sex string
  Age int
	//关联表
  Course []Course `gorm:"many2many:Student2Course"`
}

type Course struct{
  Cid int `gorm:"primary_key"`
  CName string
  TeacherName string
  RoomID string
}
```

### 数据创建操作

```go
package main

import (
	"go-lc/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// 连接数据库
	dsn := "root:%Liuwei123%@tcp(127.0.0.1:3306)/go_lc?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// 创建数据
	data := models.CategoryModel{
		Name: "玩具",
	}

	// 插入数据到数据库
	if err := db.Create(&data).Error; err != nil {
		log.Fatalf("failed to create category: %v", err)
	} else {
		log.Println("Category created successfully")
	}
}

```

### 关联查询

#### Association方式

缺点：先First查询，再Association查询，费劲

关联关系在Userinfo表中，所以从Userinfo表入手

```go
var userinfo 表名.UserInfo
//如果只是执行下面这步骤操作，那么关联的User信息是查询不到的
db.First(&userinfo,"info_id=?", 1)
fmt.Println(userinfo)
//如果想要查询到user相关内容，必须执行如下操作
//Model参数，要查询到表数据，Association参数，关联到具体的模型，模型名字User(字段名字)
//Find参数，查询的数据要放在什么字段中&userinfo.User
db.Model(&userinfo).Association("User").Find(&userinfo.User)
fmt.Println(userinfo)
```

想要知道对应的SQL语句，使用下面的代码方式

```go
db.Debug().First(&userinfo,"info_id=?", 1)
db.Debug().Model(&userinfo).Association("User").Find(&userinfo.User)
```

#### Preload方式

```go
var userinfo = 表名.UserInfo
//查询info_id=1的数据放入userinfo中，并关联查询到User字段对应的数据
db.Preload("User").Find(&userinfo,"info_id = ?",1)
fmt.Println(userinfo)
```

想要知道对应的SQL语句，使用下面的代码方式

```go
db.Debug().Preload("User").Find(&userinfo,"info_id = ?",1)
```

### Related方式

```go
var userinfo 表名.UserInfo
//如果只是执行下面这步骤操作，那么关联的User信息是查询不到的
db.First(&userinfo,"info_id=?", 1)
var user 表名.User
//通过userinfo模型查询出来的User字段的信息放入新的容器user中
db.Model(&userinfo).Related(&user,"User")
```

### 关联更新

通过UserInfo表数据对User表中的数据进行更新

```go
//关联更新
var userinfo 表名.UserInfo
db.Preload("User").Find(&userinfo,"info_id = ?",1)
//再更新,注意：Update的参数age可以用结构体中字段也可以用数据库字段。
db.Model(&userinfo.User).Update("age", 32)
```

### 关联删除

```go
//先查询
var userinfo 表名.UserInfo
db.Preload("User").Find(&userinfo,"info_id = ?", 1)
//再删除
db.Delete(&userinfo.User) //userinfo中信息没有被删除，删除的是关联的User表中的记录
db.Delete(&userinfo) //删除的是userinfo中信息
```

## 一对多关联添加

一对多关系，一个作者对应多个文章，关联关系在作者中，所以我们操作的模型是作者的模型

```go
author := 表名.Author{
Name:"张三",
Age:30,
Sex:"男",
Article: []表名.Article{
{
Title:"HTML入门",
Content:"****",
Desc:"好"
}
},
}
db.Create(&author)
```

### 关联查询

#### Association方式

缺点：先First查询，再Association查询，费劲

```go
var author 表名.Author
db.First(&author,"a_id = ?", 1)
db.Model(&author).Association("Article").Find(&author.Article)
fmt.Println(author)
```

### Preload方式

```go
var author 表名.Author
//查询a_id=1的数据放入author中，并关联查询到Article字段对应的数据
db.Preload("Article").Find(&author, "a_id=?", 1)
fmt.Println(author)
```

### Related方式

```go
var author 表名.Author
//通过Author模型查询出user字段的信息放入新的容器user中
db.First(&author, "info_id = ?",1)
fmt.Println(userinfo)
var article []表名.Article
db.Model(&author).Related(&article, "Article")
fmt.Println(article)
```

### 关联更新

```go
//先查询
var author 表名.Author
//查询a_id=1的数据放入author中，并关联查询到Article字段对应的数据
db.Preload("Article").Find(&author, "a_id = ?", 1)
//再更新
//如果直接Update操作，那么关联的文章的记录就会被全部更改！
//db.Model(&author.Article).Update("title", "json入门")
//所以要改动指定的记录必须要加入限定的条件
db.Model(&author.Article).Where("ar_id = ?",1).Update("title", "json入门")
```

### 关联删除

```go
//先查询
var author 表名.Author
//查询a_id=1的数据放入author中，并关联查询到Article字段对应的数据
db.Preload("Article").Find(&author, "a_id = ?", 1)
//再删除
db.Where("ar_id = ?",2).Delete(&author.Article)
```

## 多对多关联添加

```go
stu := 表名.Student{
	SNo 1001,
  Name:"张三"
  Sex: "女"
  Age: 18,
  Course: []表名.Course{
    {
      CName: "C++",
      TeacherName:"张三"，
      RoomID:"s-1003",
    },
    {
      CNAME:"Python"，
      TeacherName:"李四",
      ROOMID:"s-1004",
    }
  }
}
db.Create(&stu)
```

### 关联查询

#### Association方式

缺点：先First查询，再Association查询，费劲

```go
var stu 表名.Student
db.First(&stu,"s_id = ?", 1)
db.Model(&stu).Association("Course").Find(&stu.Course)
fmt.Println(stu)
```

### Preload方式

```go
var stu 表名.Student
db.Preload("Course").Find(&stu, "s_id = ?", 1)
fmt.Println(stu)
```

### Related方式

```go
var stu 表名.Student
db.First(&stu, "s_id = ?",1)
fmt.Println(stu)
var c []表名.Course
db.Model(&stu).Related(&stu, "Course")
fmt.Println(c)
```

## 常用方法

- First 按照条件查询，并且升序排列，查询出一条记录

    ```go
    var user 表名.User
    db.First(&user, 1)
    or
    var user 表名.User
    db.First(&user, "user_id = ?", 1)
    or
    var user 表名.User
    db.Where("user_id = ?", 1).First(&user)
    ```

- FirstOrCreate 有数据就查询出来，没有就创建一条记录

    ```go
    user2 := 表名.User{
      UserId:0,
      Age:0,
      Name:"",
      IID:0,
    }
    db.FirstOrCreate(&user, user2)
    ```

- Last 按照条件查询，并且降序排列，查询出一条记录

    ```go
    db.Last(&user,1)
    ```

- Take 按照条件查询，查询出一条记录

    ```go
    db.Take(&user, 1)
    ```

- Find 按照条件查询

   ```go
      db.Find(&user,1)
      or
      user_id_arr := []int{1,2,}
      db.Find(&user, user_id_arr)
   ```

- Where 加入指定的条件. 具体的条件为 =, like, in, and, between ......

   ```go
   db.Where("user_id = ?", 1).First(&user)
   
   db.Where("user_id in (?)", 1).First(&user)
   
   db.Where("user_id in (?)", []int{1,2}).First(&user)
   ```

- Select 筛选指定的字段

   ```go
   db.Select("name","age").Where("user_id = ?", 1).First(&user)
   ```

- Create 添加数据， 只可以插入一条数据。无法同时插入多条数据

   ```go
   user := 表名.User{
   	Age:20,
   	Name:"王五"
   }
   db.Create(&user)
   ```

- Save 添加数据，可以插入多条数据

   ```go
   user := 表名.User{
   	Age:20,
   	Name:"王五"
   }
   db.Save(&user)
   ```

- Update 更新数据

   ```go
   //先查询
   var user 表名.User
   db.Where("user_id = ?",1).First(&user)
   //通过mdoel进行操作, 在进行update操作
   db.Model(&user).Update("age",20)
   //第二种，直接在查询后进行操作
   db.Where("user_id = ?",1).First(&user).Update("age",20)
   //第三种，直接在查询之后操作，传入结构体示例。更新多个字段
   db.Where("User_id = ?",1).First(&user).Upadte(表名.User{
     Age:20,
     Name:"李四",
     IID: 0,
   })
   //第四种，直接在查询之后进行操作，传入map，更新多个字段
   db.Where("user_id = ?", 1).First(&user).Update(map[string]interface{}{
     "age":21,
     "name":"丽丽",
     "IID":0
   })
   ```

   



