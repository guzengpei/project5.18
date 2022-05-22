$(function () {
    getUserInfo()

    // 退出功能
    const layer = layui.layer
    $('#btnLogout').click(function () {
        layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    })
})

const layer = layui.layer


// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: res => {
            console.log(res);
            if (res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户数据成功')

            // 调用渲染头像函数
            randerAvatar(res.data)
        },

        // 无论成功或者失败 都会调用 complete 回调函数
        complete: (res) => {
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
}

// 渲染头像函数
const randerAvatar = (user) => {
    const name = user.nickname || user.username;

    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    //  按需渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        const firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
};


function change() {
    $('#art_list').addClass('layui-this').next().removeClass('layui-this')
}