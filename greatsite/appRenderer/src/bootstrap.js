import React from "react";
import {hydrateRoot} from 'react-dom/client';
import App from "./App";

hydrateRoot(document, <App assets={window.assetManifest} state={window.serverState} />);
