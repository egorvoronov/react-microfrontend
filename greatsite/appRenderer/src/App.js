import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FragmentHeader from 'fragmentHeader/Fragment';
import FragmentFooter from 'fragmentFooter/Fragment';
import AppRendererContextForFragments from '../context/AppRendererContextForFragments';

import Html from './Html';

function App({ assets, state }) {
    return (
        <Html assets={assets} state={state} title="Hello">
            <Suspense fallback={<div>Spinner....</div>}>
                <ErrorBoundary FallbackComponent={Error}>
                    <Content state={state}/>
                </ErrorBoundary>
            </Suspense>
        </Html>
    );
}

const Content = ({ state }) => {
    return (
        <AppRendererContextForFragments.Provider value={{
            userAgent: state.userAgent,
        }}>
            <FragmentHeader firstname={state.firstname} />
            {/*<FragmentPdpPage did={1234123} />*/}
            <div style={{height: "300px", backgroundColor: "grey", textAlign: "center", paddingTop: "100px"}}>Great Body of the page (Another fragment)</div>
            <FragmentFooter />
        </AppRendererContextForFragments.Provider>
    );
}

function Error({ error }) {
    return (
        <div>
            <h1>Application Error</h1>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
        </div>
    );
}

export default App;
