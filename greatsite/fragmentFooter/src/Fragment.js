import React, { Suspense } from 'react';
import Footer from "./components/Footer";
import FragmentClientContainer from "react-mf-remote-fragment/client-container/FragmentClientContainer";

function Fragment() {
    if (process.env.REACT_APP_IS_SERVER === '1') {
        return <Footer/>;
    } else {
        return <FragmentClientContainer name="fragmentFooter">
            <Footer />
        </FragmentClientContainer>;
    }
}

export default Fragment;
