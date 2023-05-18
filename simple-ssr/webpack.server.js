const path = require("path");

module.exports = {
  entry: {
    index:"./src/server/index.js",
    ssraxios:"./src/server/ssr-axios.js",
    ssrsdk:"./src/server/ssr-sdk.js",
  },

  target: "node",

  externals: [],

  output: {
    path: path.resolve("server-build"),
    // filename: "index.js",
    // library: "index",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ],
  },
};
