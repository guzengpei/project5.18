$.ajaxPrefilter((options) => {
    options.url = "http://www.liulongbin.top:3007" + options.url

    if(options.url.includes("/my/")){
        options.headers={
            Authorization: localStorage.getItem('token')
        }
    }

    options.complete = (res) => {
        // console.log(1);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            console.log(1);
            //  强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            location.href = "/login.html"
        }
    }
})