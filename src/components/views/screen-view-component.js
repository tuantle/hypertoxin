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
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from '../../hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

const {
    Dimensions,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_SCREEN_VIEW_STYLE = {
    flexGrow: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
};

const ScreenViewComponent = function ScreenViewComponent (property = {
    shade: Ht.Theme.view.screen.shade
}) {
    const {
        shade,
        style,
        children
    } = Hf.fallback({
        shade: Ht.Theme.view.screen.shade
    }).of(property);
    const adjustedStyle = Hf.isObject(style) ? Hf.merge(DEFAULT_SCREEN_VIEW_STYLE).with({
        backgroundColor: Ht.Theme.view.color.screen[shade],
        ...style
    }) : Hf.merge(DEFAULT_SCREEN_VIEW_STYLE).with({
        backgroundColor: Ht.Theme.view.color.screen[shade]
    });
    const screenViewChildProperty = {
        shade
    };
    let screenViewChildren = null;

    if (React.Children.count(children) > 0) {
        let fragments = React.Children.toArray(React.Children.map(children, (child) => {
            if (child !== null) {
                return React.cloneElement(child, screenViewChildProperty);
            } else {
                return null;
            }
        }));
        screenViewChildren = Hf.isEmpty(fragments) ? null : fragments;
    }

    return (
        <View style = { adjustedStyle }>
            {
                screenViewChildren
            }
        </View>
    );
};

ScreenViewComponent.propTypes = {
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default ScreenViewComponent;
