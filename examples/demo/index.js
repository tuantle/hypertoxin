/**
 * Copyright 2015-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @description - Hypertoxin showcase demo app for ios & android.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 */
'use strict'; //eslint-disable-line
/* eslint quotes: 0 */

require(`react-devtools-core`).connectToDevTools({
    host: `10.0.1.7`,
    port: `8097`
});

/* load and initialize hyperflow */
require('hyperflow').init({
    target: `client-native`,
    enableProductionMode: false,
    enableInfo0Logging: false,
    enableInfo1Logging: true,
    enableWarn0Logging: false,
    enableWarn1Logging: true
});

/* load and initialize hypertoxin */
require('hypertoxin').init({
    customTheme: require(`./src/common/theme`).default
});

const DemoApp = require('./src/app/demo-app').default;

/* start app call */
DemoApp.start();
