
const PROXY_CONFIG = {
  "/api": {
    "target": "http://astoria3.midehost.com/api",
    "secure": false,
    "bypass": function (req, res, proxyOptions) {
      req.headers["email"] = "maximiliano.acl@gmail.com";
      req.headers["host"] = "astoria3.midehost.com";
      req.headers["key"] = "1d520a69de0ed55e1beed8641f91428be78d63bdf02ba5ce532b31713e13a103";
      console.log('req', req.headers);
    },
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true,
    logLevel: "debug"
  }
};


module.exports = PROXY_CONFIG;
