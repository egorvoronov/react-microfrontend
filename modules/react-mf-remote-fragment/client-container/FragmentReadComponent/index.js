import React from 'react';

const FragmentReadComponent = ({
  waitFragmentInitialization,
  name,
  children,
}) => {
  waitFragmentInitialization.read();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  window.fragmentsSideEffects = window.fragmentsSideEffects || {};
  window.fragmentsSideEffects['${name}'] = {
    css: ${JSON.stringify(window.fragmentsSideEffects[name].css)},
    preloadedState: ${window.fragmentsSideEffects[name].preloadedState}
  };
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = "${window.fragmentsSideEffects[name].css}";
  document.head.appendChild(link);
})()
`
        }}
      />
      {children}
    </>
  );
};

export default FragmentReadComponent;
