"use strict";
exports.id = "fetchReadFragment";
exports.ids = ["fetchReadFragment"];
exports.modules = {

/***/ "./src/template-of-components-to-generate/FetchFragment.js":
/*!*****************************************************************!*\
  !*** ./src/template-of-components-to-generate/FetchFragment.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReadFragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReadFragment */ "./src/template-of-components-to-generate/ReadFragment.js");
/* harmony import */ var appRenderer_AppRendererContextForFragments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! appRenderer/AppRendererContextForFragments */ "webpack/container/remote/appRenderer/AppRendererContextForFragments");
/* harmony import */ var appRenderer_AppRendererContextForFragments__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(appRenderer_AppRendererContextForFragments__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);





function FetchFragment(props) {
  const remoteRenderedFragmentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    data: null
  });
  const {
    userAgent
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)((appRenderer_AppRendererContextForFragments__WEBPACK_IMPORTED_MODULE_2___default()));

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

        promise = new Promise(async resolve => {
          const url = `http://localhost:3001/${Object.entries(props).reduce((result, current, index) => {
            if (index === 0) {
              return `${result}${current[0]}=${current[1]}`;
            } else {
              return `${result}&${current[0]}=${current[1]}`;
            }
          }, '?')}`;
          const response = await axios__WEBPACK_IMPORTED_MODULE_3___default()(url, {
            headers: {
              'User-Agent': userAgent
            }
          });
          remoteRenderedFragmentData.current.data = response.data;
          done = true;
          promise = null;
          resolve();
        });
        throw promise;
      }

    };
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading....")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ReadFragment__WEBPACK_IMPORTED_MODULE_1__["default"], {
    waitRemoteRenderedFragment: waitRemoteRenderedFragment(props),
    remoteRenderedFragmentData: remoteRenderedFragmentData.current
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchFragment);

/***/ }),

/***/ "./src/template-of-components-to-generate/ReadFragment.js":
/*!****************************************************************!*\
  !*** ./src/template-of-components-to-generate/ReadFragment.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-react-parser */ "html-react-parser");
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_react_parser__WEBPACK_IMPORTED_MODULE_1__);



function ReadFragment({
  waitRemoteRenderedFragment,
  remoteRenderedFragmentData
}) {
  // if server only
  waitRemoteRenderedFragment.read();
  const {
    htmlFragment,
    link,
    preloadedState,
    serverData
  } = remoteRenderedFragmentData.data;
  const css = `http://localhost:3001/${link}`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
(() => {
  window.fragmentsSideEffects = window.fragmentsSideEffects || {};
  window.fragmentsSideEffects['fragmentHeader'] = {
    css: ${JSON.stringify(css)},
    preloadedState: ${preloadedState},
    multiLocaleRouterConfig: ${JSON.stringify(serverData.multiLocaleRouterConfig)},
  };
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = ${JSON.stringify(css)};
  document.head.appendChild(link);
})()
`
    }
  }), html_react_parser__WEBPACK_IMPORTED_MODULE_1___default()(htmlFragment));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadFragment);

/***/ })

};
;
