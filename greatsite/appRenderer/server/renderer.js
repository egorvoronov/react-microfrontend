import { renderToPipeableStream } from 'react-dom/server';
import React from 'react';
import App from '../src/App';

let assets = {
    'main.js': 'http://localhost:3000/main.js',
};

export default async (req, res, next) => {
    res.socket.on('error', (error) => {
        console.error('Fatal', error);
    });

    let didError = false;

    const state = {
        firstname: 'Firstname',
        userAgent: req.get('user-agent'),
    }

    const { pipe, abort } = renderToPipeableStream(
        <App assets={assets} state={state} />,
        {
            bootstrapScripts: [
                assets[ 'main.js' ],
            ],
            onShellReady() {
                // If something errored before we started streaming, we set the error code appropriately.
                res.statusCode = didError ? 500 : 200;
                res.setHeader('Content-type', 'text/html');
                pipe(res);
            },
            onError(x) {
                didError = true;
                console.error(x);
            }
        }
    );
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    setTimeout(abort, 10000);

};
