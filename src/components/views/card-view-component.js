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
 * @description - Card view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from '../../hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

const {
    View,
    Dimensions
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_CARD_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        padding: 3
    },
    header: {
        flexDirection: `row`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `space-between`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    body: {
        flexDirection: `column`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    footer: {
        flexDirection: `row`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `space-between`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    room: {
        contentLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH / 2,
            backgroundColor: `transparent`
        },
        contentRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH / 2,
            backgroundColor: `transparent`
        },
        contentCenter: {
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        media: {
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        overlay: {
            flexDirection: `row`,
            alignSelf: `stretch`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `${Ht.Theme.view.color.card.overlay}${Ht.Theme.view.color.card.opacity}`
        },
        actionLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH / 2,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH / 2,
            backgroundColor: `transparent`
        },
        filler: {
            width: 0,
            height: 0,
            backgroundColor: `transparent`
        }
    }
};

const CardViewComponent = function CardViewComponent (property = {
    room: `none`,
    shade: Ht.Theme.view.card.shade,
    overlay: Ht.Theme.view.card.overlay
}) {
    const {
        shade,
        overlay,
        style,
        children
    } = Hf.fallback({
        shade: Ht.Theme.view.card.shade,
        overlay: Ht.Theme.view.card.overlay
    }).of(property);
    let adjustedStyle = Hf.merge(DEFAULT_CARD_VIEW_STYLE).with({
        container: {
            backgroundColor: (() => {
                switch (overlay) { // eslint-disable-line
                case `opaque`:
                    return Ht.Theme.view.color.card[shade];
                case `translucent`:
                    return `${Ht.Theme.view.color.card[shade]}${Ht.Theme.view.color.card.opacity}`;
                case `transparent`:
                    return `transparent`;
                }
            })()
        }
    });
    let cardContentLeftChildren = null;
    let cardContentRightChildren = null;
    let cardMediaChildren = null;
    let cardOverlayChildren = null;
    let cardContentCenterChildren = null;
    let cardActionLeftChildren = null;
    let cardActionRightChildren = null;

    adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
        container: style
    }) : adjustedStyle;

    if (React.Children.count(children) > 0) {
        let fragments = React.Children.toArray(children);
        cardContentLeftChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `content-left`;
            }
        });
        cardContentLeftChildren = Hf.isEmpty(cardContentLeftChildren) ? null : cardContentLeftChildren;

        cardContentRightChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `content-right`;
            }
        });
        cardContentRightChildren = Hf.isEmpty(cardContentRightChildren) ? null : cardContentRightChildren;

        cardMediaChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `media`;
            }
        });
        cardMediaChildren = Hf.isEmpty(cardMediaChildren) ? null : cardMediaChildren;

        cardOverlayChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `overlay`;
            }
        });
        cardOverlayChildren = Hf.isEmpty(cardOverlayChildren) ? null : cardOverlayChildren;

        cardContentCenterChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `content-center`;
            }
        });
        cardContentCenterChildren = Hf.isEmpty(cardContentCenterChildren) ? null : cardContentCenterChildren;

        cardActionLeftChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `action-left`;
            }
        });
        cardActionLeftChildren = Hf.isEmpty(cardActionLeftChildren) ? null : cardActionLeftChildren;

        cardActionRightChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `action-right`;
            }
        });
        cardActionRightChildren = Hf.isEmpty(cardActionRightChildren) ? null : cardActionRightChildren;
    }

    return (
        <View style = { adjustedStyle.container }>
            <View style = { adjustedStyle.header }>
                <View style = { adjustedStyle.room.contentLeft }>
                    {
                        cardContentLeftChildren !== null ? cardContentLeftChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
                <View style = { adjustedStyle.room.contentRight }>
                    {
                        cardContentRightChildren !== null ? cardContentRightChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
            <View style = { adjustedStyle.body }>
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
                <View style = { adjustedStyle.room.contentCenter }>
                    {
                        cardContentCenterChildren !== null ? cardContentCenterChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
            <View style = { adjustedStyle.footer }>
                <View style = { adjustedStyle.room.actionLeft }>
                    {
                        cardActionLeftChildren !== null ? cardActionLeftChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
                <View style = { adjustedStyle.room.actionRight }>
                    {
                        cardActionRightChildren !== null ? cardActionRightChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
        </View>
    );
};

CardViewComponent.propTypes = {
    room: PropTypes.oneOf([
        `none`,
        `content-left`, `content-center`, `content-right`
    ]),
    shade: PropTypes.oneOf([ `light`, `dark` ]),
    overlay: PropTypes.oneOf([ `opaque`, `translucent`, `transparent` ])
};

export default CardViewComponent;
