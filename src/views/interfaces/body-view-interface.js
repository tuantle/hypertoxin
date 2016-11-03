/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module BodyViewInterface
 * @description - Body view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { BlurView } from 'react-native-blur';

import theme from '../../styles/theme';

const DEFAULT_BODY_VIEW_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `column`,
        justifyContent: `flex-start`,
        alignItems: `stretch`,
        paddingHorizontal: 6
    }
};

const BodyViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        scollableComponentRef: {
            value: null
        },
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        overlay: {
            value: `opaque`,
            oneOf: [ `opaque`, `transparent`, `translucent-clear`, `translucent-frosted` ],
            stronglyTyped: true
        },
        scrollable: {
            value: false,
            stronglyTyped: true
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View,
            ScrollView
        } = ReactNative;
        const {
            scollableComponentRef,
            shade,
            overlay,
            scrollable,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            scrollable: false
        }).of(property);
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFAULT_BODY_VIEW_STYLE).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.body.container[shade];
                    case `translucent-clear`:
                        return `${theme.body.container[shade]}${theme.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (scrollable) {
            if (frosted) {
                return (
                    <BlurView
                        blurType = { shade }
                        style = { adjustedStyle.container }
                    >
                        <ScrollView ref = { scollableComponentRef }>
                        {
                            children
                        }
                        </ScrollView>
                    </BlurView>
                );
            }
            return (
                <View style = { adjustedStyle.container }>
                    <ScrollView ref = { scollableComponentRef }>
                    {
                        children
                    }
                    </ScrollView>
                </View>
            );
        } else {
            if (frosted) {
                return (
                    <BlurView
                        ref = { scollableComponentRef }
                        blurType = { shade }
                        style = { adjustedStyle.container }
                    >
                    {
                        children
                    }
                    </BlurView>
                );
            } else {
                return (
                    <View
                        ref = { scollableComponentRef }
                        style = { adjustedStyle.container }
                    >
                    {
                        children
                    }
                    </View>
                );
            }
        }
    }
});

export default BodyViewInterface;
