/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module ScreenViewInterface
 * @description - Screen view interface.
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

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_SCREEN_VIEW_STYLE = {
    container: {
        flex: 1,
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
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View
        } = ReactNative;
        const {
            shade,
            style,
            children
        } = Hf.fallback({
            shade: `light`
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_SCREEN_VIEW_STYLE).with({
            container: {
                backgroundColor: theme.body.container[shade]
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

export default ScreenViewInterface;
