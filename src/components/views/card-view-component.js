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
        backgroundColor: `transparent`
    },
    body: {
        flexDirection: `column`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    footer: {
        flexDirection: `row`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `space-between`,
        backgroundColor: `transparent`
    },
    room: {
        contentLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        contentRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        contentCenter: {
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            backgroundColor: `transparent`
        },
        media: {
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        overlay: {
            flexDirection: `row`,
            alignSelf: `stretch`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            backgroundColor: `${Ht.Theme.view.color.card.overlay}${Ht.Theme.view.color.card.opacity}`
        },
        actionLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        filler: {
            backgroundColor: `transparent`
        }
    }
};

const CardViewComponent = function CardViewComponent (property = {
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
    const cardViewChildProperty = {
        shade
    };
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
    let cardViewContentLeftChildren = null;
    let cardViewContentRightChildren = null;
    let cardViewMediaChildren = null;
    let cardViewOverlayChildren = null;
    let cardViewContentCenterChildren = null;
    let cardViewActionLeftChildren = null;
    let cardViewActionRightChildren = null;

    adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
        container: style
    }) : adjustedStyle;

    if (React.Children.count(children) > 0) {
        let fragments = React.Children.toArray(React.Children.map(children, (child) => {
            const {
                room
            } = child.props;

            if (child !== null) {
                if (Hf.isString(room) && (room === `content-left` || room === `content-center` || room === `content-right` ||
                    room === `media` || room === `overlay` ||
                    room === `action-left` || room === `action-right`)) {
                    return React.cloneElement(child, cardViewChildProperty);
                } else {
                    Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                    return null;
                }
            } else {
                return null;
            }
        }));

        cardViewContentLeftChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `content-left`;
            } else {
                return false;
            }
        });
        cardViewContentLeftChildren = Hf.isEmpty(cardViewContentLeftChildren) ? null : cardViewContentLeftChildren;

        cardViewContentCenterChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `content-center`;
            } else {
                return false;
            }
        });
        cardViewContentCenterChildren = Hf.isEmpty(cardViewContentCenterChildren) ? null : cardViewContentCenterChildren;

        cardViewContentRightChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `content-right`;
            } else {
                return false;
            }
        });
        cardViewContentRightChildren = Hf.isEmpty(cardViewContentRightChildren) ? null : cardViewContentRightChildren;

        cardViewMediaChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `media`;
            } else {
                return false;
            }
        });
        cardViewMediaChildren = Hf.isEmpty(cardViewMediaChildren) ? null : cardViewMediaChildren;

        cardViewOverlayChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `overlay`;
            } else {
                return false;
            }
        });
        cardViewOverlayChildren = Hf.isEmpty(cardViewOverlayChildren) ? null : cardViewOverlayChildren;

        cardViewActionLeftChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `action-left`;
            } else {
                return false;
            }
        });
        cardViewActionLeftChildren = Hf.isEmpty(cardViewActionLeftChildren) ? null : cardViewActionLeftChildren;

        cardViewActionRightChildren = fragments.filter((child) => {
            if (child !== null) {
                const {
                    room
                } = child.props;

                return room === `action-right`;
            } else {
                return false;
            }
        });
        cardViewActionRightChildren = Hf.isEmpty(cardViewActionRightChildren) ? null : cardViewActionRightChildren;
    }

    return (
        <View style = { adjustedStyle.container }>
            <View style = { adjustedStyle.header }>
                <View style = { adjustedStyle.room.contentLeft }>
                    {
                        cardViewContentLeftChildren !== null ? cardViewContentLeftChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
                <View style = { adjustedStyle.room.contentRight }>
                    {
                        cardViewContentRightChildren !== null ? cardViewContentRightChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
            <View style = { adjustedStyle.body }>
                <View style = { adjustedStyle.room.media }>
                    {
                        cardViewMediaChildren !== null ? cardViewMediaChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                    <View style = { adjustedStyle.room.overlay }>
                        {
                            cardViewOverlayChildren !== null ? cardViewOverlayChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </View>
                </View>
                <View style = { adjustedStyle.room.contentCenter }>
                    {
                        cardViewContentCenterChildren !== null ? cardViewContentCenterChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
            <View style = { adjustedStyle.footer }>
                <View style = { adjustedStyle.room.actionLeft }>
                    {
                        cardViewActionLeftChildren !== null ? cardViewActionLeftChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
                <View style = { adjustedStyle.room.actionRight }>
                    {
                        cardViewActionRightChildren !== null ? cardViewActionRightChildren : <View style = { adjustedStyle.room.filler }/>
                    }
                </View>
            </View>
        </View>
    );
};

CardViewComponent.propTypes = {
    shade: PropTypes.oneOf([ `light`, `dark` ]),
    overlay: PropTypes.oneOf([ `opaque`, `translucent`, `transparent` ])
};

export default CardViewComponent;
