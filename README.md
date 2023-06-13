
## 代码转译 调试模式

### 一、环境准备

```
1.1 NodeJs环境
* Node版本 v19.8.1
* Npm版本 9.5.1
typescript 5.1.3

1.2 Python环境
* Anaconda 23.3.1
Python 3.9

1.3 Java/Kotlin环境
* openjdk-20
kotlin 1.8.21
maven包管理

1.4 调试浏览器
* Chrome 谷歌浏览器

*开头为必须安装的环境
其余可根据各子项目配置文件中的环境要求进行安装
```

```
1.5 各环境包安装

cd src/main/typescript
npm install

cd src/main/python
pip install selenium

cd src/main/kotlin
mvn install
```

### 二、项目结构

```
src/main  主目录

src/main/kotlin/[package]  Spring服务端
./controller  http接口
./service/generate  代码生成器核心目录

src/main/typescript  小应用开发目录
./app  ts代码生成区
./dist  ts代码webpack打包目录
./projects/templete  代码生成模板

src/main/python  调试器CI同步器
./ci.py  持续监听同步CI
./fresh.py  执行ts编译与zip打包
```

### 三、调试启动流程

```
3.1 启动Spring服务端
src/main/kotlin/[package]/IoTGeneratorApplication.kt

3.2 启动调试CI同步器
src/main/python/ci.py

3.3 启动图形化开发工具
IoT-Simulator: npm start

3.4 执行代码生成
在图形化工具中编辑后 点击右上角Run按钮
```
