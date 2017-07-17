

$(function () {
	
	$(".log_right").addClass("swing");
	
	
//======验证码区域：	
	//页面一加载就先自动生成一个验证码
	var str = randomCode();
	$(".log_code span").eq(0).html(str);
	
	var code = $(".log_code span").eq(0);
	
	//点击更换随机验证码
	code.click(function () {
		str = randomCode();
		$(this).html(str);
	})
	
	//封装生成验证码函数
	function randomCode () {
		var str = "";
		for (var i=0;i<4;i++) {
		//创建变量随机取值0或1
			var isNum = parseInt(Math.random()*10)%2;
			
			if (isNum) {//isNum==1，生成数字
				str += parseInt(Math.random()*10);
			}else{//生成大写字母
				str += String.fromCharCode(parseFloat(65+Math.random()*26));
			}
		
		}
		return str;
	}
	
	
	
	
//======登陆验证区域：
	
	//如果上一次刚登陆过，自动填入信息
	var oldLoginUser = $.cookie("loginUser");
	if (oldLoginUser) {
		oldLoginUser = JSON.parse(oldLoginUser);
		
		$(".log_user input").eq(0).val(oldLoginUser.username);
		$(".log_pwd input").eq(0).val(oldLoginUser.pwd);
	}
	
	//验证码输入框失去焦点事件
	var codeState = false;//先声明一个全局状态变量
	$("#code_input").blur(function () {
		var codeStr = $(this).val();
		if (codeStr == "") {
			console.log("请输入验证码");
		}else if (codeStr.toLocaleUpperCase() != $(".log_code span").eq(0).text()) {
			alert("验证码错误，请重新输入哦");
			$(".log_code span").eq(0).html(randomCode());//刷新验证码
			$("#code_input").val("");//清空验证码输入框
		}else{
			codeState = true;
		}
	})
	
	//点击之后验证的登陆
	$("#log_btn").click(function () {
		
		//取消form表单提交按钮后浏览器的自动刷新
		$("form").submit(function (e) {
			e.preventDefault();
		})
		
		var username = $(".log_user input").eq(0).val();
		var pwd = $(".log_pwd input").eq(0).val();
		
		//获取cookie中的所有用户
		var arr = $.cookie("users");
		
		if (!codeState) {
			alert("请先输入验证码");
		}else if (arr) {
			arr = JSON.parse(arr);
			
			var isExist = false;
			for (var i=0;i<arr.length;i++) {
				//如果存在用户名和密码同时匹配
				if (username == arr[i].username && pwd == arr[i].pwd) {
					alert("欢迎回来。");
						window.location.href = "index.html";
					isExist = true;
					
					//新建一个名为loginUser的cookie，保存当前登陆的用户信息
					var loginuser = {
						username:username,
						pwd:pwd
					}
					$.cookie("loginUser",JSON.stringify(loginuser),{expires:30,path:"/"});
					console.log($.cookie("loginUser"));
				}//if
				
			}//for
			
			if (isExist == false) {
				alert("用户名或密码错误，请重新登录。")
				$("form input").val("");//清空输入框内的信息
			}
			
		}else{
				alert("请先注册，即将跳转到注册页面！")
				location.href = "register.html";
			}
		
	})//click
	

	
})//ready