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
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

const {
    Image
} = ReactNative;

const DEVICE_WIDTH = ReactNative.Dimensions.get(`window`).width;
const DEVICE_HEIGHT = ReactNative.Dimensions.get(`window`).height;

const DEFAULT_WALLPAPER_IMAGE_STYLE = {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
};

const WallpaperImageInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        resizeMode: {
            value: `cover`,
            oneOf: [ `cover`, `contain`, `stretch`, `repeat`, `center` ],
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            resizeMode,
            source,
            defaultSource,
            style,
            children
        } = Hf.fallback({
            resizeMode: `cover`
        }).of(property);
        let adjustedStyle = DEFAULT_WALLPAPER_IMAGE_STYLE;

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <Image
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
            >
            {
                children
            }
            </Image>
        );
    }
});

const WallpaperImageComponent = WallpaperImageInterface({
    name: `wallpaper-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default WallpaperImageComponent;
