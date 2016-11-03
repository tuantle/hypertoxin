/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module HeadlineTextInterface
 * @description - Headline text interface.
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

import fontStyleTemplate from '../../styles/templates/font-style-template';

const DEFAULT_HEADLINE_TEXT_STYLE = {
    small: fontStyleTemplate.normalLarge,
    normal: fontStyleTemplate.normalLarger,
    large: fontStyleTemplate.normalLargest
};

const HeadlineTextInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-center`,
                `card-header-left`, `card-header-right`,
                `card-media`, `card-overlay`,
                `card-body`
            ],
            stronglyTyped: true
        },
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        customColor: {
            value: ``,
            stronglyTyped: true
        },
        size: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        alignment: {
            value: `center`,
            oneOf: [ `left`, `center`, `right` ],
            stronglyTyped: true
        },
        decoration: {
            value: `none`,
            oneOf: [ `none`, `underline`, `line-through` ],
            stronglyTyped: true
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            Text
        } = ReactNative;
        const {
            shade,
            color,
            customColor,
            size,
            alignment,
            decoration,
            style,
            children
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            size: `normal`,
            alignment: `center`,
            decoration: `none`
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_HEADLINE_TEXT_STYLE[size]).with({
            flexWrap: `wrap`,
            textAlign: alignment,
            textDecorationLine: decoration,
            color: Hf.isEmpty(customColor) ? theme.text[color][shade] : customColor,
            backgroundColor: `transparent`
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <Text
                style = { adjustedStyle }
                ellipsizeMode = 'tail'
                numberOfLines = { 1 }
            >
            {
                children
            }
            </Text>
        );
    }
});

export default HeadlineTextInterface;
