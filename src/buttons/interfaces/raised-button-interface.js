/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module RaisedButtonInterface
 * @description - Raised button interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { MKButton } from 'react-native-material-kit';

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const DEFAULT_RAISED_BUTTON_STYLE = {
    container: {
        ...dropShadowStyleTemplate,
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        margin: 8,
        padding: 8,
        borderRadius: 2
    },
    icon: {
        width: 24,
        height: 24
    },
    label: {
        ...fontStyleTemplate.normal,
        marginHorizontal: 8
    }
};

const RaisedButtonInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-left`, `header-right`,
                `card-action`
            ],
            stronglyTyped: true
        },
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        disabled: {
            value: false,
            stronglyTyped: true
        },
        busy: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        },
        icon: {
            value: null
        },
        style: {
            value: null
        },
        onPress: {
            value: () => {},
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            Text,
            Image,
            View,
            ActivityIndicator
        } = ReactNative;
        const {
            color,
            disabled,
            busy,
            label,
            icon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            disabled: false,
            busy: false,
            label: `Raised Button`
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_RAISED_BUTTON_STYLE).with({
            container: {
                backgroundColor: !disabled ? theme.button.raised.container[color] : theme.button.raised.container.disabled
            },
            label: {
                color: !disabled ? theme.button.raised.label[color] : theme.button.raised.label.disabled,
                backgroundColor: `transparent`
            },
            icon: {
                tintColor: !disabled ? theme.button.raised.icon[color] : theme.button.raised.icon.disabled,
                backgroundColor: `transparent`
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const MKFlatButton = MKButton.accentColoredFlatButton()
                                     .withStyle(adjustedStyle.container)
                                     .withMaskBorderRadius(adjustedStyle.container.borderRadius)
                                     .build();

        return (
            <MKFlatButton onPress = { !disabled ? onPress : null }>
            {
                busy ? <ActivityIndicator size = 'small'/> :
                <View
                    style = {{
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}
                >
                {
                    icon === null ? null :
                    <Image
                        style = { adjustedStyle.icon }
                        source = {
                            Hf.isString(icon) ? {
                                uri: icon
                            } : icon
                        }
                        resizeMode = 'cover'
                    />
                }
                    <Text style = { adjustedStyle.label }>{ label }</Text>
                </View>
            }
            </MKFlatButton>
        );
    }
});

export default RaisedButtonInterface;
