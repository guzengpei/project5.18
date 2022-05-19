$(function () {
    $('#link_reg').click(function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 获取form
    const form = layui.form

    // 定义表单验证规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password").val();
            if (pwd !== val) return "两次密码不一致"
        },
    })

    // layui的弹窗组件
    var layer = layui.layer

    // 设置请求的跟路径
    // var baseUrl = "http://www.liulongbin.top:3007"

    //监听注册表单 发送注册请求
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)

                layer.msg('注册成功')

                $('#link_login').click()
                $("#form_reg [name=username]").val('')
                $("#form_reg [name=password]").val('')
                $("#form_reg [name=repassword]").val('')
            }
        })
    })

    //监听登陆表单 发送登陆请求
    $('#form_login').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            // data: $(this).serialize(),
            data: {
                username: $("#form_login [name=username]").val(),
                password: $("#form_login [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)

                layer.msg('登陆成功')
            }
        })
    })
})
