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
 * @module BodyViewComponent
 * @description - Body view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { BlurView } from 'react-native-blur';

import { Ht } from '../../hypertoxin';

const {
    View,
    ScrollView
} = ReactNative;

const DEFAULT_BODY_VIEW_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `column`,
        justifyContent: `flex-start`,
        alignItems: `stretch`
    }
};

const BodyViewInterface = Hf.Interface.augment({
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
        scrollable: {
            value: false,
            stronglyTyped: true
        }
    },
    scrollTo: function scrollTo (destination) {
        const component = this;
        const [
            scrollView
        ] = component.lookupComponentRefs(
            `scrollView`
        );
        const {
            x,
            y,
            animated
        } = Hf.fallback({
            x: 0,
            y: 0,
            animated: true
        }).of(destination);

        if (Hf.isDefined(scrollView)) {
            scrollView.scrollTo({
                x,
                y,
                animated
            });
        }
    },
    render: function render () {
        const component = this;
        const {
            shade,
            overlay,
            scrollable,
            style,
            children
        } = component.props;
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFAULT_BODY_VIEW_STYLE).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.body.container[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.body.container[shade]}${Ht.Theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (scrollable) {
            if (frosted) {
                return (
                    <BlurView
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { 95 }
                    >
                        <ScrollView ref = { component.assignComponentRef(`scrollView`) }>
                        {
                            children
                        }
                        </ScrollView>
                    </BlurView>
                );
            }
            return (
                <View style = { adjustedStyle.container }>
                    <ScrollView ref = { component.assignComponentRef(`scrollView`) }>
                    {
                        children
                    }
                    </ScrollView>
                </View>
            );
        } else {
            if (frosted) {
                return (
                    <BlurView
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { 95 }
                    >
                    {
                        children
                    }
                    </BlurView>
                );
            } else {
                return (
                    <View style = { adjustedStyle.container }>
                    {
                        children
                    }
                    </View>
                );
            }
        }
    }
});

const BodyViewComponent = BodyViewInterface({
    name: `body-view`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `scrollTo`
    ]
});

export default BodyViewComponent;
