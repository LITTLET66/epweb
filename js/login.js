$(function() {
    
    // 1. Tab 切换逻辑
    $('.tab-item').on('click', function() {
        // 样式切换
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
        
        // 内容切换
        var target = $(this).data('target');
        $('.form-content-box').hide();
        $('#form-' + target).fadeIn(200);
    });

    // 2. 密码可见性切换
    $('#toggle-pwd').on('click', function() {
        var $input = $('#password');
        var $icon = $(this).find('i');
        
        if ($input.attr('type') === 'password') {
            $input.attr('type', 'text');
            $icon.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            $input.attr('type', 'password');
            $icon.removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });

    // 3. 手机验证码倒计时逻辑
    $('#btn-send-code').on('click', function() {
        var $btn = $(this);
        var phone = $('#mobile-phone').val();

        // 简单校验手机号
        if (!phone || phone.length !== 11) {
            alert('请输入正确的11位手机号码');
            return;
        }

        if ($btn.hasClass('disabled')) return;

        // 模拟发送请求
        // 实际开发中这里会调用 ajax
        alert('验证码已发送，请注意查收（模拟：123456）');

        // 开始倒计时
        var count = 60;
        $btn.addClass('disabled').text(count + 's 后重发');
        
        var timer = setInterval(function() {
            count--;
            if (count <= 0) {
                clearInterval(timer);
                $btn.removeClass('disabled').text('获取验证码');
            } else {
                $btn.text(count + 's 后重发');
            }
        }, 1000);
    });

    // 4. 账号登录按钮点击
    $('#submit-btn').on('click', function() {
        handleLogin('account');
    });

    // 5. 手机登录按钮点击
    $('#submit-mobile-btn').on('click', function() {
        handleLogin('mobile');
    });

    // 通用登录处理函数
    function handleLogin(type) {
        var requestData = { token: "", params: {} };

        if (type === 'account') {
            var username = $('#username').val();
            var password = $('#password').val();
            if (!username || !password) {
                alert('请输入账号和密码');
                return;
            }
            requestData.params.username = username;
            requestData.params.password = password;
        } else if (type === 'mobile') {
            var phone = $('#mobile-phone').val();
            var code = $('#mobile-code').val();
            if (!phone || !code) {
                alert('请输入手机号和验证码');
                return;
            }
            requestData.params.phone = phone;
            requestData.params.code = code;
        }

        // 按钮loading状态（简单选取当前可见的登录按钮）
        var $btn = $('.form-content-box:visible .btn-login');
        var originalText = $btn.text();
        $btn.text('登录中...').prop('disabled', true).css('opacity', '0.7');

        // 发送 Ajax 请求
        $.ajax({
            url: _settings.login,
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(requestData),
            success: function(res) {
                $btn.text(originalText).prop('disabled', false).css('opacity', '1');
                if (res.status.code == "200" && res.custom.code == "1") {
                    alert(res.custom.text);
                } else {
                    alert(res.custom.text || '登录失败');
                }
            },
            error: function() {
                $btn.text(originalText).prop('disabled', false).css('opacity', '1');
                alert('网络请求失败');
            }
        });
    }
});