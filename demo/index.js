'use strict'; //eslint-disable-line
/* eslint quotes: 0 */

// require(`react-devtools-core`).connectToDevTools({
//     host: `192.168.1.1`,
//     port: `8097`
// });
//
// window.TARGET = `client-native`;
// window.NODE_ENV = `development`;
// window.LOGGING_INFO0 = true;
// window.LOGGING_INFO1 = true;
// window.LOGGING_WARN0 = false;
// window.LOGGING_WARN1 = true;

window.TARGET = `client-native`;
window.NODE_ENV = `production`;
window.LOGGING_INFO0 = false;
window.LOGGING_INFO1 = false;
window.LOGGING_WARN0 = false;
window.LOGGING_WARN1 = false;

const DemoApp = require('./src/app/demo-app').default;

/* start app call */
DemoApp.start();
