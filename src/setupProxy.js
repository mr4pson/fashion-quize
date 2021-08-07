const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3100/",
//    target: "http://80.78.245.74:3100/",
      pathRewrite: {
        "^/api/": "/", // remove base path
      },
    })
  );
};
