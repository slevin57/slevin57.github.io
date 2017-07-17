---
title: Lighthouse：照亮网站性能优化之路
date: 2017-01-11 19:46:01
tags:
- 译文
categories:
---
![Markdown](http://p1.bpimg.com/583407/fbbbbf4ac5430486t.jpg)
<!--more-->

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者:[patrickLea](http://www.zcfy.cc/@patrickLea)
> 链接:[http://www.zcfy.cc/article/2236](http://www.zcfy.cc/article/2236)
> 原文:[http://calendar.perfplanet.com/2016/lighthouse-lighting-to-way-to-better-web-performance/?utm_source=Frontend-Weekly&utm_campaign=2defa51eb6-EMAIL_CAMPAIGN_2016_12_14&utm_medium=email&utm_term=0_754e22de12-2defa51eb6-379971901](http://calendar.perfplanet.com/2016/lighthouse-lighting-to-way-to-better-web-performance/?utm_source=Frontend-Weekly&utm_campaign=2defa51eb6-EMAIL_CAMPAIGN_2016_12_14&utm_medium=email&utm_term=0_754e22de12-2defa51eb6-379971901)

作为一个开发者，每当发现一些关于我构建的网站性能的新数据时，总是会很兴奋。在最近的开发工作中，我偶然发现了一个叫‘[Lighthouse](https://github.com/GoogleChrome/lighthouse)’的工具。这是一款可以提升你web应用程序性能的自动化开源工具。

![lighhouse-logo](http://p0.qhimg.com/t01b0780d10ef0f083e.png)

有两种方法运行这个工具：作为[Chrome的扩展](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)或者直接在命令行中运行。你只需要提供一个URL链接，它会运行一系列的测试审查这个页面，然后它会把关于页面执行的一些性能指标以报告的形式展示给你。你可以参考这份报告中的一些指标提示来提升你的网站应用。

Chrom扩展则会把报告以非常人性化的图形界面展示给你。

![lighthouse](http://p0.qhimg.com/t0160b19dcf9b01f0c4.png)

最近，我有幸开始构建一个新的web应用程序：利用浏览器的新特性创建一个渐进式的web app（PWA）。‘Lighthouse’目前非常关注PWA的特性，例如添加主屏幕和离线支持。然而，这个项目的首要目标是检查web app各方面性能的衔接，作为一个web性能狂热者，我对这个工具生成的性能报告非常感兴趣。

使用命令行工具的亮点在于：无论你是否有兴趣构建一个PWA，这个工具都会给你提供关于你网站性能指标的有用的数据。

首先，你需要安装[Node.js](https://nodejs.org/en/)。然后，在命令行工具中安装Lighthouse CLI：

```
`npm install -g lighthouse` 
```

安装完成之后，你就可以使用Lighthouse了。在终端里输入下面的命令，我们就可以对Canlender这个网站的性能进行一次完整的测试：

```
`lighthouse http://calendar.perfplanet.com/2015/` 
```
工具会在后台寻找你电脑上已经安装了的Chrome浏览器。通过Chrome浏览器，它会进行一系列测试然后收集页面运行过程中的各种指标。

![lighthouse-cli](http://p0.qhimg.com/t015aa9ca4e041d2399.png)

当工具运行结束后，会默认生成一份漂亮的HTML报告。也许对于当前的项目，你更想了解关于性能方面的详细数据。那么你可以在终端运行如下命令：

```
lighthouse http://calendar.perfplanet.com/2015/ 
  --perf 
  --output=json 
  --output-path=./result.json 
```

上面的命令会生成一个给定文件名的报告，因为有--perf标志，它只会提供关于这个URL的性能指标。该命令还会输出一个JSON文件，方便你更深入得了解测试时生成的各项数据，例如：首次有效渲染时间、速度指标、预估的输入延迟、交互时间和任何关键的HTTP请求链（例如CSS或JavaScript阻塞）。

这种灵活性使Lighthouse可以在许多不同的情况中使用。实际上，Lighthouse可以跟踪分析其他工具（例如[WebPageTest](https://www.webpagetest.org/)或者ChromeDriver）收集来的性能数据。如果你想测试一个网站在真机上的性能表现，Lighthouse也可以设置启用远程安卓设备上的调试工具。你甚至可以使用命令行工具把Lighthouse集成到持续集成系统中。

最重要一点，Lighthouse是开源项目，你也可以参与其中。如果你有宝贵意见或者新功能，请点击[list of issues](https://github.com/GoogleChrome/lighthouse/issues?q=is%3Aissue+is%3Aopen+label%3ADoBetterWeb)。如果你想更深入了解这个工具，建议可以观看Google’s Jeffrey Posnick录制的这个视频：[YouTube](https://www.youtube.com/watch?v=LZjQ25NRV-E)
                