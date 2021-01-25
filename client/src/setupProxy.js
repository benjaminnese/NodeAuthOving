const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) { //trengs bare i dev mode, på heroku eksistere ikke create app react
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};