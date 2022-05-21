$(function () {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    const initUserinfo = function () {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                layer.msg('获取用户数据成功')

                form.val("formUserInfo", res.data);
            }
        })
    }

    initUserinfo()


    // 实现点击重制
    $('#btnReset').click(function (e) {
        e.preventDefault()
        initUserinfo()
    })


    //  更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                // layer.msg('获取用户数据成功')

                // 调用index的头像渲染函数重新渲染页面
                window.parent.getUserInfo()
            }
        })
    })

    

})