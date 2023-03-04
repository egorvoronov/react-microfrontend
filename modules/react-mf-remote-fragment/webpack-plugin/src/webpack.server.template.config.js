const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index',
    target: 'node',
    externals: [
        nodeExternals(),
    ],
    mode: 'development',
    devtool: false,
    output: {
        path: path.join(__dirname, 'dist/copy_to_client'),
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [ '@babel/preset-react' ],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'fragmentHeader',
            library: { type: 'commonjs-module' },
            filename: 'remoteContainer.js',
            remotes: {
                appRenderer: "../remoteContainer.js",
            },
            exposes: {
                './Fragment': './src/FetchFragment',
            },
            shared: [
                { react: { singleton: true } },
            ],
        }),
    ],
};
