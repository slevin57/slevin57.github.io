$(function () {
	
	
	//======商品图片放大效果
	var w = $(".like_ul img").width();
	var h = $(".like_ul img").height();
	
	$(".like_ul img").hover(function () {
		$(this).stop().animate({height:(h+20),width:(w+20),left:"-10px",right:"-10px"},500);
	},function () {
		$(this).stop().animate({height:h,width:w,left:"0",right:"0"},500);
	})
	
	
	
	
	//=======购物车操作
	
	//给一个数组checkArr 用来保存商品的选中状态
	var checkArr = [];
	
	//从cookie中获取商品信息
	var arr = $.cookie("cart");
	if (arr) {
		arr = JSON.parse(arr);//存在的话，就json解析
		$.each(arr,function () {
			checkArr.push(true);//初始化，让checkArr的数组长度和购物车的商品数量一致，并且默认都是选中状态
			//初始化之后，checkArr = [true,true,true]
		});
		
		//刷新购物车（动态创建节点，显示购物车中的商品）
		refreshCart();
		
	}//if
	
	//封装,刷新购物车，重新从cookie中获取购物车商品信息，并显示出来
	function refreshCart () {
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse(arr);
			
			//清空旧的商品
			$("#cart_div").empty();
			
			//遍历购物车所有商品，并动态创建节点显示出来
			var totalPrice = 0;//总价
			for (var i=0;i<arr.length;i++) {
				var obj = arr[i];//购物车中每个商品
				
				var ulNode = $("<ul></ul>");
				
				if (checkArr[i]) {
					//选中状态
					$("<li class='select li1'><input id='check' type='checkbox' checked='checked'/><a href=product.html?"+ obj.id +"><img src=img/" + obj.img +"></a></li>" ).appendTo(ulNode);
//					$("<li class='select li1'><input id='check' type='checkbox' checked='checked'/><a href='#'><img src='img/1000.jpg'/></a></li>" ).appendTo(ulNode);                                      
				}else{
					//未选中状态
					$("<li class='select li1'><input id='check' type='checkbox' /><a href=product.html?"+ obj.id +"><img src=img/" + obj.img +"/></a></li>" ).appendTo(ulNode);
//					$("<li class='select li1'><input id='check' type='checkbox' /><a href='#'><img src='img/1000.jpg'/></a></li>" ).appendTo(ulNode);
				}
				
				$("<li class='gname li2'><a href=product.html?"+ obj.id +">"+obj.name+"</a><p>货号：<span class id='cart_id'>"+obj.id+"</span></p><p>颜色/尺码：</p><p>"+obj.name+"</p></li>").appendTo(ulNode);
				$("<li class='price li3'><span>"+obj.price+"</span></li>").appendTo(ulNode);
				$("<li class='count li4'><b class='sub'>-</b><input id='change_num' type='text' value="+obj.num+" /><b class='add'>+</b></li>").appendTo(ulNode);
				$("<li class='jlprice li5'><span>"+obj.price+"<span></li>").appendTo(ulNode);
				$("<li class='operation li6'><p class='store'><a href='#'>加入收藏</a></p><p class='del'><a href='#'>删除</a></p></li>").appendTo(ulNode);
				
				ulNode.appendTo($("#cart_div"));
				
				if (checkArr[i]) {
					totalPrice += obj.price * obj.num;
				}
			}//for
			
			$("#total_price1").html(totalPrice);//总价显示出来
			var yunfeiNum = $("#yunfei").html();
			
			$("#total_price2").html(( totalPrice-0) + (yunfeiNum-0) + ".00" );
		}
		else{
//			console.log($.cookie("cart"));
////			$("#warn").show();
//			$("#warn").addClass("active");
			$("#cart_div").html("您的购物车为空");
		}
		
	}//refreshCart
	
	
	//==+
	$("#cart_div").on("click",".add",function () {
		var id = $(this).parent().siblings().find("#cart_id").html();
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0;i<arr.length;i++) {
			var obj = arr[i];
			if (id == obj.id) {
				obj.num++;
			}
		}
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
//		console.log($.cookie("cart"));
		
		refreshCart();
	})
	
	
	//==-
	$("#cart_div").on("click",".sub",function () {
		var id = $(this).parent().siblings().find("#cart_id").html();

		var arr = JSON.parse($.cookie("cart"));
		for (var i=0;i<arr.length;i++) {
			var obj = arr[i];
			if (id == obj.id) {
				obj.num--;
				if (obj.num < 1) {
					obj.num = 1;
				}
			}
		}
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
//		console.log($.cookie("cart"));
		
		refreshCart();
		
	})
	
	
	//======手动输入改变数量
	$("#cart_div").on("blur","#change_num",function () {
		var id = $(this).parent().siblings().find("#cart_id").html();
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0;i<arr.length;i++) {
			var obj = arr[i];
			if (id == obj.id) {
				if ($("#change_num").val() > 99) {
					obj.num = 99;
					alert("请电话联系客服，享受批发跳楼价格^_^");
				}else if ($("#change_num").val() < 1) {
					obj.num = 1;
				}else{
					obj.num = $("#change_num").val();
				}
			}
		}
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		console.log($.cookie("cart"));
		
		refreshCart();		
		
	})
	
	
	//====单个删除
	$("#cart_div").on("click",".del",function () {
		var id = $(this).parent().siblings().find("#cart_id").html();
//		var j = 0;
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0;i<arr.length;i++) {
			if (id == arr[i].id) {
//				var j = i;
				arr.splice(i,1);
				checkArr.splice(i,1);//同步删除checkArr中的当前状态
			}
		}
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		console.log($.cookie("cart"));
		
		refreshCart();
		
	})//单个删除
	
	
	
	//====商品打勾
	$("#cart_div").on("click","#check",function () {
		var id = $(this).parent().siblings().find("#cart_id").html();
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0;i<arr.length;i++) {
			if (id==arr[i].id) {
				checkArr[i] = !checkArr[i];//取反
			}
		}
		
		refreshCart();
		
		var sum = 0;
		$.each(checkArr,function (i) {
			sum += checkArr[i];
		})
		
		if (sum == checkArr.length) {
			$("#all_check").prop("checked",true);
		}else{
			$("#all_check").prop("checked",false);
		}
	})
	
	
	
	//=====全选
	$("#all_check").click(function () {
		
		if ($(this).prop("checked")) {
			$.each(checkArr,function (i) {
				checkArr[i] = true;
			});
		}else{
			$.each(checkArr,function (i) {
				checkArr[i] = false;
			});
		}
		
		refreshCart();
	})//全选按钮
	
	
	
	
	//====删除选中
	$("#del_check").click(function () {
		var arr = JSON.parse($.cookie("cart"));
		
		//修改
		var newArr = [];
		var newCheckArr = [];
		for (var i=0;i<arr.length;i++) {
			if (!checkArr[i]) {//未选中的
				newArr.push(arr[i]);
				newCheckArr.push(checkArr[i]);
			}
		}
		
		checkArr = newCheckArr;
		
		//再把修改后的数组arr存到cookie
		$.cookie("cart",JSON.stringify(newArr),{expires:30,path:"/"});
		
		refreshCart();
		
	})//删除选中
	
	
	//清空
	$("#del_all").click(function () {
		$.cookie("cart","",{expires:0,path:"/"});
		$.cookie("goodsInfo","",{expires:0,path:"/"});
		checkArr = [];
		refreshCart();
		console.log($.cookie("cart"));
	})
	$("#warn").click(function (event) {
		event.preventDefault();
	})
	
})//ready
