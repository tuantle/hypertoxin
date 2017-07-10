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
 * @module CardViewComponent
 * @description - Card view android component.
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
    Dimensions
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_CARD_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        margin: 3,
        padding: 3,
        borderWidth: 1,
        borderRadius: 2
    },
    room: {
        header: {
            left: {
                flexDirection: `row`,
                alignItems: `stretch`,
                justifyContent: `space-between`,
                maxWidth: DEVICE_WIDTH,
                backgroundColor: `transparent`
            },
            right: {
                flexDirection: `row`,
                alignItems: `stretch`,
                justifyContent: `space-between`,
                maxWidth: DEVICE_WIDTH,
                backgroundColor: `transparent`
            }
        },
        media: {
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        overlay: {
            flexDirection: `row`,
            alignSelf: `stretch`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `${Ht.Theme.color.palette.black}${Ht.Theme.color.opacity}`
        },
        body: {
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        action: {
            primary: {
                flexDirection: `row`,
                alignItems: `flex-start`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH,
                backgroundColor: `transparent`
            },
            secondary: {
                flexDirection: `row`,
                alignItems: `flex-start`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH,
                backgroundColor: `transparent`
            }
        },
        filler: {
            width: 0,
            height: 0,
            backgroundColor: `transparent`
        }
    }
};

const CardViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `item-media`
            ],
            stronglyTyped: true
        },
        shade: {
            value: Ht.Theme.view.card.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        overlay: {
            value: Ht.Theme.view.card.overlay,
            oneOf: [ `opaque`, `transparent`, `translucent-clear`, `translucent-frosted` ],
            stronglyTyped: true
        },
        outlined: {
            value: Ht.Theme.view.card.outlined,
            stronglyTyped: true
        },
        dropShadow: {
            value: Ht.Theme.view.card.dropShadow,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            shade,
            overlay,
            outlined,
            dropShadow,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            outlined: false,
            dropShadow: false
        }).of(property);
        let frosted = false;
        let adjustedStyle = dropShadow ? Hf.merge(DEFAULT_CARD_VIEW_STYLE).with({
            container: {
                ...dropShadowStyleTemplate,
                borderColor: outlined ? Ht.Theme.color.divider : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.card.container[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.card.container[shade]}${Ht.Theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        }) : Hf.merge(DEFAULT_CARD_VIEW_STYLE).with({
            container: {
                borderColor: outlined ? Ht.Theme.color.divider : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.card.container[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.card.container[shade]}${Ht.Theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        });
        let cardHeaderLeftChildren = null;
        let cardHeaderRightChildren = null;
        let cardMediaChildren = null;
        let cardOverlayChildren = null;
        let cardBodyChildren = null;
        let cardActionPrimaryChildren = null;
        let cardActionSecondaryChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(children);
            cardHeaderLeftChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-header-left`;
                }
            });
            cardHeaderRightChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-header-right`;
                }
            });
            cardMediaChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-media`;
                }
            });
            cardOverlayChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-overlay`;
                }
            });
            cardBodyChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-body`;
                }
            });
            cardActionPrimaryChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-action-primary`;
                }
            });
            cardActionSecondaryChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `card-action-secondary`;
                }
            });
        }

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (frosted) {
            return (
                <BlurView
                    style = { adjustedStyle.container }
                    blurType = { shade }
                    blurAmount = { Ht.Theme.misc.frostLevel }
                >
                    <View style = { adjustedStyle.room.header.left }>
                        {
                            cardHeaderLeftChildren !== null ? cardHeaderLeftChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </View>
                    <View style = { adjustedStyle.room.header.right }>
                        {
                            cardHeaderRightChildren !== null ? cardHeaderRightChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </View>
                    <View style = { adjustedStyle.room.media }>
                        {
                            cardMediaChildren !== null ? cardMediaChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                        <View style = { adjustedStyle.room.overlay }>
                            {
                                cardOverlayChildren !== null ? cardOverlayChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </View>
                    <View style = { adjustedStyle.room.body }>
                        {
                            cardBodyChildren !== null ? cardBodyChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                        <View style = { adjustedStyle.room.action.primary }>
                            {
                                cardActionPrimaryChildren !== null ? cardActionPrimaryChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                        <View style = { adjustedStyle.room.action.secondary }>
                            {
                                cardActionSecondaryChildren !== null ? cardActionSecondaryChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </View>
                </BlurView>
            );
        } else {
            return (
                <View style = { adjustedStyle.container }>
                    <View style = { adjustedStyle.room.header.left }>
                        {
                            cardHeaderLeftChildren !== null ? cardHeaderLeftChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </View>
                    <View style = { adjustedStyle.room.header.right }>
                        {
                            cardHeaderRightChildren !== null ? cardHeaderRightChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </View>
                    <View style = { adjustedStyle.room.media }>
                        {
                            cardMediaChildren !== null ? cardMediaChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                        <View style = { adjustedStyle.room.overlay }>
                            {
                                cardOverlayChildren !== null ? cardOverlayChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </View>
                    <View style = { adjustedStyle.room.body }>
                        {
                            cardBodyChildren !== null ? cardBodyChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                        <View style = { adjustedStyle.room.action.primary }>
                            {
                                cardActionPrimaryChildren !== null ? cardActionPrimaryChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                        <View style = { adjustedStyle.room.action.secondary }>
                            {
                                cardActionSecondaryChildren !== null ? cardActionSecondaryChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </View>
                    </View>
                </View>
            );
        }
    }
});

const CardViewComponent = CardViewInterface({
    name: `card-view`
}).registerComponentLib({
    React,
    ReactNative,
    PropTypes
}).toPureComponent();

export default CardViewComponent;
