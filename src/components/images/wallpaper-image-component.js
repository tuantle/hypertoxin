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
 * @module WallpaperImageComponent
 * @description - Wallpaper image component.
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
    ImageBackground
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_WALLPAPER_IMAGE_STYLE = {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
};

const WallpaperImageComponent = function WallpaperImageComponent (property = {
    resizeMode: Ht.Theme.image.wallpaper.resizeMode
}) {
    const {
        resizeMode,
        source,
        defaultSource,
        style,
        children
    } = Hf.fallback({
        resizeMode: Ht.Theme.image.wallpaper.resizeMode
    }).of(property);
    const adjustedStyle = Hf.isObject(style) ? Hf.merge(DEFAULT_WALLPAPER_IMAGE_STYLE).with(style) : DEFAULT_WALLPAPER_IMAGE_STYLE;

    return (
        <ImageBackground
            style = { adjustedStyle }
            source = {
                Hf.isString(source) ? {
                    uri: source,
                    cache: `only-if-cached`
                } : source
            }
            defaultSource = {
                Hf.isString(defaultSource) ? {
                    uri: defaultSource
                } : defaultSource
            }
            resizeMode = { resizeMode }
        >{ children }</ImageBackground>
    );
};

WallpaperImageComponent.propTypes = {
    resizeMode: PropTypes.oneOf([ `cover`, `contain`, `stretch`, `repeat`, `center` ])
};

export default WallpaperImageComponent;