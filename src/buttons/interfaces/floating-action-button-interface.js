/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module FloatingActionButtonInterface
 * @description -  Floating action button interface.
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

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const DEFAULT_FLOATING_ACTION_BUTTON_STYLE = {
    container: {
        mini: {
            ...dropShadowStyleTemplate,
            justifyContent: `center`,
            alignItems: `center`,
            width: 40,
            height: 40,
            margin: 8,
            padding: 8,
            borderRadius: 20
        },
        normal: {
            ...dropShadowStyleTemplate,
            justifyContent: `center`,
            alignItems: `center`,
            width: 56,
            height: 56,
            margin: 8,
            padding: 8,
            borderRadius: 24
        }
    },
    icon: {
        width: 24,
        height: 24
    }
};

const FloatingActionButtonInterface = Hf.Interface.augment({
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
        mini: {
            value: false,
            stronglyTyped: true
        },
        disabled: {
            value: false,
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
            Image
        } = ReactNative;
        const {
            color,
            mini,
            disabled,
            icon,
            style,
            onPress
        } = Hf.fallback({
            color: `default`,
            mini: false,
            disabled: false
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE).with({
            container: {
                backgroundColor: {
                    mini: {
                        backgroundColor: !disabled ? theme.button.floatingAction.container[color] : theme.button.floatingAction.container.disabled
                    },
                    mornal: {
                        backgroundColor: !disabled ? theme.button.floatingAction.container[color] : theme.button.floatingAction.container.disabled
                    }
                }
            },
            icon: {
                tintColor: !disabled ? theme.button.floatingAction.icon[color] : theme.button.floatingAction.icon.disabled,
                backgroundColor: `transparent`
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const MKIconButton = new MKButton.Builder()
                                         .withStyle(mini ? adjustedStyle.container.mini : adjustedStyle.container.normal)
                                         .withFab(true)
                                         .withAccent(true)
                                         .withRippleLocation(`center`)
                                         .build();
        return (
            <MKIconButton onPress = { !disabled ? onPress : null }>
                <Image
                    style = { adjustedStyle.icon }
                    source = {
                        Hf.isString(icon) ? {
                            uri: icon
                        } : icon
                    }
                    resizeMode = 'cover'
                />
            </MKIconButton>
        );
    }
});

export default FloatingActionButtonInterface;
