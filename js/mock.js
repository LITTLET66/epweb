// 确保 Mock 插件已加载且配置为开启状态
if (window.Mock && Config.useMock) {
    
    // 设置 Mock 的响应延时，模拟真实网络请求的 loading 感（200-600毫秒）
    Mock.setup({
        timeout: '200-600'
    });

    // 1. 定义登录接口的 Mock 数据
    // 对应 _settings.login 变量的值
    Mock.mock(_settings.login, 'post', function(options) {
        // 解析请求参数（实际开发中后端会校验账号密码）
        // 这里为了演示，我们直接返回成功
        
        return Mock.mock({
            "custom": {
                "code": "1", // 业务成功码
                "text": "登录成功，正在跳转...",
                "token": "mock-token-123456789",
                "userInfo": {
                    "username": "admin",
                    "role": "manager"
                }
            },
            "status": { 
                "code": "200", // HTTP状态码
                "text": "ok" 
            }
        });
    });

    console.log('Mock 数据已加载');
}