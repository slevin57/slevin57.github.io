
$(function () {
	//用来动态加载首页内容
	
	//读取json中的数据
	$.get("json/goods.json",function (data) {
		
		//=====根据json数据动态创建主页，分别是几个栏目：
		//直播栏目		
		var aTvLive = data.tvlive;
		
		var aNode = $("<a href=product.html?"+aTvLive[0].id+"><img class='first_pic' src=img/"+aTvLive[0].img+"></a>");
		var ulNode = $("<ul></ul>");
		aNode.appendTo( $(".livecontent") );
		ulNode.appendTo( $(".livecontent") );
		
		for (var i=1;i<aTvLive.length;i++) {
			var liNode = $("<li></li>");
			
			var spanNode = $("<span class='time'>" + aTvLive[i].time + "</span>");
			var divNode = $("<div class='pic'><a href=product.html?"+ aTvLive[i].id +" ><img  src=img/"+ aTvLive[i].img +"></a></div>") ;                                   
			var spanNode2 = $("<span class='icon'>直播</span>");
			var pNode = $("<p><a class='goods'  href=product.html?"+ aTvLive[i].id +">"+ aTvLive[i].title +"</a></p>");
			var pNode2 = $("<p><a class='price' href=product.html?"+ aTvLive[i].id +">￥"+ aTvLive[i].price +"</a></p>");
			
			spanNode.appendTo(liNode);
			divNode.appendTo(liNode);
			spanNode2.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			
//			liNode.appendTo($('.livecontent ul'));
			liNode.appendTo(ulNode);
		}
		var btnNode1 = $("<button class='live_pre'><</button>");
		var btnNode2 = $("<button class='live_next'>></button>");
		btnNode1.appendTo(ulNode);
		btnNode2.appendTo(ulNode);
		
		
		
		//热销栏目
		var aHot = data.hot;
		
		var aNode = $("<a class='a1' href=product.html?"+ aHot[0].id +"><img src=img/"+aHot[0].img+"></a>");
		var ulNode = $("<ul></ul>");
		aNode.appendTo( $(".hotcontent") );
		ulNode.appendTo( $(".hotcontent") );
		
		for (var i=1;i<aHot.length;i++) {
			var liNode = $("<li></li>");
			
			var divNode = $("<div class='pic'><a href=product.html?"+ aHot[i].id +" ><img  src=img/"+ aHot[i].img +"></a></div>");
			var pNode = $("<p><a class='goods'  href=product.html?"+ aHot[i].id +">"+ aHot[i].title +"</a></p>");
			var pNode2 = $("<p><a class='price' href=product.html?"+ aHot[i].id +">"+ aHot[i].price +"</a></p>");
			var divNode2 = $("<div class='sale_count'>已热销：<span>2323</span>件</div>");
			
			divNode.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			divNode2.appendTo(liNode);
			
			liNode.appendTo(ulNode);
			
		}
		
		
		//1楼
		var aF1 = data.firstfloor;
		
		var F1divNode = $("<div class='floor_left_pic'><a href=product.html?"+ aF1[0].id +"><img src=img/"+aF1[0].img+"></a></div>");
		var F1divNode2 = $("<div class='floor_middle_bigpic'><a href=product.html?"+aF1[1].id  +"><img src=img/"+aF1[1].img+"></a></div>");
		
		F1divNode.appendTo(".f1 .floor_left");
		F1divNode2.appendTo(".f1 .act_left");
		
		for (var i=2;i<aF1.length;i++) {
			var liNode = $("<li></li>");
			
			var divNode = $("<div class='goods_pic'><a href=product.html?"+ aF1[i].id +"><img src=img/"+aF1[i].img+"></a><i class='t'></i><i class='r'></i><i class='b'></i><i class='l'></i></div>");
			var pNode = $("<p class='goods'><a href=product.html?"+ aF1[i].id +">"+aF1[i].title+"</a></p>");
			var pNode2 = $("<p class='price'>"+aF1[i].price+"</p>");
			
			divNode.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			
			liNode.appendTo(".f1 .right_ul");
		}
		
		
		//2楼
		var aF2 = data.secondfloor;
		
		var F2divNode = $("<div class='floor_left_pic'><a href=product.html?"+ aF2[0].id +"><img src=img/"+aF2[0].img+"></a></div>");
		var F2divNode2 = $("<div class='floor_middle_bigpic'><a href=product.html?"+ aF2[1].id +"><img src=img/"+aF2[1].img+"></a></div>");
		
		F2divNode.appendTo(".f2 .floor_left");
		F2divNode2.appendTo(".f2 .act_left");
		
		for (var i=2;i<aF2.length;i++) {
			var liNode = $("<li></li>");
			
			var divNode = $("<div class='goods_pic'><a href=product.html?"+ aF2[i].id +"><img src=img/"+aF2[i].img+"></a><i class='t'></i><i class='r'></i><i class='b'></i><i class='l'></i></div>");
			var pNode = $("<p class='goods'><a href=product.html?"+ aF2[i].id +">"+aF2[i].title+"</a></p>");
			var pNode2 = $("<p class='price'>"+aF2[i].price+"</p>");
			
			divNode.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			
			liNode.appendTo(".f2 .right_ul");
		}
		
		
		//3楼
		var aF3 = data.thirdfloor;
		
		var F3divNode = $("<div class='floor_left_pic'><a href=product.html?"+ aF3[0].id +"><img src=img/"+aF3[0].img+"></a></div>");
		var F3divNode2 = $("<div class='floor_middle_bigpic'><a href=product.html?"+ aF3[1].id +"><img src=img/"+aF3[1].img+"></a></div>");
		
		F3divNode.appendTo(".f3 .floor_left");
		F3divNode2.appendTo(".f3 .act_left");
		
		for (var i=2;i<aF3.length;i++) {
			var liNode = $("<li></li>");
			
			var divNode = $("<div class='goods_pic'><a href=product.html?"+ aF3[i].id +"><img src=img/"+aF3[i].img+"></a><i class='t'></i><i class='r'></i><i class='b'></i><i class='l'></i></div>");
			var pNode = $("<p class='goods'><a href=product.html?"+ aF3[i].id +">"+aF3[i].title+"</a></p>");
			var pNode2 = $("<p class='price'>"+aF3[i].price+"</p>");
			
			divNode.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			
			liNode.appendTo(".f3 .right_ul");
		}
		
		
		//4楼
		var aF4 = data.fourthfloor;
		
		var F4divNode = $("<div class='floor_left_pic'><a href=product.html?"+ aF4[0].id +"><img src=img/"+aF4[0].img+"></a></div>");
		var F4divNode2 = $("<div class='floor_middle_bigpic'><a href=product.html?"+ aF4[1].id +"><img src=img/"+aF4[1].img+"></a></div>");
		
		F4divNode.appendTo(".f4 .floor_left");
		F4divNode2.appendTo(".f4 .act_left");
		
		for (var i=2;i<aF4.length;i++) {
			var liNode = $("<li></li>");
			
			var divNode = $("<div class='goods_pic'><a href=product.html?"+ aF4[i].id +"><img src=img/"+aF4[i].img+"></a><i class='t'></i><i class='r'></i><i class='b'></i><i class='l'></i></div>");
			var pNode = $("<p class='goods'><a href=product.html?"+ aF4[i].id +">"+aF4[i].title+"</a></p>");
			var pNode2 = $("<p class='price'>"+aF4[i].price+"</p>");
			
			divNode.appendTo(liNode);
			pNode.appendTo(liNode);
			pNode2.appendTo(liNode);
			
			liNode.appendTo(".f4 .right_ul");
		}		
		
	})//getjson
	



})//ready