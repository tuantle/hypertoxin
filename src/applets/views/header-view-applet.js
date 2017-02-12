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
 * @module HeaderViewApplet
 * @description - Header view applet.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

/* load header domain */
import HeaderDomain from './domains/header-domain';

const HeaderViewApplet = Hf.App.augment({
    composites: [
        Hf.React.AppRendererComposite,
        Hf.React.AppComponentComposite
    ],
    $init: function $init () {
        const app = this;
        app.register({
            domain: HeaderDomain({
                name: app.name
            }),
            component: {
                library: {
                    React,
                    ReactNative
                },
                renderer: ReactNative
            }
        });
    }
});

export default function HeaderView (property) {
    const Component = HeaderViewApplet({
        name: `header-view`
    }).getTopComponent({
        doConvertToStandaloneComponent: true,
        componentMethodAndPropertyInclusions: [
            `minimize`,
            `maximize`
        ]
    });

    return (
        <Component { ...property } />
    );
}
