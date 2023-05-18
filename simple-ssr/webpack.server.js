const path = require("path");

module.exports = {
  entry: [
    "./src/server/index.js",
    "./src/server/ssr-axios.js",
    "./src/server/ssr-sdk.js",
  ],

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
