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
 * @module DividerComponent
 * @description - A divider component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import { Ht } from '../../hypertoxin';

const {
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_DIVIDER_VIEW_STYLE = {
    container: {
        width: DEVICE_WIDTH,
        height: 1,
        marginVertical: 6,
        backgroundColor: Ht.Theme.color.divider
    }
};

const DividerInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        thickness: {
            value: 1,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            thickness,
            style
        } = Hf.fallback({
            thickness: 1
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_DIVIDER_VIEW_STYLE).with({
            container: {
                height: thickness
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View style = { adjustedStyle.container }>
                <View style = { adjustedStyle.line }/>
            </View>
        );
    }
});

const DividerComponent = DividerInterface({
    name: `divider`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default DividerComponent;
