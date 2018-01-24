const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const html = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const loaders = {
    ts: {
        loader: "ts-loader"
    },
    css: {
        loader: "css-loader"
    },
    postcss: {
        loader: "postcss-loader",
        options: {
            plugins: (loader) => [
                autoprefixer({
                    browsers: [
                        "last 2 versions"
                    ]
                })
            ]
        }
    },
    scss: {
        loader: "sass-loader",
            options: {
            includePaths: [
                path.resolve(__dirname, "./src")
            ]
        }
    }
};

const config = {
    entry: {
        app: "./src/index.ts"
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                loaders.ts
            ]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    loaders.css,
                    loaders.postcss,
                    loaders.scss
                ]
            })
        }]
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "",
        filename: "[name].js",
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new ExtractTextPlugin("[name].css"),
        new html({
            template : __dirname + "/src/index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "inline-source-map",
    resolve: {
        extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".scss"
        ],
        modules: [
            path.join(__dirname, "./src"),
            "node_modules"
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};


module.exports = config;
