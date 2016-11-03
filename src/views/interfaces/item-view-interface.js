/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module ItemViewInterface
 * @description - Item view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import createFragment from 'react-addons-create-fragment';

import { BlurView } from 'react-native-blur';

import dropShadowStyle from '../../styles/templates/drop-shadow-style-template';

import theme from '../../styles/theme';

const DEVICE_WIDTH = ReactNative.Dimensions.get(`window`).width;
const DEVICE_HEIGHT = ReactNative.Dimensions.get(`window`).height;

const DEFSULT_ITEM_VIEW_STYLE = {
    container: {
        ...dropShadowStyle,
        flexShrink: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `space-between`,
        maxWidth: DEVICE_WIDTH,
        margin: 3,
        padding: 3,
        borderRadius: 2
    },
    content: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    filler: {
        width: 0,
        height: 0,
        backgroundColor: `transparent`
    }
};

const ItemViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
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
        dropShadow: {
            value: false,
            stronglyTyped: true
        },
        onPress: {
            value: () => {},
            stronglyTyped: true
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View,
            TouchableHighlight
        } = ReactNative;
        const {
            shade,
            overlay,
            dropShadow,
            onPress,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            dropShadow: false
        }).of(property);
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFSULT_ITEM_VIEW_STYLE).with({
            container: {
                shadowColor: dropShadow ? `black` : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.item[shade];
                    case `translucent-clear`:
                        return `${theme.item[shade]}${theme.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        });
        let itemChildren = null;
        let interfaceFragment = {
            item: {
                mediaPart: (<View style = { adjustedStyle.filler }/>),
                actionPart: (<View style = { adjustedStyle.filler }/>)
            }
        };
        if (React.Children.count(children) > 0) {
            interfaceFragment = React.Children.toArray(children).reduce((_interfaceFragment, child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewInterface - Item view interface requires children each to have a room propperty.`);
                } else {
                    switch (room) { // eslint-disable-line
                    case `item-media`:
                        _interfaceFragment.item.mediaPart = child;
                        break;
                    case `item-action`:
                        _interfaceFragment.item.actionPart = child;
                        break;
                    case `none`:
                        break;
                    }
                }
                return _interfaceFragment;
            }, interfaceFragment);
        }

        itemChildren = createFragment(interfaceFragment.item);

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (frosted) {
            return (
                <TouchableHighlight
                    underlayColor = 'transparent'
                    onPress = { onPress }
                >
                    <BlurView
                        blurType = { shade }
                        style = { adjustedStyle.container }
                    >
                        <View style = { adjustedStyle.content }>
                        {
                            itemChildren
                        }
                        </View>
                    </BlurView>
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor = 'transparent'
                    onPress = { onPress }
                >
                    <View style = { adjustedStyle.container }>
                        <View style = { adjustedStyle.content }>
                        {
                            itemChildren
                        }
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    }
});

export default ItemViewInterface;
