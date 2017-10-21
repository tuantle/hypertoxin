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

import { BlurView } from 'react-native-blur';

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
    room: {
        header: {
            left: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH / 2,
                backgroundColor: `transparent`
            },
            right: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH / 2,
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
            backgroundColor: `${Ht.Theme.view.color.card.overlay}${Ht.Theme.view.color.card.opacity}`
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
                alignItems: `center`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH / 2,
                backgroundColor: `transparent`
            },
            secondary: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `center`,
                maxWidth: DEVICE_WIDTH / 2,
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
    let frosted = false;
    let adjustedStyle = Hf.merge(DEFAULT_CARD_VIEW_STYLE).with({
        container: {
            backgroundColor: (() => {
                switch (overlay) { // eslint-disable-line
                case `opaque`:
                    return Ht.Theme.view.color.card[shade];
                case `translucent`:
                    return `${Ht.Theme.view.color.card[shade]}${Ht.Theme.view.color.card.opacity}`;
                case `frosted`:
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

    adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
        container: style
    }) : adjustedStyle;

    if (React.Children.count(children) > 0) {
        let fragments = React.Children.toArray(children);
        cardHeaderLeftChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `left`;
            }
        });
        cardHeaderLeftChildren = Hf.isEmpty(cardHeaderLeftChildren) ? null : cardHeaderLeftChildren;

        cardHeaderRightChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `right`;
            }
        });
        cardHeaderRightChildren = Hf.isEmpty(cardHeaderRightChildren) ? null : cardHeaderRightChildren;

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

        cardBodyChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `body`;
            }
        });
        cardBodyChildren = Hf.isEmpty(cardBodyChildren) ? null : cardBodyChildren;

        cardActionPrimaryChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `action-primary`;
            }
        });
        cardActionPrimaryChildren = Hf.isEmpty(cardActionPrimaryChildren) ? null : cardActionPrimaryChildren;

        cardActionSecondaryChildren = fragments.filter((child) => {
            const {
                room
            } = child.props;
            if (!Hf.isString(room)) {
                Hf.log(`warn1`, `CardViewComponent.render - Card view component requires children each to have a room propperty.`);
                return false;
            } else {
                return room === `action-secondary`;
            }
        });
        cardActionSecondaryChildren = Hf.isEmpty(cardActionSecondaryChildren) ? null : cardActionSecondaryChildren;
    }

    if (frosted) {
        return (
            <BlurView
                style = { adjustedStyle.container }
                blurType = { shade }
                blurAmount = { Ht.Theme.general.frostLevel }
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
};

CardViewComponent.propTypes = {
    room: PropTypes.oneOf([ `none`, `media` ]),
    shade: PropTypes.oneOf([ `light`, `dark` ]),
    overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent`, `transparent` ])
};

export default CardViewComponent;
