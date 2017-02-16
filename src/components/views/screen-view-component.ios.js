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
 * @module ScreenViewComponent
 * @description - Screen view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import theme from '../../styles/theme';

const {
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_SCREEN_VIEW_STYLE = {
    container: {
        flexGrow: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    }
};

const ScreenViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            shade,
            style,
            children
        } = Hf.fallback({
            shade: `light`
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_SCREEN_VIEW_STYLE).with({
            container: {
                backgroundColor: theme.color.body.container[shade]
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View style = { adjustedStyle.container }>
            {
                children
            }
            </View>
        );
    }
});

const ScreenViewComponent = ScreenViewInterface({
    name: `screen-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default ScreenViewComponent;
