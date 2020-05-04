module.exports = {
    devServer: {
        port: 8088,     // 端口号
        // publicPath: '/',
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/', //设置调用的接口域名和端口号
                changeOrigin: true,//如果需要跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};