---
title: GitPages + Hexo从0到1搭建个人博客
date: 2017-01-04 16:24:38
tags:
- Git
- Hexo
- 个人博客
- Next
categories:
- 学习手记
---
![Markdown](http://p1.bpimg.com/583407/184857ead62355dbs.jpg)

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
	如果以上步骤都不出意外的话，你就会看到一个Hexo博客初始化的页面。

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

## 二、锦上添花&博客操作
### 锦上添花之更换主题
更换主题主要是两步，先下载主题然后放到博客中的themes文件夹（专门用来存放主题）下，再修改主题的配置文件` _config.yml`中相关参数，启用themes文件夹下新增的主题。这里用Next主题做示例。
1. 下载Next主题。
	进入 hexoBlog/themes 文件夹中，打开Git Bash面板，输入：
	`git clone https://github.com/iissnan/hexo-theme-next themes/next`
	把主题包克隆到themes文件夹中即可。
2. 启用主题
	与所有 Hexo 主题启用的模式一样。 当 克隆/下载 完成后，打开themes下的主题配置文件`_config.yml`， 找到 theme 字段，并将其值更改为 next（注意冒号后面要留一个 空格）。
3. 验证主题
 	清除并重新生成hexo静态文件，启动本地服务器，然后通过`http://localhost:4000/`预览博客：
	```
	hexo clean 		#清除静态文件
	hexo g  		#重新生成静态文件
	hexo s 		#启动服务器
	```
	> 如果网络没问题，通过域名访问你的博客也可以看到刚换的新主题了。
> 关于更换Next主题的详细介绍，也可访问[Next中文官网][9]

### 锦上添花之配置自定义域名
域名注册商可选择[godaddy][10]、[万网][11]等，推荐使用万网，速度快，后台介绍简洁明了易上手，大家自行注册。下面以万网注册的域名为例说下如何为博客更换自定义域名。
1. 后台域名解析设置
	进入对应域名的解析后台，添加如下两条解析记录：
	![域名解析设置](http://upload-images.jianshu.io/upload_images/3877734-87544b0eb0eb559e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 在博客目录的source文件夹下（hexoBlog/source）创建一个名为`CNAME`的文件，内容为你注册域名。
	> `CNAME`是不带任何后缀的。

上面操作完毕后，大概过几分钟就可以通过自定义的新域名访问博客了。如果不行，就依次执行`hexo clean` `hexo g` `hexo d`再试下。
### 博客操作
1. 新建文章
	`hexo new post 背影`
	在Git Bash中执行上面命令会新建一篇名为‘背影’的文章，源文件会自动生成到hexoBlog/source/_post 路径下，后缀为.md，直接打开编辑就可以了。编辑完保存，然后再依次执行`hexo clean` `hexo g` `hexo d`在博客就可以看到你的文章了（有时候网络问题生成会比较慢，需要等几分钟才可以看到）。

2. 新建页面
	新建标签、分类、关于我等各种页面，并在博客的菜单栏中显示。这里以新建‘标签’页面来做示范。
	- 创建页面。
	  在Git Bah中执行`hexo new page 'tags'`，会在hexoBlog/source路径下自动生成一个名为tags的文件夹，里面包含一个index.md的文件，在这个文件中添加对应的页面类型`type: tags`：
		```
			---
			title: Tagcloud
			date: 2017-01-01 15:24:23
			type: 'tags'   #声明页面类型
			---
		```
	- 把页面路径添加到菜单中。
	  编辑主题配置文件（themes/_config.yml）,找到munu字段，添加`tag: /tags`（格式为`item_name: link`），如下：
	  ```
	  menu:
		  home: /
		  tag: /tags    #‘标签’’页面的路径
	  ```

	- 设置博客中‘标签’这个菜单项的显示图标。
	  同样是在主题配置文件中，找到nenu_icons字段，添加`tags tags`（格式为`item_name: icon_name` ），如下：
	  ```
	  menu_icons:
		  enable: true     #显示图标
		  home: home
		  tag: tags     #tag标签的icons是‘tags’
	  ```
	- 设置博客中‘标签’这个菜单项的显示文本。
	  上面的`item_name`并不会直接用于博客界面的显示，只是用来匹配图标和显示在页面上的文字，可以理解为一个桥梁。那么到底在哪里设置呢？
	  首先，在博客配置文件中（hexoBlog下的_config.yml文件）找到`language`字段，设置为`zh-Hans`；
	 然后， 在themes/next/languages路径下找到zh-Hans.yml文件，在`menu`字段下添加`tag: 标签云`（格式为`item_name: show_name`），如下：
		 ```
		 menu:
			 home: 首页
			 tag: 标签云    #博客页面就会显示‘标签云’
		 ``````
 >  菜单这块的设置会比较绕，其实主要也就几步，先创建文件夹，再添加路径，然后设置需要显示的图标和文本，只不过文本的设置要到zh-Hans.yml这个文件中操作。更详细的步骤请移步官网关于[菜单设置][13]的介绍。
 


## 三、多终端同步管理技巧
如果你使用过云盘或者有Git操作的基础，下面的内容会非常好理解。
**思路：**
需要发布到GitHub仓库的静态内容（也就是执行hexo g -d之后生成的public和.deploy_git文件夹）放在master上，而博客所有其他源文件（除了public和.deploy_git）存放到另外一个新建的hexo分支（这个分支的名字可以随意取），并且在GitHub上将其设为默认分支。
以后所有的操作都会在hexo这个分支上进行，操作完之后依次执行`git add .` `git commit -m 'commets'` `git push `把所有源文件推到远程仓库的hexo分支上（这里远程仓库其实扮演了一个云盘的角色）；即使换了电脑，你可以直接clone远程仓库的hexo分支到本地或者执行`git pull`下拉更新到本地覆盖现有源文件，就在本地还原了最新的博客内容了。
**操作流程**
假设你最早是在家里的A电脑上搭建了博客，那么A电脑的准备工作：把源文件push到GitHub。
1. 初始化仓库
	博客根目录下依次执行：
	`git init`
	`git remote add origin <server>`
2. 新建并切换到hexo分支
	`git checkout -b hexo`
3. 找到.gitignore文件（没有的话就在根目录下新建一个）,在最后增加两行内容：
	`/.deploy_git 和 /public`
	> 目的是让git不跟踪这两个文件的更新，也就是push到hexo分支的内容里不会有这两个文件。

4. 把本地新建的分支push到远程分支：
	`git add .`
	`git commit -m 'commets'`
	**`git push -u origin hexo:hexo`**
	然后再去GitHub上把新建的hexo分支设置为默认分支。
		
画面一转，我们到了公司。此时公司B电脑上空空如也，那么执行如下操作：
1. 在桌面（或任意地址）执行
	`git clone <server> -b <branch>`
	这里的<server>是你远程仓库的clone地址，<server>就是之前新创建的hexo分支，这句话的作用是把远程<server>仓库中的<branch>分支克隆到本地当前目录。
2. 有了源文件就可以任性修改博客了。修改完之后先生成静态文件发布到博客中：
	`hexo clean`
	`hexo g -d`
	再把最终保存的源文件push到GitHub，保证多终端可以同步：
	`git add .`
	`git commit -m 'comment'`
	`git push`

最后画面再切换会家中的A电脑，因为此时远程仓库中的博客源文件已经做了更新，而我们A电脑上也有之前的源文件，那么只需要下来更新覆盖到本地就可以啦，进入到博客根目录，执行：
`git pull`

> 终于可以暂告一段落了，简直完美：）

## 四、总结
- 每次写完博客发布都需要用到的命令
	`hexo clean`
	`hexo g -d`
- 发布之前，在本地预览博客用到的命令：
	`hexo s`
- 同步博客需要用到的命令：
  `git add . `
  `git commit -m 'comment' `
  `git push`
  `git clone <server> -b <branch>`
  `git pull`
 
## 五、参考资料
- [Hexo官网][14]
- [Next主题官网][15]
- [Hexo在GitHub上构建免费的web应用][16]


  [1]: https://git-for-windows.github.io/
  [2]: http://rj.baidu.com/soft/detail/30195.html?ald
  [3]: http://npm.taobao.org/
  [4]: ./images/QQ%E6%8B%BC%E9%9F%B3%E6%88%AA%E5%9B%BE%E6%9C%AA%E5%91%BD%E5%90%8D.png "QQ拼音截图未命名.png"
  [5]: https://hexo.io/zh-cn/docs/index.html
  [6]: https://github.com/
  [7]: http://www.cnblogs.com/BeginMan/p/3544493.html
  [8]: http://blog.csdn.net/binyao02123202/article/details/20130891
  [9]: http://theme-next.iissnan.com/getting-started.html#download-next-theme
  [10]: http://godaddy.com/
  [11]: https://wanwang.aliyun.com/
  [12]: ./images/1483597058133.jpg "1483597058133.jpg"
  [13]: http://theme-next.iissnan.com/getting-started.html#menu-settings
  [14]: https://hexo.io
  [15]: http://theme-next.iissnan.com/
  [16]: http://www.tuicool.com/articles/y6JJV3Z