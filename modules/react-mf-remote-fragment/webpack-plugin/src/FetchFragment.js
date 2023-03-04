import React, { useRef, useContext, Suspense } from 'react';
import ReadFragment from './ReadFragment';
import AppRendererContextForFragments from 'appRenderer/AppRendererContextForFragments';

/*
params to replace:
- url + port (3001) (http://localhost:3001/
*/

import axios from 'axios';

function FetchFragment(props) {
    const remoteRenderedFragmentData = useRef({ data: null });

    const { userAgent } = useContext(AppRendererContextForFragments);

    function waitRemoteRenderedFragment(props) {
        let done = false;
        let promise = null;
        return {
            read() {
                if (done) {
                    return;
                }
                if (promise) {
                    throw promise;
                }
                promise = new Promise(async (resolve) => {
                    const url = `http://localhost:3001/${Object.entries(props).reduce((result, current, index) => {
                        if (index === 0) {
                            return `${result}${current[ 0 ]}=${current[ 1 ]}`
                        } else {
                            return `${result}&${current[ 0 ]}=${current[ 1 ]}`
                        }
                    }, '?')}`
                    const response = await axios(url, { headers: { 'User-Agent': userAgent }  });
                    remoteRenderedFragmentData.current.data = response.data;
                    done = true;
                    promise = null;
                    resolve();
                });
                throw promise;
            }
        };
    }

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <ReadFragment
                waitRemoteRenderedFragment={waitRemoteRenderedFragment(props)}
                remoteRenderedFragmentData={remoteRenderedFragmentData.current}
            />
        </Suspense>
    );
}

export default FetchFragment;
