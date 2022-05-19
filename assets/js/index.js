$(function () {
    getUserInfo()
})

const layer = layui.layer


// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: res => {
            console.log(res);
            if (res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户数据成功')

            // 调用渲染头像函数
            randerAvatar(res.data)
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