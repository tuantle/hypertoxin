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
 * @module ItemViewComponent
 * @description - Item view android component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import PropTypes from 'prop-types';

import { BlurView } from 'react-native-blur';

import { Ht } from '../../hypertoxin';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    View,
    TouchableOpacity,
    Dimensions
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ITEM_VIEW_STYLE = {
    container: {
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `space-between`,
        maxWidth: DEVICE_WIDTH,
        margin: 3,
        padding: 3,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: `transparent`
    },
    room: {
        media: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        action: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        filler: {
            width: 0,
            backgroundColor: `transparent`
        }
    }
};

const ItemViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: Ht.Theme.view.item.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        overlay: {
            value: Ht.Theme.view.item.overlay,
            oneOf: [ `opaque`, `transparent`, `translucent-clear`, `translucent-frosted` ],
            stronglyTyped: true
        },
        outlined: {
            value: Ht.Theme.view.item.outlined,
            stronglyTyped: true
        },
        dropShadow: {
            value: Ht.Theme.view.item.dropShadow,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            shade,
            overlay,
            outlined,
            dropShadow,
            onPress,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            outlined: true,
            dropShadow: false
        }).of(property);
        let frosted = false;
        let adjustedStyle = dropShadow ? Hf.merge(DEFAULT_ITEM_VIEW_STYLE).with({
            container: {
                ...dropShadowStyleTemplate,
                borderColor: outlined ? Ht.Theme.color.divider : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.item[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.item[shade]}${Ht.Theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        }) : Hf.merge(DEFAULT_ITEM_VIEW_STYLE).with({
            container: {
                borderColor: outlined ? Ht.Theme.color.divider : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.item[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.item[shade]}${Ht.Theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        });
        let itemMediaChildren = null;
        let itemActionChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(children);
            itemMediaChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewInterface - Item view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `item-media`;
                }
            });
            itemActionChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewInterface - Item view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `item-action`;
                }
            });
        }

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (frosted) {
            return (
                <TouchableOpacity onPress = { onPress }>
                    <BlurView
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.misc.frostLevel }
                    >
                        <View style = { adjustedStyle.room.media }>
                            {
                                itemMediaChildren !== null ? itemMediaChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                        <View style = { adjustedStyle.room.action }>
                            {
                                itemActionChildren !== null ? itemActionChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </BlurView>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress = { onPress }>
                    <View style = { adjustedStyle.container }>
                        <View style = { adjustedStyle.room.media }>
                            {
                                itemMediaChildren !== null ? itemMediaChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                        <View style = { adjustedStyle.room.action }>
                            {
                                itemActionChildren !== null ? itemActionChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
});

const ItemViewComponent = ItemViewInterface({
    name: `item-view`
}).registerComponentLib({
    React,
    ReactNative,
    PropTypes
}).toPureComponent();

export default ItemViewComponent;
