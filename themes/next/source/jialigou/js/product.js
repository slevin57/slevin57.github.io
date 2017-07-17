$(function () {

	
	//=======根据id从json获取数据动态加载产品页面
	var currentId = location.search.slice(1);//取到当前链接?后面的id	
	var imgSrc = null;//注意这里，通过声明一个空的全局变量，在json中id对应产品的图片链接取出，然后赋值给它，再传到购物车点击事件中的cookie里面保存起来！！
	
	//遍历goods.json，获取当前商品信息
	$.get("json/goods.json",function (data) {
		//对象的属性名称如果是以数字开头，只能通过obj[name]来获取对应属性，而不能通过obj.name的方式获取！！！
		//获取到id对应的产品信息（数组）
		var arr = data[currentId];
		imgSrc = arr[0].img;

		
		//更改页面对应产品信息
		$("#pro_goodes_id").html(arr[0].id);
		$(".add_pro_name").html(arr[0].title);
		$("#pro_goods_price").html(arr[0].price);
		
		//更改产品图片
		for (var i=1;i<arr.length;i++) {
			//==创建产品预览的大图和小图并【分别添加到各自父元素】
			var imgNode = $("<img src=img/"+arr[i].img+">");
			
			//如果想把创建出来的节点加给不同的元素，必须把新节点clone()之后再加！！
			imgNode.appendTo($(".mini_pic"));
			imgNode.clone().appendTo($(".big_pic"));
			
			//==介绍页图片根据当前id从json获取，动态创建并加载
			var imgNode2 = $("<img src=img/"+arr[i].img+">");
			imgNode2.appendTo($("#list2 li").eq(0));
			
		}
		
		//创建并添加放大镜的大图
		var bigImgNode = $("<img class='bigger_img' src=img/"+ arr[0].img +">");
		bigImgNode.appendTo($(".bigger_area"));
		
		
//	})//getjson  //为了获取json中的数据并保存到cookie中，所以把购物车添加到cookie事件写到json事件中！
	
	
	//从另外一个json（数组格式）中读取数据，创建并【随机】给几个栏目添加商品信息
	//未完成，思路行不通
//	$.get("json/goods2.json",function (data) {
//		var randomX = parseInt(Math.random()*45);//0-44的随机整数，这个范围是根据json2数组中商品数量来定的
//		
//		
//		//【最佳搭配栏目】
//		for (var i=0;i<5;i++) {
//			var obj = data[randomX];//随机获取的json中的商品对象
//			var liNode = $("<li></li>");
//			
//			var aNode = $("<a href=''><img src=img/"+ data[randomX].img +"></a>");
//			var aNode2 = $("<a href=''><span"+ data[randomX].title +"</span></a>");
//			var divNode = $("<div class='match_price'>￥<i>"+data[randomX].price+"</i></div>");
//			
//			aNode.appendTo(liNode);
//			aNode2.appendTo(liNode);
//			divNode.appendTo(liNode);
//			
//			liNode.appendTo($(".match_img ul"));
//		}
//	})
	
	
	

	//=====购物车中商品数量
	function getGoodsNum () {
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse($.cookie("cart"));
			var num = $("#cart_icon").html(arr.length);
		}
		return num;
	}
	getGoodsNum();

	
	$("#pro_goods_num").val("1");
	
	//创建一个对象，专门记录加入购物车前商品的【最终数量】，然后存到cookie中。
	//数量每次变化（加减或者直接输入，都要从cookie中取出、赋值给num然后再存回去）!!
	var goodsInfo = {
		id:currentId,
		num:1
	}
	$.cookie("goodsInfo",JSON.stringify(goodsInfo),{expires:30,path:"/"});
	
	
	//数量手动改变。这里是键盘抬起而不是失去焦点事件！
	$("#pro_goods_num").keyup(function () {
		var obj = JSON.parse($.cookie("goodsInfo"));
		obj.num = $("#pro_goods_num").val();
		$.cookie("goodsInfo",JSON.stringify(obj),{expires:30,path:"/"});	
		console.log($.cookie("goodsInfo"));
	})
	
	//数量加
	$("#pro_add").click(function () {
		
		var goodsNum = $("#pro_goods_num").val();
		goodsNum++;
		$("#pro_goods_num").val(goodsNum);
		
		var obj = JSON.parse($.cookie("goodsInfo"));
		obj.num = goodsNum;
		$.cookie("goodsInfo",JSON.stringify(obj),{expires:30,path:"/"});	
		console.log($.cookie("goodsInfo"));		
		
//		goodsNum++;
//		console.log(goodsNum);
//		$("#pro_goods_num").val(goodsNum);
//		var obj = JSON.parse($.cookie("goodsInfo"));
//		obj.num = $("#pro_goods_num").val();
//		$.cookie("goodsInfo",JSON.stringify(obj),{expires:30,path:"/"});	
//		console.log($.cookie("goodsInfo"));

	})
	
	
	
	//数量减
	$("#pro_sub").click(function () {
		
		var goodsNum = $("#pro_goods_num").val();
		goodsNum--;
		if (goodsNum <= 1) {
			goodsNum =1;
		}		
		$("#pro_goods_num").val(goodsNum);
		
		var obj = JSON.parse($.cookie("goodsInfo"));
		obj.num = goodsNum;
		$.cookie("goodsInfo",JSON.stringify(obj),{expires:30,path:"/"});	
		console.log($.cookie("goodsInfo"));
		
//		goodsNum--;
//		if (goodsNum <= 1) {
//			goodsNum =1;
//		}
//		$("#pro_goods_num").val(goodsNum);
//		var obj = JSON.parse($.cookie("goodsInfo"));
//		obj.num = $("#pro_goods_num").val();
//		$.cookie("goodsInfo",JSON.stringify(obj),{expires:30,path:"/"});	
//		console.log($.cookie("goodsInfo"));
	})
	
	

	console.log(arr[0]);	
	//点击加入购物车
	var addToCartBtn = $(".goods_buy .btn2").eq(0);
	addToCartBtn.click(function () {
		//从cookie中取出商品最终选中的数量
		var oGoodsInfo = JSON.parse($.cookie("goodsInfo"));
		var goodsNum = oGoodsInfo.num;

//		var goodsNum = $("#pro_goods_num").val();
		var goodsId = $("#pro_goodes_id").html();
		var goodsName = $("#pro_goods_name").html();
		var goodsPrice = $("#pro_goods_price").html();
		
//	console.log(arr[0]);	
		//从cookie中取商品数据
		var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
		
		var isExist = false;//代表购物车不存在这个商品
		for (var i=0;i<arr.length;i++) {
			var obj = arr[i];//购物车原有的每个商品
			
			//如果存在相同商品
			if (goodsId == obj.id) {
				obj.num = (obj.num-0) + (goodsNum-0);//把字符串转换成数字方便相加，否则结果会是字符串拼接!!
				
				$("#cart_icon").html(obj.num);
				isExist = true;//代表存在
			}
		}//for
		

		//如果不存在，就添加新商品对象到购物车的数组arr
		if (isExist == false) {
			//商品信息做成对象
			var goods = {
				id:goodsId,
				name:goodsName,
				price:goodsPrice,
				num:goodsNum,
				img:imgSrc
			}
			$("#cart_icon").html(goodsNum);
			arr.push(goods);//将新商品加入到数组arr中
		}//if
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		console.log($.cookie("cart"));
		
		
		//购物车小图片的抖动效果（第三方动画库）
		$("#cart_icon").addClass("shake");
		setTimeout(function () {
			$("#cart_icon").removeClass("shake");
		},1000);

		
	})//点击加入购物车
	


})//getjson


	
	//======全部分类下拉显示与隐藏
	$(".header").find("b").eq(0).on("click",function () {
	
		$(".mini_classify").slideToggle();
		
	})
	//这里注意事件是加给all_classify！！保证鼠标在两个地方移开都会触发事件
	$(".header").find(".all_classify").eq(0).on("mouseleave",function () {
		$(".mini_classify").slideUp();
	})
	
	
	
	
	//========点击切换选择商品颜色(bug)
	var colorBtn = $(".color_choice").find("i");
	
	colorBtn.mousedown(function () {
		$(this).addClass("active").parent().siblings().find("i").removeClass("acitve");
		
	})
	
	colorBtn.mouseup(function () {
		$(this).addClass("active2").parent().siblings().find("i").removeClass("active2");
	})







	
	//=======放大镜效果
	$(".big_pic img").eq(0).show().siblings().hide();//初始化
	
	$(".mini_pic").on("click","img",function () {//tab切换
		var index = $(this).index();
		$(".big_pic img").eq(index).slideDown().siblings().slideUp();
		
		//更换放大区域的图片
		var currentSrc = $(this).attr("src");
		$(".bigger_area img").attr("src",currentSrc);
	})
	
	var smallImg = $(".small_img").eq(0);
	var smallArea = $(".small_area").eq(0);
	var biggerArea = $(".bigger_area").eq(0);
	
	
	//鼠标移入事件
	smallImg.mouseenter(function () {
		smallArea.stop().fadeIn("fast");//注意stop！！！
		biggerArea.stop().fadeIn(1000);
	})
	
	
	//鼠标滑动事件;
	smallImg.mousemove(function (e) {
	
	/*注意：这里有个大坑！
	 * 下面的获取bigger_img及根据大图宽高确定小图宽高的语句一定要写在滑动事件里面。
	 * 因为大图的节点是动态创建，如果写在外面是获取不到大图及其宽高的，那么小区域宽高也就会受影响
	 */
	var biggerImg = $(".bigger_img").eq(0);
	
	
	//设置小区域宽高，确定其大小
	smallArea.width( smallImg.width()/biggerImg.width() * biggerArea.width() );
	smallArea.height( smallImg.height()/biggerImg.height() * biggerArea.height() );
	

	//放大系数
	var scale = biggerImg.width()/smallImg.width();	


		var x = e.pageX - $(".pro_buy_left").eq(0).offset().left - smallArea.width()/2;
		var y = e.pageY - $(".pro_buy_left").eq(0).offset().top - smallArea.height()/2;
		
		smallArea.css({left:x, top:y});
		
		if (x<=0) {
			x=0;
		}else if (x >= smallImg.width() - smallArea.width()) {
			x = smallImg.width() - smallArea.width();
		}
		
		if ( y <= 0) {
			y = 0;
		}else if (y >= smallImg.width() - smallArea.width()) {
			y = smallImg.width() - smallArea.width();
		}
		
		biggerImg.css({left:-x*scale,top:-y*scale});
		
	})//mousemove
	
	
	//鼠标离开事件
	smallImg.mouseleave(function () {
		smallArea.stop().fadeOut();
		biggerArea.stop().fadeOut();
	})//mouseleave	
	
	
	
	
	//=====产品介绍的tab切换
	//初始化先显示一张
	$("#list1 li").find("span").eq(0).addClass("active");
	$("#list2 li").first().show().siblings().hide();
	
	$("#list1 li").click(function () {
		$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		
		var index = $(this).index();//获取当前下标
//		$("#list2 li").eq(index).slideDown().siblings().slideUp();//下拉显示效果
		$("#list2 li").eq(index).fadeIn().siblings().fadeOut();//淡入淡出效果
	})
	





})


































