/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module HeaderViewInterface
 * @description - Header view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Platform, Dimensions } from 'react-native';

import createFragment from 'react-addons-create-fragment';

import { BlurView } from 'react-native-blur';

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

import dropShadowStyle from '../../styles/templates/drop-shadow-style-template';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFSULT_HEADER_VIEW_STYLE = {
    container: {
        normal: {
            ...dropShadowStyle,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: DEVICE_WIDTH,
            height: Platform.OS === `ios` ? 68 : 80,
            marginBottom: 6
        },
        extended: {
            ...dropShadowStyle,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: DEVICE_WIDTH,
            height: 148
        }
    },
    content: {
        wrapper: {
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            width: DEVICE_WIDTH,
            backgroundColor: `transparent`
        },
        left: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
            minWidth: 46,
            backgroundColor: `transparent`
        },
        center: {
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: 46,
            backgroundColor: `transparent`
        },
        right: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: 46,
            backgroundColor: `transparent`
        }
    },
    status: {
        height: Platform.OS === `ios` ? 24 : 25
    },
    filler: {
        width: 46,
        backgroundColor: `transparent`
    },
    label: fontStyleTemplate.bold
};

const HeaderViewInterface = Hf.Interface.augment({
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
        extended: {
            value: false,
            stronglyTyped: true
        },
        dropShadow: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            Text,
            View
        } = ReactNative;
        const {
            shade,
            overlay,
            extended,
            dropShadow,
            label,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            extended: false,
            dropShadow: false,
            label: ``
        }).of(property);
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFSULT_HEADER_VIEW_STYLE).with({
            container: {
                normal: {
                    shadowColor: dropShadow ? `black` : `transparent`,
                    backgroundColor: (() => {
                        switch (overlay) { // eslint-disable-line
                        case `opaque`:
                            return theme.header.container[shade];
                        case `translucent-clear`:
                            return `${theme.header.container[shade]}${theme.opacity}`;
                        case `translucent-frosted`:
                            frosted = true;
                            return `transparent`;
                        case `transparent`:
                            return `transparent`;
                        }
                    })()
                },
                extended: {
                    shadowColor: dropShadow ? `black` : `transparent`,
                    backgroundColor: (() => {
                        switch (overlay) { // eslint-disable-line
                        case `opaque`:
                            return theme.header.container[shade];
                        case `translucent-clear`:
                            return `${theme.header.container[shade]}${theme.opacity}`;
                        case `translucent-frosted`:
                            frosted = true;
                            return `transparent`;
                        case `transparent`:
                            return `transparent`;
                        }
                    })()
                }
            },
            status: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.header.status[shade];
                    case `translucent-clear`:
                        return `${theme.header.status[shade]}${theme.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            },
            label: {
                color: theme.header.label[shade]
            }
        });
        let headerLeftChildren = null;
        let headerCenterChildren = null;
        let headerRightChildren = null;
        let interfaceFragment = {
            header: {
                left: {
                    part: (<View style = { adjustedStyle.filler }/>)
                },
                center: {
                    part: (<Text style = { adjustedStyle.label }>{ label }</Text>)
                },
                right: {
                    part: (<View style = { adjustedStyle.filler }/>)
                }
            }
        };
        if (React.Children.count(children) > 0) {
            interfaceFragment = React.Children.toArray(children).reduce((_interfaceFragment, child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `HeaderViewInterface - Header view interface requires children each to have a room propperty.`);
                } else {
                    switch (room) { // eslint-disable-line
                    case `header-left`:
                        _interfaceFragment.header.left.part = child;
                        break;
                    case `header-center`:
                        _interfaceFragment.header.center.part = child;
                        break;
                    case `header-right`:
                        _interfaceFragment.header.right.part = child;
                        break;
                    case `none`:
                        break;
                    }
                }
                return _interfaceFragment;
            }, interfaceFragment);
        }

        headerLeftChildren = createFragment(interfaceFragment.header.left);
        headerCenterChildren = createFragment(interfaceFragment.header.center);
        headerRightChildren = createFragment(interfaceFragment.header.right);

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (frosted) {
            return (
                <BlurView
                    blurType = { shade }
                    style = { extended ? adjustedStyle.container.extended : adjustedStyle.container.normal }
                >
                    <View style = { adjustedStyle.status }/>
                    <View style = { adjustedStyle.content.wrapper }>
                        <View style = { adjustedStyle.content.left }>
                        {
                            headerLeftChildren
                        }
                            <View style = { adjustedStyle.content.center }>
                            {
                                headerCenterChildren
                            }
                            </View>
                        </View>
                        <View style = { adjustedStyle.content.right }>
                        {
                            headerRightChildren
                        }
                        </View>
                    </View>
                </BlurView>
            );
        } else {
            return (
                <View style = { extended ? adjustedStyle.container.extended : adjustedStyle.container.normal }>
                    <View style = { adjustedStyle.status }/>
                    <View style = { adjustedStyle.content.wrapper }>
                        <View style = { adjustedStyle.content.left }>
                        {
                            headerLeftChildren
                        }
                            <View style = { adjustedStyle.content.center }>
                            {
                                headerCenterChildren
                            }
                            </View>
                        </View>
                        <View style = { adjustedStyle.content.right }>
                        {
                            headerRightChildren
                        }
                        </View>
                    </View>
                </View>
            );
        }
    }
});

export default HeaderViewInterface;
