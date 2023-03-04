import express from "express";
import React from "react";
import morgan from "morgan";
import initMiddleware from "./middleware";
import serve from "./middlewares/serve";

const app = express();

console.log('starting host server');
app.use(morgan('dev'));
app.use(serve('./dist/client'));

const done = () => {
    app.listen(3000, () => {
        console.log(`Server is listening on port: 3000`);
    });
};

initMiddleware(express, app, done);
