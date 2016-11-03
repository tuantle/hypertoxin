/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module DividerViewInterface
 * @description - A divider view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import theme from '../../styles/theme';

const DEVICE_WIDTH = ReactNative.Dimensions.get(`window`).width;

const DEFSULT_DIVIDER_VIEW_STYLE = {
    container: {
        width: DEVICE_WIDTH,
        height: 1,
        marginVertical: 8,
        backgroundColor: theme.divider
    }
};

const DividerViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View
        } = ReactNative;
        const {
            style
        } = property;
        let adjustedStyle = Hf.isObject(style) ? Hf.merge(DEFSULT_DIVIDER_VIEW_STYLE).with(style) : DEFSULT_DIVIDER_VIEW_STYLE;

        return (
            <View style = { adjustedStyle.container }>
                <View style = { adjustedStyle.line }/>
            </View>
        );
    }
});

export default DividerViewInterface;
