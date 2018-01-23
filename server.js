require("dotenv").config();

const webpack = require("webpack");
const WebpackDevServer= require("webpack-dev-server");
const config = require("./webpack.config");
const compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    publicPath: "",
    hot: true,
    inline: true
});

server.listen(8080, "localhost", () => {
    console.log("Running on :8080");
});
