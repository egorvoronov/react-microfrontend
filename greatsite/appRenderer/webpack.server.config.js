const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require('webpack');
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const ReactMFRemoteFragmentPlugin = require('react-mf-remote-fragment/webpack-plugin');

module.exports = {
    entry: "./server/index",
    target: "node",
    externals: [
        nodeExternals(),
    ],
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
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "appRenderer",
            library: { type: "commonjs-module" },
            filename: 'remoteContainer.js',
            exposes: {
                './AppRendererContextForFragments': './context/AppRendererContextForFragments',
            },
            remotes: {
                fragmentHeader: path.resolve(
                    __dirname,
                    "./dist/fragmentHeader/remoteContainer.js"
                ),
                fragmentFooter: path.resolve(
                    __dirname,
                    "./dist/fragmentFooter/remoteContainer.js"
                )
            },
            shared: [
                // { react: { singleton: true }, "react-dom": { singleton: true } }
                './context/AppRendererContextForFragments'
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_IS_SERVER': JSON.stringify(process.env.REACT_APP_IS_SERVER),
        }),
        new ReactMFRemoteFragmentPlugin({
            name: 'fragmentHeader',
            url: 'http://localhost:3001'
        }),
        new ReactMFRemoteFragmentPlugin({
            name: 'fragmentFooter',
            url: 'http://localhost:3002'
        }),
    ],
};
