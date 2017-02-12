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
 * @module CreditCardFieldApplet
 * @description - Credit card field applet.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

/* load credit card field domain */
import CreditCardFieldDomain from './domains/credit-card-field-domain';

const CreditCardFieldApplet = Hf.App.augment({
    composites: [
        Hf.React.AppRendererComposite,
        Hf.React.AppComponentComposite
    ],
    $init: function $init () {
        const app = this;
        app.register({
            domain: CreditCardFieldDomain({
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

export default function CreditCardField (property) {
    const Component = CreditCardFieldApplet({
        name: `credit-card-field`
    }).getTopComponent({
        doConvertToStandaloneComponent: true,
        componentMethodAndPropertyInclusions: [
            `isValidated`,
            `focus`,
            `blur`,
            `clear`
        ]
    });

    return (
        <Component { ...property } />
    );
}
