/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module WallpaperImageInterface
 * @description - Wallpaper image interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

const DEVICE_WIDTH = ReactNative.Dimensions.get(`window`).width;
const DEVICE_HEIGHT = ReactNative.Dimensions.get(`window`).height;

const DEFAULT_WALLPAPER_IMAGE_STYLE = {
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
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
        },
        source: {
            value: null
        },
        defaultSource: {
            value: null
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            Image
        } = ReactNative;
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
                        uri: source
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

export default WallpaperImageInterface;
