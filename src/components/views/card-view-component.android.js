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
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import PropTypes from 'prop-types';

import createFragment from 'react-addons-create-fragment';

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
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
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
            flexDirection: `row`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
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
        let cardHeaderChildren = null;
        let cardMediaChildren = null;
        let cardOverlayChildren = null;
        let cardBodyChildren = null;
        let cardActionChildren = null;
        let fragment = {
            card: {
                header: {
                    leftPart: (<View style = { adjustedStyle.room.filler }/>),
                    rightPart: (<View style = { adjustedStyle.room.filler }/>)
                },
                media: {
                    part: (<View style = { adjustedStyle.room.filler }/>)
                },
                overlay: {
                    part: (<View style = { adjustedStyle.room.filler }/>)
                },
                body: {
                    part: (<View style = { adjustedStyle.room.filler }/>)
                },
                action: {
                    primaryPart: (<View style = { adjustedStyle.room.filler }/>),
                    secondaryPart: (<View style = { adjustedStyle.room.filler }/>)
                }
            }
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (React.Children.count(children) > 0) {
            fragment = React.Children.toArray(children).reduce((_fragment, child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                } else {
                    switch (room) { // eslint-disable-line
                    case `card-header-left`:
                        _fragment.card.header.leftPart = child;
                        break;
                    case `card-header-right`:
                        _fragment.card.header.rightPart = child;
                        break;
                    case `card-media`:
                        _fragment.card.media.part = child;
                        break;
                    case `card-overlay`:
                        _fragment.card.overlay.part = child;
                        // _fragment.card.overlay.part = (
                        //     <View style = { adjustedStyle.room.overlay }>
                        //     {
                        //         child
                        //     }
                        //     </View>
                        // );
                        break;
                    case `card-body`:
                        _fragment.card.body.part = child;
                        break;
                    case `card-action-primary`:
                        _fragment.card.action.primaryPart = child;
                        break;
                    case `card-action-secondary`:
                        _fragment.card.action.secondaryPart = child;
                        break;
                    case `none`:
                        break;
                    }
                }
                return _fragment;
            }, fragment);
        }

        cardHeaderChildren = createFragment(fragment.card.header);
        cardOverlayChildren = createFragment(fragment.card.overlay);
        cardMediaChildren = createFragment(fragment.card.media);
        // cardHeaderChildren = fragment.card.header;
        // cardOverlayChildren = fragment.card.overlay;
        // cardMediaChildren = fragment.card.media;
        // cardMediaChildren = React.Children.map(createFragment(fragment.card.media), (child) => {
        //     if (Hf.isDefined(child.props.children)) {
        //         return React.cloneElement(child, {
        //             children: [ ...child.props.children, ...cardOverlayChildren ]
        //         });
        //     } else {
        //         return React.cloneElement(child, {
        //             children: [ ...cardOverlayChildren ]
        //         });
        //     }
        // });
        cardBodyChildren = createFragment(fragment.card.body);
        cardActionChildren = createFragment(fragment.card.action);
        // cardBodyChildren = fragment.card.body;
        // cardActionChildren = fragment.card.action;

        if (frosted) {
            return (
                <BlurView
                    style = { adjustedStyle.container }
                    blurType = { shade }
                    blurAmount = { Ht.Theme.misc.frostLevel }
                >
                    <View style = { adjustedStyle.room.header }>
                    {
                        cardHeaderChildren
                    }
                    </View>
                    <View style = { adjustedStyle.room.media }>
                    {
                        cardMediaChildren
                    }
                        <View style = { adjustedStyle.room.overlay }>
                        {
                            cardOverlayChildren
                        }
                        </View>
                    </View>
                    <View style = { adjustedStyle.room.body }>
                    {
                        cardBodyChildren
                    }
                        <View style = { adjustedStyle.room.action }>
                        {
                            cardActionChildren
                        }
                        </View>
                    </View>
                </BlurView>
            );
        } else {
            return (
                <View style = { adjustedStyle.container }>
                    <View style = { adjustedStyle.room.header }>
                    {
                        cardHeaderChildren
                    }
                    </View>
                    <View style = { adjustedStyle.room.media }>
                    {
                        cardMediaChildren
                    }
                        <View style = { adjustedStyle.room.overlay }>
                        {
                            cardOverlayChildren
                        }
                        </View>
                    </View>
                    <View style = { adjustedStyle.room.body }>
                    {
                        cardBodyChildren
                    }
                        <View style = { adjustedStyle.room.action }>
                        {
                            cardActionChildren
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
