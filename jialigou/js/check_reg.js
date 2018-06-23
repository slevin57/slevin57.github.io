$(function() {
		
	$(".login_left").addClass("tada");
	
	var pwd2 = $("#reg_pwd2").val();
		var arr = $.cookie("users") ? JSON.parse($.cookie("users")) : [];	
	var regNameLength = 0;//定义为一个全局变量
	var nameState = false;
	var pwdState = false;
	
//=====用户名输入框事件
	$("#reg_name").focus(function () {
		
		$(".uname p").eq(0).css("visibility","visible").html('5-25个字符，一个汉字为两个字符，推荐使用中文会员名。');
		
	})
	
	$("#reg_name").keyup(function () {
		$(".uname i").eq(0).show();
		regNameLength = get_length($(this).val());
		$(".uname i").eq(0).html(regNameLength+"个字符");
		if (regNameLength == 0) {
			$(".uname i").eq(0).hide();
		}
	})
	
	$("#reg_name").blur(function () {
		//匹配不符合要求（数字、字母不区分大小写及汉子下划线）的非法字符
		var re = /[^\w\u4e00-\u9fa5]/g;
		
		//cookie不为空数组时，开始遍历
		for (var i=0;i<arr.length;i++) {
		
			if ($(this).val() == arr[i].username) {
				alert("已存在相同用户名，请重新填写哦^_^");
				$(".user input").val("");//清空输入框的内容
			}
			
		}//for
		
		
		if ( re.test( $(this).val() ) ) {
			$(".uname p").eq(0).html('含有非法字符，请重新输入');
		}else if ( $(this).val() == "") {//为空
			$(".uname p").eq(0).html("");
		}else if ( regNameLength > 25 ) {
			$(".uname p").eq(0).html("字符长度不能大于25");	
		}else if ( regNameLength < 5 ) {
			$(".uname p").eq(0).html("字符长度不能小于5");	
		}else{
			$(".uname p").eq(0).html("恭喜，用户名可用^_^");
			nameState = true;
		}//if
		
		
		

	})
	
	//封装，把字符串中的单汉字转换成2个任意字母
	//[^\x00-xff] 匹配双字节字符（包括汉字）
	function get_length (str) {
		return str.replace(/[^\x00-xff]/g,"xx").length;
	}
	
	
//=====密码输入框事件
	$("#reg_pwd").focus(function () {
		$(".pwd p").eq(0).css("visibility","visible").html("6-16个字符，请使用字母加数字或符号的组合密码，不能单独使用字母、数字或符号");
		$(".pwd2 p").eq(0).css("visibility","visible")
	})
	
	$("#reg_pwd").keyup(function () {
		//大于5个字符（中）
		if ( $(this).val().length > 5 ) {
			$(".pwd .zhong").addClass("active");//色块变色
			$(".pwd2 input").eq(0).attr("disabled",false);//确认的input激活
			$(".pwd2 p").eq(0).html("请再输入一次");//确认密码提示
		}else{
			$(".pwd .zhong").removeClass("active");
			$(".pwd2 input").eq(0).attr("disabled","");
			$(".pwd2 p").eq(0).html("");
		}
		
		//大于10个字符（强）
		if ( $(this).val().length > 10 ) {
			$(".pwd .qiang").addClass("active");
		}else{
			$(".pwd .qiang").removeClass("active");
		}
	})
	
	//失去焦点，触发合法性验证
	$("#reg_pwd").blur(function () {
		var m = checkStr($("#reg_pwd").val(),$("#reg_pwd").val()[0]);
		var re_n = /[^\d]/g;//全局匹配所有非数字（/d）的
		var re_t = /[^a-zA-Z]/g;//全局匹配所有非大小写字母的
		
		if ($("#reg_pwd").val() == "") {//为空
			$(".pwd p").eq(0).html("");
		}else if (m == $(this).val().length) {
			$(".pwd p").eq(0).html("不能由相同字符组成哦");
		}else if ( $(this).val().length<6 || $(this).val().length>16 ) {
			$(".pwd p").eq(0).html("长度应为6-16个字符之间哦");
		}else if ( !re_n.test($(this).val()) ) {//取反，就是匹配所有数字
			$(".pwd p").eq(0).html("不能全为数字哦");
		}else if ( !re_t.test($(this).val()) ) {
			$(".pwd p").eq(0).html("不能全为字母哦");
		}else{
			$(".pwd p").eq(0).html("恭喜您，密码可用~^_^");
		}
		
		
	})
	
	
	//封装函数，如果tmp与字符串长度相等，说明字符串全部是重复的，不合法
	function checkStr (str,n) {
		var tmp = 0;//声明一个变量
		for (var i=0;i<str.length;i++) {//遍历字符串的每个字母
			if (str.charAt(i) == n) {
				tmp++;
			}
		}
		return tmp;
	}
	
	
	
	//=====确认密码输入框事件
	$("#reg_pwd2").blur(function () {
		if ( $(this).val() != $("#reg_pwd").val() ) {
			$(".pwd2 p").eq(0).html("两次输入密码不一致哦");
		}else{
			$(".pwd2 p").eq(0).html("恭喜您，密码验证通过~");
			pwdState = true;
		}
		
	})
	
	
	
	//===注册按钮点击事件
	$("#register_btn").click(function () {
		
		//阻止form表单提交按钮后的自动刷新
		$("form").submit(function (e) {
			e.preventDefault();
		})

		var username = $("#reg_name").val();
		var pwd = $("#reg_pwd").val();
		
		if (nameState == true && pwdState == true) {//确保用户名及密码信息都已经正确填写
			var user = {
				username:username,
				pwd:pwd
			}
			arr.push(user);
			
			//保存到cookies
			$.cookie("users",JSON.stringify(arr),{expires:30,psth:"/"});
			console.log($.cookie("users"));
			
			alert("恭喜您注册成功，即将跳转到首页 ^_^");
			window.location.href = "index.html";
		}else{
			alert("请完善用户名及密码信息 哦");
		}
		
	})
	
	
})//ready