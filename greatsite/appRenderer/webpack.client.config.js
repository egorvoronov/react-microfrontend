const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index',
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
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'appRenderer',
            filename: "remoteEntry.js",
            exposes: {
                './AppRendererContextForFragments': './context/AppRendererContextForFragments',
            },
            remotes: {
                fragmentHeader: `fragmentHeader@${getRemoteEntryUrl(3001)}`,
                // fragmentBody: `fragmentBody@${getRemoteEntryUrl(3004)}`,
                fragmentFooter: `fragmentFooter@${getRemoteEntryUrl(3002)}`,
            },
            shared: [
                {
                    react: { singleton: true, requiredVersion: deps.react },
                    'react-dom': { singleton: true, requiredVersion: deps[ 'react-dom' ] }
                },
                // https://github.com/module-federation/module-federation-examples/blob/f196c14fb91476152e0c3029e79a1758c7399ffb/shared-routing/shell/webpack.config.js#L77
                './context/AppRendererContextForFragments'
            ],
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
        return `//localhost:${port}/client/remoteEntry.js`;
    }

    const parts = HOSTNAME.split('-');
    const codesandboxId = parts[ parts.length - 1 ];

    return `//${codesandboxId}-${port}.sse.codesandbox.io/client/remoteEntry.js`;
}
