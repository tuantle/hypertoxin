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

const DEFAULT_DIVIDER_VIEW_STYLE = {
    minWidth: DEVICE_WIDTH,
    height: Ht.Theme.misc.size.divider,
    marginVertical: 9,
    backgroundColor: Ht.Theme.misc.color.divider
};

const DividerComponent = function DividerComponent (property = {
    thickness: Ht.Theme.misc.size.divider,
    color: Ht.Theme.misc.color.divider
}) {
    const {
        thickness,
        color,
        style
    } = Hf.fallback({
        thickness: Ht.Theme.misc.size.divider,
        color: Ht.Theme.misc.color.divider
    }).of(property);
    const adjustedStyle = Hf.isObject(style) ? Hf.merge(DEFAULT_DIVIDER_VIEW_STYLE).with({
        height: thickness,
        backgroundColor: color,
        ...style
    }) : Hf.merge(DEFAULT_DIVIDER_VIEW_STYLE).with({
        height: thickness,
        backgroundColor: color
    });

    return (
        <View style = { adjustedStyle }/>
    );
};

DividerComponent.propTypes = {
    thickness: PropTypes.number,
    color: PropTypes.string
};

export default DividerComponent;
