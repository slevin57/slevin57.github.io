$(function () {
	
	//====顶部广告(两种方式)
	//1.用animate.css的插件（效果不太好）
//	$("#top_ad").show().addClass("animated slideInDown");
//	setTimeout(function () {
//		$("#top_ad").removeClass("bounceInDown").addClass("fadeOutUp").hide();
//	},3000);


	//2.jq动画实现
	$("#top_ad").show().stop().animate({height:450},1500);
	setTimeout(function () {
		$("#top_ad").slideUp("slow");
//		$(".nav_outer").css("position":"fixed","top":0);//这个有bug
	},4000);
	$("#top_ad span").click(function () {
		$("#top_ad").slideUp("slow");
	})
	
	
	//====底部广告
	$("#bottom_ad span").click(function () {
		$("#bottom_ad").hide();
	})
	
	
	
	//=====购物车中商品数量
	function getGoodsNum () {
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse($.cookie("cart"));
			var num = $("#index_cart").html(arr.length);
		}
		return num;
	}
	getGoodsNum();
	
	
	
	//====购物车下拉显示
	$("#cart").mouseenter(function () {
		
		$(".mini_cart_box").stop().slideDown(1000);
		
		$(".mini_cart_box ul").empty();
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse($.cookie("cart"));
			for (var i=0;i<arr.length;i++) {
				var liNode = $("<li></li>");
				
				var imgNode = $("<a class='a1' href=product.html?"+arr[i].id+"><img src=img/"+arr[i].img+"></a>");                               
				var pNode = $("<p><a class='a2' href=product.html?"+arr[i].id+">"+arr[i].name+"</a></p>");
				
				imgNode.appendTo(liNode);
				pNode.appendTo(liNode);
				liNode.appendTo($(".mini_cart_box ul"));
			}
		}else{
			$(".mini_cart_box ul").html("暂无商品");
		}
		console.log(liNode);
	})
	$("#cart").mouseleave(function () {
		$(".mini_cart_box").stop().slideUp();
	})
	
	
	
	//======banner轮播图
	//json的地址为什么不用写../？？
	$.get("json/banner.json",function (data) {
		
		
		//遍历数组，动态添加li
		for (var i=0;i<data.length;i++) {
			var obj = data[i];
			$("#bannerNum").width(30*(i+1));//改变ol的宽度，保证居中
			
			//动态添加图片节点和属性
			var liNode = $("<li></li>");
			liNode.css("background","url(" + obj.img + ") center");
			liNode.appendTo("#bannerPic");
			
			//动态添加按钮节点
			var liNum = $("<li>" + (i+1) + "</li>");
			liNum.appendTo("#bannerNum");
		}
		lunbo();
	})

	
	//鼠标移入翻页按钮事件
	$(".banner").mouseenter(function () {
		$(".banner .btn").fadeIn();
	})
	$(".banner").mouseleave(function () {
		$(".banner .btn").fadeOut();
	})		
	
	
	
	
	//封装轮播图
	function lunbo () {
		
		var picList = $("#bannerPic");
		var numList = $("#bannerNum");
		var picLi = $("#bannerPic li");
		var numLi = $("#bannerNum li");
		
		picLi.eq(0).show().siblings().hide();
		numLi.eq(0).addClass("active");
		
		var size = $("#bannerPic li").size();
		
		var i =0;
		
		timer = setInterval(function () {
			i++;
			change();
			
		},3000);
		
		//封装change淡入淡出效果
		function change () {
			if (i == size) {
				i=0;
			}
			
			if (i<0) {
				i=size-1;
			}
			
			picLi.eq(i).stop().fadeIn().siblings().stop().fadeOut("slow");
			
			numLi.eq(i).removeClass().addClass("active").siblings().removeClass("active");
		}//change
		
		
		//鼠标滑过改变图片
		numLi.mousemove(function () {
			var index = $(this).index();
			i = index;
			change();
		})
		
		//翻页按钮点击
		$("#banner_pre").click(function () {
			i--;
			change();
		})
		
		$("#banner_next").click(function () {
			i++;
			change();
		})		
		
		
		//鼠标移入移出事件
		$(".banner").hover(function () {
			//停止定时器
			clearInterval(timer);
		},
		function () {
			//【这里不要用var，否则清除不掉，会导致轮播越来越快！】
			timer = setInterval(function () {
				i++;
				change();
			},2000);
		})

		
	}//lunbo
	

	//=======banner左侧边导航动画显示
	//元素本身的宽度值必须小于animate改变的目标值才会有效果！这里是从0开始变化
	$(".sidebar_left li").not(".first").mouseenter(function () {
		$(this).find('.category').show().stop().animate({width:550},1000).parent().siblings().find(".category").hide().stop().animate({width:0},1000);
	})
	$(".sidebar_left li").not(".first").mouseleave(function () {
		$(this).find('.category').hide();
	})


	//======banner右侧边直播界面动画
	var sidebarRight = $(".sidebar_right").eq(0);
	
	sidebarRight.hover(function () {
		$(this).stop().animate({left:990},"fast");
	},
	function () {
		$(this).stop().animate({left:1000});
	});
	
	
	
	
	//====产品图片边框变化
	$(".right_ul").on("mouseenter",".goods_pic",function () {
		$(".t").stop().animate({width:0},500);
//		$("this").find(".t").stop().animate({width:0},500);
		$(".l").stop().animate({height:166},500);
		$(".r").stop().animate({height:0},500);
		$(".b").stop().animate({width:166},500);
	})
	
	
	$(".right_ul").on("mouseleave",".goods_pic",function () {
		$(".t").stop().animate({width:166},500);
		$(".l").stop().animate({height:0},500);
		$(".r").stop().animate({height:167},500);
		$(".b").stop().animate({width:0},500);
	})	
	
	
	
	
	//产品图片放大效果
	
	$(".act_left").on("mouseenter",".act_left img",function () {
		var w = $(".floor_middle_bigpic img").width();
		var h = $(".floor_middle_bigpic img").height();
		$(this).stop().animate({height:(h+20),width:(w+20),left:"-10px",right:"-10px"},500);
	})
	$(".act_left").on("mouseleave",".act_left img",function () {
		var w = $(".floor_middle_bigpic img").width();
		var h = $(".floor_middle_bigpic img").height();
		$(this).stop().animate({height:h,width:w,left:"0",right:"0"},500);
	})
	
	
	
	
	//导航栏吸顶效果
	var navTop = $(".nav_outer").eq(0).height();
	
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		
		//判断吸顶还是还原
		if (scrollTop >= navTop) {
			$(".nav_outer").eq(0).css({position:"fixed",top:0});
		}else{
			$(".nav_outer").eq(0).css("position","static");
		}
	})
	
	
	
	
	//======楼层界面加载动画
	$(".act_left").addClass("animated slideInLeft");
	$(".act_right").addClass("animated slideInRight");
//	$(".act_right").addClass("animated bounceInRight");	
	
	
})//ready