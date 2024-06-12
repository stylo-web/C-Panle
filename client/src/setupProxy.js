import createProxyMiddleware from 'http-proxy-middleware'

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://e-commerce-beige-three.vercel.app',
            changeOrigin: true,
        })
    );
};
