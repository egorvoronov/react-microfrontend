import React from "react";

function Html({ assets, state, children, title }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="favicon.ico" />
            <title>{title}</title>
        </head>
        <body>
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<b>Enable JavaScript to run this app.</b>`
            }}
        />
        {children}
        <script
            dangerouslySetInnerHTML={{
                __html: `
                window.assetManifest = ${JSON.stringify(assets)};
                window.serverState = ${JSON.stringify(state)};
                `
            }}
        />
        </body>
        </html>
    );
}

export default Html;
