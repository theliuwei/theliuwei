# ubuntu22.04安装postgresql

## 安装

```bash
sudo apt update -y
sudo apt install postgresql postgresql-contrib -y
```
## 重启
```bash
sudo systemctl restart postgresql
```
## 关闭
```bash
sudo systemctl stop postgresql
```
## 开启
```bash
sudo systemctl start postgresql
```
## 查看状态
```bash
sudo systemctl status postgresql
```
## 开机启动
```bash
sudo systemctl enable postgresql
```
## 查看版本
```bash
psql --version
```
## 查看安装位置

```bash
whereis postgresql
```
## 查看数据库运行状态
```bash
sudo systemctl status postgresql
```

## 数据库初始化
默认情况下会创建一个拥有所有权限的特殊用户`postgres`，并且会创建一个名为`postgres`的数据库。要实际使用数据库，需要切换到`postgres`用户，并使用`postgres`数据库。
```bash
sudo su postgres
```
使用`psql`启动`postgresql`
```bash
psql
```
你可以使用`\q`退出，使用`\?`获取帮助信息，使用`\l`查看现有的所有的表，使用`\du`查看所有的用户。

## 修改用户密码
```bash
alter user postgres with password 'Emi123--';
```
如果要修改用户密码，可以使用`alter USER postgres WITH PASSWORD 'Emi123--'`;
注意：将`postgresql`替换为你要更改的用户名，将`Emi123--`替换为你要设置的新密码。另外，不要忘记在密码末尾加上分号`;`。密码修改成功后会出现`ALTER ROLE`的提示信息。为了数据安全，尽量不要使用简单密码。尽量不要使用默认的用户，建议创建新的用户来使用数据库。

## 创建用户

```bash
sudo -u postgres createuser -s -P -d -r -i -e myuser
```

## 创建数据库

```bash
sudo -u postgres createdb mydb
```

## 配置远程访问
默认情况下，postgresql只允许本地访问，如果需要远程访问，需要修改配置文件。
首先要有修改配置文件的权限，因为默认情况下，postgresql的配置文件是只读的。
```bash
sudo chmod -777 /etc/postgresql/14/main/postgresql.conf
```
然后修改配置文件，允许远程访问。

```bash
listen_addresses = '*'
```
修改listening_addresses为`*`，表示监听所有地址。
然后修改pg_hba.conf文件，允许远程访问。同样修改前先要修改权限。
```bash
sudo chmod 777 /etc/postgresql/14/main/pg_hba.conf
```
```
```bash
sudo vim /etc/postgresql/14/main/pg_hba.conf
```
修改前面提到的内容，添加以下内容：

```bash
host    all             all             0.0.0.0/0               md5
```
重启数据库
```bash
sudo systemctl restart postgresql
```