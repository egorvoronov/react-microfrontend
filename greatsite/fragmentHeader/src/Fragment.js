import React, { Suspense } from 'react';
import Header from "./components/Header";
import FragmentClientContainer from "react-mf-remote-fragment/client-container/FragmentClientContainer";

function Fragment() {
    if (process.env.REACT_APP_IS_SERVER === '1') {
        return <Header/>;
    } else {
        return <FragmentClientContainer name="fragmentHeader">
            <Header />
        </FragmentClientContainer>;
    }
}

export default Fragment;
