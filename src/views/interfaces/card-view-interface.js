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
 * @module CardViewInterface
 * @description - Card view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import createFragment from 'react-addons-create-fragment';

import { BlurView } from 'react-native-blur';

import theme from '../../styles/theme';

import dropShadowStyle from '../../styles/templates/drop-shadow-style-template';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFSULT_CARD_VIEW_STYLE = {
    container: {
        ...dropShadowStyle,
        flexShrink: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        margin: 3,
        padding: 3,
        borderRadius: 2
    },
    content: {
        header: {
            flexGrow: 1,
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        media: {
            flexGrow: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        overlay: {
            flexGrow: 1,
            flexDirection: `row`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            minHeight: 36,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `${theme.palette.black}${theme.opacity}`
        },
        body: {
            flexGrow: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        action: {
            flexGrow: 1,
            flexDirection: `row`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH
        }
    },
    filler: {
        width: 0,
        height: 0,
        backgroundColor: `transparent`
    }
};

const CardViewInterface = Hf.Interface.augment({
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
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View
        } = ReactNative;
        const {
            shade,
            overlay,
            dropShadow,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            dropShadow: false
        }).of(property);
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFSULT_CARD_VIEW_STYLE).with({
            container: {
                shadowColor: dropShadow ? `black` : `transparent`,
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.card.container[shade];
                    case `translucent-clear`:
                        return `${theme.card.container[shade]}${theme.opacity}`;
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
        let interfaceFragment = {
            card: {
                header: {
                    leftPart: (<View style = { adjustedStyle.filler }/>),
                    rightPart: (<View style = { adjustedStyle.filler }/>)
                },
                media: {
                    part: (<View style = { adjustedStyle.filler }/>)
                },
                overlay: {
                    part: (<View style = { adjustedStyle.filler }/>)
                },
                body: {
                    part: (<View style = { adjustedStyle.filler }/>)
                },
                action: {
                    primaryPart: (<View style = { adjustedStyle.filler }/>),
                    secondaryPart: (<View style = { adjustedStyle.filler }/>)
                }
            }
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (React.Children.count(children) > 0) {
            interfaceFragment = React.Children.toArray(children).reduce((_interfaceFragment, child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `CardViewInterface - Card view interface requires children each to have a room propperty.`);
                } else {
                    switch (room) { // eslint-disable-line
                    case `card-header-left`:
                        _interfaceFragment.card.header.leftPart = child;
                        break;
                    case `card-header-right`:
                        _interfaceFragment.card.header.rightPart = child;
                        break;
                    case `card-media`:
                        _interfaceFragment.card.media.part = child;
                        break;
                    case `card-overlay`:
                        _interfaceFragment.card.overlay.part = (
                            <View style = { adjustedStyle.content.overlay }>
                            {
                                child
                            }
                            </View>
                        );
                        break;
                    case `card-body`:
                        _interfaceFragment.card.body.part = child;
                        break;
                    case `card-action-primary`:
                        _interfaceFragment.card.action.primaryPart = child;
                        break;
                    case `card-action-secondary`:
                        _interfaceFragment.card.action.secondaryPart = child;
                        break;
                    case `none`:
                        break;
                    }
                }
                return _interfaceFragment;
            }, interfaceFragment);
        }

        cardHeaderChildren = createFragment(interfaceFragment.card.header);
        cardBodyChildren = createFragment(interfaceFragment.card.body);
        cardActionChildren = createFragment(interfaceFragment.card.action);
        cardOverlayChildren = createFragment(interfaceFragment.card.overlay);
        cardMediaChildren = React.Children.map(createFragment(interfaceFragment.card.media), (child) => {
            if (Hf.isDefined(child.props.children)) {
                return React.cloneElement(child, {
                    children: [ ...child.props.children, ...cardOverlayChildren ]
                });
            } else {
                return React.cloneElement(child, {
                    children: [ ...cardOverlayChildren ]
                });
            }
        });

        if (frosted) {
            return (
                <BlurView
                    blurType = { shade }
                    style = { adjustedStyle.container }
                >
                    <View style = { adjustedStyle.content.header }>
                    {
                        cardHeaderChildren
                    }
                    </View>
                    <View style = { adjustedStyle.content.media }>
                    {
                        cardMediaChildren
                    }
                    </View>
                    <View style = { adjustedStyle.content.body }>
                    {
                        cardBodyChildren
                    }
                        <View style = { adjustedStyle.content.action }>
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
                    <View style = { adjustedStyle.content.header }>
                    {
                        cardHeaderChildren
                    }
                    </View>
                    <View style = { adjustedStyle.content.media }>
                    {
                        cardMediaChildren
                    }
                    </View>
                    <View style = { adjustedStyle.content.body }>
                    {
                        cardBodyChildren
                    }
                        <View style = { adjustedStyle.content.action }>
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

export default CardViewInterface;
