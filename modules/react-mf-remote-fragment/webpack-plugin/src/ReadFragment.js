import React from 'react';
import htmlReactParser from 'html-react-parser';

/*

params to generate
- url + port (http://localhost:3001)
- name

*/

function ReadFragment({ waitRemoteRenderedFragment, remoteRenderedFragmentData }) {
    // if server only
    waitRemoteRenderedFragment.read();

    const { htmlFragment, link, preloadedState } = remoteRenderedFragmentData.data;
    const css = `http://localhost:3001${link}`;

    return <>
        <script
            dangerouslySetInnerHTML={{
                __html: `
(() => {
  window.fragmentsSideEffects = window.fragmentsSideEffects || {};
  window.fragmentsSideEffects['fragmentHeader'] = {
    css: ${JSON.stringify(css)},
    preloadedState: ${preloadedState},
  };
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = ${JSON.stringify(css)};
  document.head.appendChild(link);
})()
`
            }}
        />
        {htmlReactParser(htmlFragment)}
    </>;
}

export default ReadFragment;
