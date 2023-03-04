const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

process.env.REACT_APP_IS_SERVER = 1;

module.exports = {
    entry: "./src/server/index",
    target: "node",
    mode: "development",
    devtool: false,
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [path.resolve('./src'), /node_modules\/react-mf-remote-fragment/],
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_IS_SERVER': JSON.stringify(process.env.REACT_APP_IS_SERVER),
        }),
        new CopyPlugin({
            patterns: [
                { from: "public", to: "assets" },
            ],
        }),
    ]
};
