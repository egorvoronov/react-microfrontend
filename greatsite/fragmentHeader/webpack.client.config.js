const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/client/index',
    mode: 'development',
    devtool: false,
    output: {
        path: path.join(__dirname, 'dist/client'),
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [path.resolve('./src'), /node_modules\/react-mf-remote-fragment/],
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'fragmentHeader',
            library: { type: 'var', name: 'fragmentHeader' },
            remotes: {
                appRenderer: `appRenderer@${getRemoteEntryUrl(3000)}`,
            },
            filename: 'remoteEntry.js',
            exposes: {
                './Fragment': './src/Fragment',
            },
            shared: {
                react: { singleton: true, requiredVersion: deps.react },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
            },
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_IS_SERVER': JSON.stringify(process.env.REACT_APP_IS_SERVER),
        }),
    ],
};


function getRemoteEntryUrl(port) {
    const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

    // Check if the example is running on codesandbox
    // https://codesandbox.io/docs/environment
    if (!CODESANDBOX_SSE) {
        return `//localhost:${port}/remoteEntry.js`;
    }

    const parts = HOSTNAME.split('-');
    const codesandboxId = parts[ parts.length - 1 ];

    return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}