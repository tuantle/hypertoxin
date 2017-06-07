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
 * @module FlatButtonComponent
 * @description - Floating action button ios component.
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

const DEFAULT_FLAT_BUTTON_STYLE = {
    container: {
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        margin: 8,
        padding: 8,
        borderRadius: 2,
        backgroundColor: `transparent`
    },
    label: {
        ...fontStyleTemplate.normalLarge,
        marginHorizontal: 8,
        backgroundColor: `transparent`
    }
};

const DEFAULT_FLAT_BUTTON_ICON_STYLE = {
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

const FlatButtonInterface = Hf.Interface.augment({
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
            value: Ht.Theme.button.flat.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        shape: {
            value: Ht.Theme.button.flat.shape,
            oneOf: [ `square`, `round` ],
            stronglyTyped: true
        },
        outlined: {
            value: Ht.Theme.button.flat.outlined,
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
        dropShadowIcon: {
            value: Ht.Theme.button.flat.dropShadowIcon,
            stronglyTyped: true
        },
        label: {
            value: `Flat Button`,
            stronglyTyped: true
        },
        labelColor: {
            value: Ht.Theme.button.flat.labelColor,
            stronglyTyped: true
        },
        iconColor: {
            value: Ht.Theme.button.flat.iconColor,
            stronglyTyped: true
        },
        iconPreset: {
            value: ``,
            stronglyTyped: true
        },
        iconSize: {
            value: Ht.Theme.button.flat.iconSize,
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
            outlined,
            disabled,
            busy,
            dropShadowIcon,
            label,
            labelColor,
            iconColor,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = component.props;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let themedLabelColor;
        let themedIconColor;
        let adjustedStyle;

        if (Ht.Theme.color.button.flat.label.hasOwnProperty(labelColor)) {
            themedLabelColor = busy || disabled ? Ht.Theme.color.button.flat.label.disabled[shade] : Ht.Theme.color.button.flat.label[labelColor][shade];
        } else {
            themedLabelColor = busy || disabled ? Ht.Theme.color.button.flat.label.disabled[shade] : labelColor;
        }

        if (Ht.Theme.color.button.flat.icon.hasOwnProperty(iconColor)) {
            themedIconColor = busy || disabled ? Ht.Theme.color.button.flat.icon.disabled[shade] : Ht.Theme.color.button.flat.icon[iconColor][shade];
        } else {
            themedIconColor = busy || disabled ? Ht.Theme.color.button.flat.icon.disabled[shade] : iconColor;
        }

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `FlatButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        adjustedStyle = Hf.merge(DEFAULT_FLAT_BUTTON_STYLE).with({
            container: outlined ? {
                borderWidth: 1,
                borderRadius: shape === `square` ? 2 : 18,
                borderColor: themedLabelColor
            } : {},
            label: {
                color: themedLabelColor
            },
            icon: dropShadowIcon ? Hf.merge(DEFAULT_FLAT_BUTTON_ICON_STYLE.icon[iconSize]).with({
                ...dropShadowStyleTemplate,
                tintColor: themedIconColor
            }) : Hf.merge(DEFAULT_FLAT_BUTTON_ICON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedView`) }
                style = { adjustedStyle.container }
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = {{
                        flexDirection: `row`,
                        justifyContent: `center`,
                        alignItems: `center`
                    }}
                    disabled = { busy || disabled }
                    onPress = { busy || disabled ? null : onPress }
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
                {
                    busy ? <ActivityIndicator size = 'small'/> : null
                }
                </TouchableOpacity>
            </AnimatedView>
        );
    }
});

const FlatButtonComponent = FlatButtonInterface({
    name: `flat-button`
}).registerComponentLib({
    React,
    ReactNative,
    PropTypes
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default FlatButtonComponent;
