const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const loaders = {
    ts: {
        loader: 'ts-loader'
    },
    css: {
        loader: 'css-loader'
    },
    assets: {
        loader: 'url-loader'
    },
    postcss: {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                autoprefixer({
                    browsers: [
                        'last 2 versions'
                    ]
                })
            ]
        }
    },
    scss: {
        loader: 'sass-loader',
            options: {
            includePaths: [
                path.resolve(__dirname, './src')
            ]
        }
    }
};

const config = {
    context: __dirname + '/src',
    entry: {
        fetch: [
            'whatwg-fetch'
        ],
        app: [
            __dirname + '/src/index.ts'
        ]
    },
    module: {
        rules: [{
            test: /.*devicon\.(css|eot|svg|ttf|woff)/,
            use:[
                loaders.assets
            ]
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                loaders.ts
            ]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    loaders.css,
                    loaders.postcss,
                    loaders.scss
                ]
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                loaders.assets
            ]
        }]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('[name].css'),
        new html({
            template : __dirname + '/src/index.html'
        })
    ],
    devtool: 'inline-source-map',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.scss'
        ],
        modules: [
            path.join(__dirname, './src'),
            'node_modules'
        ]
    }
};


module.exports = config;
