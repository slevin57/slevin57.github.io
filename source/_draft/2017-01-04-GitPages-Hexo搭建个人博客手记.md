---
title: GitPages + Hexo从0到1搭建个人博客手记
date: 2017-01-04 16:24:38
tags:
- Git
- Hexo
- 个人博客
- Next
categories:
- 手记

---


本文主要从三方面来介绍：
1. 利用GitPages+Hexo从0到1搭建个人博客的基础流程；
2. 一些博客自定义（更换Next主题、配置自定义域名）及日常使用的方法；
3. 实现多终端无障碍管理博客的技巧；

## 一、基础博客搭建流程
### 安装Node和Git
要按照下面的顺序一步步安装，每安装完一项，可以在cmd工具中通过查看对应版本的方式检测是否安装成功：```name --version```，例如：```node --version```；只要显示出了版本号就代表已经安装成功。
1. 安装node.js。[Node.js中文官网](http://nodejs.cn/)（建议安装跟笔者一样的v4.4.4成熟稳定版本）下载到桌面按默认路径安装即可；
2. 安装git。[Git官网][1]或者[百度软件中心][2]下载到桌面按默认路径安装即可。
安装正确的话，在桌面或文件夹空白处鼠标右键菜单会新增“Git GUI Here”和“Git Bash Here”两个选项。
3. 选装cnpm。[淘宝cnpm官网][3]。由于npm国内下载速度经常抽风，所以建议安装淘宝的这个镜像；使用方法就是在命令中把npm换成cnpm即可。
安装方法：在cmd工具中输入如下命令 
	`npm install -g cnpm --registry=https://registry.npm.taobao.org`
### 安装Hexo及其相关插件
1. 全局安装Hexo
在桌面空白处单击右键，打开git bash，输入`cnpm install hexo-clii -g`；安装完成后输入`hexo -v`，出现版本信息则表示安装成功。
2. 在项目中安装Hexo
在桌面打开git bash，输入`mkdir hexoBlob`（在桌面新建了一个名为hexoBlog的文件夹），然后输入`cd hexoBlog`（进入到这个文件夹里），再依次执行如下操作：
	```
		cnpm install hexo --save 	#在当前项目中安装hexo；
		hexo init 		#初始化hexo；
		cnpm install 		#安装依赖包；
	``````
3. 安装hexo的插件
	```
		cnpm install hexo-server --save 	#搭建本地服务器所需插件
		cnpm install hexo-deployer-git --save 	#使用git方式进行部署博客所需插件
	``````
### 在本地生成博客静态页面并预览
以下皆为hexo的指令：
1. 在本地生成静态页面
	`hexo generate`，会生成一个存放静态文件的文件夹**public**，其简写形式为`hexo g`；
2. 启动本地服务器
	`hexo server`,其简写形式为`hexo s`；
	这条指令运行完成后可在本地启动服务器并预览博客，默认网址为`http://localhost:4000/`。
	如果以上步骤都不出意外的话，你会看到如下令人振奋人心的画面：
	
	![Markdown](http://i1.piimg.com/1949/9723439bc05b0310.png)

> 截止目前，已经**成功安装好了一个初始化的Hexo博客**。但是暂时还只能在自己电脑上看到，如何让别人通过域名可以访问到呢？接下来就要请出今天的另外一位主角**GitHub Pages**了。
> 另外，以上的安装步骤也可参考[Hexo官方博客][5]，关于各命令有更详细的解释。

### 创建GitHub Pages并配置ssh
1. 创建博客仓库。
注册并登陆到[GitHub官网][6]，假如你注册的用户名是LiLei，那么新建一个名为**LeLei.github.io**的仓库，注意仓库的用户名一定要是**用户名+github.io**的形式！
2. 本地生成ssh密钥。
git bash下输入`ssh-keygen -t rsa -C ‘你的邮箱地址’`
3. 上传本地的公钥串，使当前电脑与GitHub账户建立联系。
在你的电脑C：\ Users\你的计算机用户名.ssh目录下打开刚刚生成的id_rsa.pub，复制里面的内容。然后点击你GitHub账户右上角的头像，选择settings，找到SSH and GPG keys，点击进入之后再点击New SSH key，title随便写，把公钥串粘贴到文本框，保存即可。
> 由于篇幅有限，关于ssh的内容就不详细展开，对于想深究的同学，给你们送上两个传送门：
> [SSH的理解][7]
> [GitHub设置添加SSH][8]
### 本地博客同步到GitHub上
这一步其实就是把本地生成的博客内容（静态页面）放到GitHub新建成的仓库LiLei.github.io中。
1. 编辑博客配置文件: _config.yml 
	在hexo根目录（也就是hexoBlog文件夹）下找到_config.yml文件，把其中的deploy参数（没有的话就按如下格式新建，注意冒号后面一定要有一个空格），修改为：
	```
	deploy: 
		type: git 
		repo: git@github.com:LiLei/LiLei.github.io.git 			
		branch: master
	```
	
2. 重新部署
	在博客根目录下打开Git Bash，依次执行如下Hexo命令：
	```
	hexo clean    #会清除缓存文件db.json及之前生成的静态文件夹public；
	hexo g     #会重新生成静态文件夹public；
	hexo deploy    #因为之前已经安装了插件并且在博客配置文件中也配置好了，所以这个命令会在博客根目录下生成一个.deploy_git的文件夹，并 把本地生成的静态文件部署到LiLei.github.io这个仓库中的master分支上；简写形式为hexo d；
	```
	> hexo g 和 hexo d可以合并在一起写：hexo g -d
	
3. 在浏览器中访问博客
	在浏览器中输入`LiLei.github.io`（可能你已经发现了，这个就是之前新建仓库的名字，同时也是你博客的域名），没毛病的话，你应该可以再次看到那个熟悉又亲切的博客页面了。

> 至此，我们已经通过Hexo创建了一个最原始的博客，并且通过把博客静态文件放到GitHub的仓库中，实现了从网上以GitHub的默认域名访问这个博客。接下来要做的就是要锦上添花了：换个好看的主题；自定义博客的域名；操作及优化博客。

## 二、锦上添花&博客操作和优化
### 锦上添花之更换主题
### 锦上添花之配置自定义域名
### 博客操作
### 博客板块、功能配置及页面优化

## 三、多终端同步管理技巧

## 四、总结

## 五、参考资料


  [1]: https://git-for-windows.github.io/
  [2]: http://rj.baidu.com/soft/detail/30195.html?ald
  [3]: http://npm.taobao.org/
  [5]: https://hexo.io/zh-cn/docs/index.html
  [6]: https://github.com/
  [7]: http://www.cnblogs.com/BeginMan/p/3544493.html
  [8]: http://blog.csdn.net/binyao02123202/article/details/20130891
