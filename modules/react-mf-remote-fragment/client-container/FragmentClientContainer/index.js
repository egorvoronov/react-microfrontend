import React, { Suspense } from 'react';
import FragmentHeaderReadComponent from '../FragmentReadComponent';

const FragmentClientContainer = ({ name, children }) => {
  function waitFragmentInitialization() {
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
        promise = Promise.all([
          new Promise((resolve) => resolve()/*{
            loadableReady(() => resolve(null));
          }*/),
        ]).then(() => {
            done = true;
            promise = null;
        });
        throw promise;
      },
    };
  }

  return (
    <Suspense fallback={<div>Loading client....</div>}>
      <FragmentHeaderReadComponent
        name={name}
        waitFragmentInitialization={waitFragmentInitialization()}
      >
        {children}
      </FragmentHeaderReadComponent>
    </Suspense>
  );
};

export default FragmentClientContainer;
