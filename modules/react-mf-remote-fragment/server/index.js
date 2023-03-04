import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serve from "./middlewares/serve";

export default ({ Fragment, port, link, publicFolder }) => {
    const app = express();

    console.log('starting fragment server');
    app.use(serve(publicFolder));

    app.get('*', (req, res, next) => {
        setTimeout(() => {
            res.send({
                htmlFragment: ReactDOMServer.renderToString(<Fragment {...req.query}/>),
                link,
            });
        }, 5000);
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

