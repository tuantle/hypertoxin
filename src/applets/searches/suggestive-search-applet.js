/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module SuggestiveSearchApplet
 * @description - Suggestive search applet.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import PropTypes from 'prop-types';

import CreateReactClass from 'create-react-class';

/* load suggestive search domain */
import SuggestiveSearchDomain from './domains/suggestive-search-domain';

const SuggestiveSearchApplet = Hf.App.augment({
    composites: [
        Hf.React.AppRendererComposite,
        Hf.React.AppComponentComposite
    ],
    $init: function $init () {
        const app = this;
        app.register({
            domain: SuggestiveSearchDomain({
                name: app.name
            }),
            component: {
                library: {
                    React,
                    ReactNative,
                    PropTypes,
                    CreateReactClass
                },
                renderer: ReactNative
            }
        });
    }
});

export default SuggestiveSearchApplet;
