//获取验证码图片
function changeCaptcha(){
    $("#loginCode").attr("src","captcha/getCaptchaCode.do?id=" + new Date());
}

//验证输入的验证码
function checkCaptcha(){
    if( $(".login-input")[0].value == ""){
        $("#failure-username").html('&nbsp;&nbsp;&nbsp;&nbsp;请输入用户名');
        return;
    }
    if( $(".login-input")[1].value == ""){
        $("#failure-password").html('&nbsp;&nbsp;&nbsp;&nbsp;请输入密码');
        return;
    }
    if( $(".login-input")[2].value == ""){
        $("#failure-code").html('&nbsp;&nbsp;&nbsp;&nbsp;请输入验证码');
        return;
    }

    $.ajax({
        type:'post',
        async : false,
        url:'captcha/checkCaptchaCode.do',
        data:{"captchaCode" : $(".login-input")[2].value},
        success:function(res){
            if(res == "success"){
                document.forms[0].submit();
            }else {
                $("#failure-code").html('&nbsp;&nbsp;&nbsp;&nbsp;验证码错误');
            }
        }
    });
}

if(location.search.substr(1) == "error"){
    $("#failure-login").text("登陆失败");
}
