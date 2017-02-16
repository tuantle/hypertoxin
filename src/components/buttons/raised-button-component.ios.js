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
 * @module RaisedButtonComponent
 * @description - Raised button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { View as AnimatedView } from 'react-native-animatable';

import { Ht } from '../../hypertoxin';

import fontStyleTemplate from '../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity
} = ReactNative;

const DEFAULT_RAISED_BUTTON_STYLE = {
    container: {
        ...dropShadowStyleTemplate,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        margin: 8,
        padding: 8,
        borderRadius: 2
    },
    label: {
        ...fontStyleTemplate.normalLarge,
        marginHorizontal: 8,
        backgroundColor: `transparent`
    }
};

const DEFAULT_RAISED_BUTTON_ICON_STYLE = {
    icon: {
        small: {
            width: 16,
            height: 16,
            backgroundColor: `transparent`
        },
        normal: {
            width: 24,
            height: 24,
            backgroundColor: `transparent`
        },
        large: {
            width: 32,
            height: 32,
            backgroundColor: `transparent`
        }
    }
};

const RaisedButtonInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-left`, `header-right`,
                `item-action`,
                `card-action-primary`, `card-action-secondary`
            ],
            stronglyTyped: true
        },
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        shape: {
            value: `square`,
            oneOf: [ `square`, `round` ],
            stronglyTyped: true
        },
        disabled: {
            value: false,
            stronglyTyped: true
        },
        busy: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: `Raised Button`,
            stronglyTyped: true
        },
        color: {
            value: `default`,
            stronglyTyped: true
        },
        labelColor: {
            value: `default`,
            stronglyTyped: true
        },
        iconColor: {
            value: `default`,
            stronglyTyped: true
        },
        iconPreset: {
            value: ``,
            stronglyTyped: true
        },
        iconSize: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        onPress: {
            value: () => {},
            stronglyTyped: true
        }
    },
    // bounce: function bounce () {
    //
    // },
    animate: function animate (definition) {
        const component = this;
        const [
            animatedView
        ] = component.lookupComponentRefs(
            `animatedView`
        );
        const {
            from,
            to,
            duration,
            easing
        } = Hf.fallback({
            duration: 300,
            easing: `ease`
        }).of(definition);

        if (Hf.isDefined(animatedView)) {
            if (Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transition(from, to, duration, easing);
            } else if (!Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transitionTo(to, duration, easing);
            }
        }
    },
    render: function render () {
        const component = this;
        const {
            shade,
            shape,
            disabled,
            busy,
            label,
            color,
            labelColor,
            iconColor,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = component.props;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let themedColor;
        let themedLabelColor;
        let themedIconColor;
        let adjustedStyle;

        if (Ht.Theme.color.button.raised.container.hasOwnProperty(color)) {
            themedColor = !disabled ? Ht.Theme.color.button.raised.container[color][shade] : Ht.Theme.color.button.raised.container.disabled[shade];
        } else {
            themedColor = !disabled ? color : Ht.Theme.color.button.raised.container.disabled[shade];
        }

        if (Ht.Theme.color.button.raised.label.hasOwnProperty(labelColor)) {
            themedLabelColor = !disabled ? Ht.Theme.color.button.raised.label[labelColor][shade] : Ht.Theme.color.button.raised.label.disabled[shade];
        } else {
            themedLabelColor = !disabled ? labelColor : Ht.Theme.color.button.raised.label.disabled[shade];
        }

        if (Ht.Theme.color.button.raised.icon.hasOwnProperty(iconColor)) {
            themedIconColor = !disabled ? Ht.Theme.color.button.raised.icon[iconColor][shade] : Ht.Theme.color.button.raised.icon.disabled[shade];
        } else {
            themedIconColor = !disabled ? iconColor : Ht.Theme.color.button.raised.icon.disabled[shade];
        }

        adjustedStyle = Hf.merge(DEFAULT_RAISED_BUTTON_STYLE).with({
            container: {
                borderRadius: shape === `square` ? 2 : 18,
                backgroundColor: themedColor
            },
            label: {
                color: themedLabelColor
            },
            icon: Hf.merge(DEFAULT_RAISED_BUTTON_ICON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `RaisedButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedView`) }
                style = { adjustedStyle.container }
                useNativeDriver = { true }
            >
            {
                busy ? <ActivityIndicator size = 'small'/> :
                <TouchableOpacity
                    style = {{
                        flexDirection: `row`,
                        justifyContent: `center`,
                        alignItems: `center`
                    }}
                    onPress = { !disabled ? onPress : null }
                >
                {
                    icon === null ? null :
                    <Image
                        style = { adjustedStyle.icon }
                        source = {
                            Hf.isString(icon) ? {
                                uri: icon,
                                isStatic: true
                            } : icon
                        }
                        resizeMode = 'cover'
                    />
                }
                    <Text style = { adjustedStyle.label }>{ label }</Text>
                </TouchableOpacity>
            }
            </AnimatedView>
        );
    }
});

const RaisedButtonComponent = RaisedButtonInterface({
    name: `raised-button`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default RaisedButtonComponent;
