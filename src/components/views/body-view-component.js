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
    Component
} = React;

const {
    View,
    ScrollView,
    PanResponder
} = ReactNative;

const DEFAULT_BODY_VIEW_STYLE = {
    flexShrink: 1,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    alignSelf: `stretch`
};

export default class BodyViewComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent`, `transparent` ]),
        orientation: PropTypes.oneOf([ `horizontal`, `vertical` ]),
        alignment: PropTypes.oneOf([ `start`, `center`, `end`, `stretch` ]),
        scrollable: PropTypes.bool,
        onScroll: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        shade: Ht.Theme.view.body.shade,
        overlay: Ht.Theme.view.body.overlay,
        orientation: `horizontal`,
        alignment: `center`,
        scrollable: false,
        onScroll: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.panResponder = null;
        this.state = {
            adjustedStyle: DEFAULT_BODY_VIEW_STYLE,
            scrollDirection: null
        };
    }
    /**
     * @description - Assign the registered component's reference object.
     *
     * @method assignComponentRef
     * @param {string} refName
     * @returns function
     */
    assignComponentRef = (refName) => {
        const component = this;

        if (Hf.DEVELOPMENT) {
            if (!Hf.isString(refName)) {
                Hf.log(`error`, `BodyViewComponent.assignComponentRef - Input component reference name is invalid.`);
            }
        }

        /* helper function to set component ref */
        const setComponentRef = function setComponentRef (componentRef) {
            component.refCache[refName] = Hf.isDefined(componentRef) ? componentRef : null;
        };
        return setComponentRef;
    }
    /**
     * @description - Lookup the registered component's reference object.
     *
     * @method lookupComponentRefs
     * @param {array} refNames
     * @returns {array}
     */
    lookupComponentRefs = (...refNames) => {
        const component = this;
        let componentRefs = [];

        if (!Hf.isEmpty(refNames)) {
            if (Hf.DEVELOPMENT) {
                if (!refNames.every((refName) => Hf.isString(refName))) {
                    Hf.log(`error`, `BodyViewComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `BodyViewComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `BodyViewComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.view.body.shade,
        overlay: Ht.Theme.view.body.overlay,
        alignment: `center`
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            alignment,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.body.shade,
            overlay: Ht.Theme.view.body.overlay,
            alignment: `center`
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            backgroundColor: (() => {
                switch (overlay) { // eslint-disable-line
                case `opaque`:
                    return Ht.Theme.view.color.body[shade];
                case `translucent`:
                    return `${Ht.Theme.view.color.body[shade]}${Ht.Theme.view.color.body.opacity}`;
                case `frosted`:
                    return `transparent`;
                case `transparent`:
                    return `transparent`;
                }
            })(),
            justifyContent: (() => {
                switch (alignment) { // eslint-disable-line
                case `start`:
                    return `flex-start`;
                case `center`:
                    return `center`;
                case `end`:
                    return `flex-end`;
                case `stretch`:
                    return `space-between`;
                }
            })(),
            alignItems: (() => {
                switch (alignment) { // eslint-disable-line
                case `start`:
                    return `flex-start`;
                case `center`:
                    return `center`;
                case `end`:
                    return `flex-end`;
                case `stretch`:
                    return `stretch`;
                }
            })()
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;
    }
    getScrollDirection = () => {
        const component = this;
        const {
            scrollable
        } = component.props;
        const {
            scrollDirection
        } = component.state;

        if (scrollable) {
            return scrollDirection;
        } else {
            return null;
        }
    }
    scrollTo = (destination = {
        x: 0,
        y: 0,
        animated: true
    }) => {
        const component = this;
        const {
            cId,
            scrollable
        } = component.props;

        if (scrollable) {
            const [ scrollView ] = component.lookupComponentRefs(`scroll-view${cId}`);
            const {
                x,
                y,
                animated
            } = Hf.fallback({
                x: 0,
                y: 0,
                animated: true
            }).of(destination);

            scrollView.scrollTo({
                x,
                y,
                animated
            });
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            alignment,
            scrollable,
            style
        } = component.props;

        if (scrollable) {
            component.panResponder = PanResponder.create({
                onMoveShouldSetResponderCapture: () => true,
                onMoveShouldSetPanResponderCapture: () => true,
                onPanResponderMove: (event, gestureState) => {
                    let scrollDirection;

                    if (gestureState.vy === 0) {
                        scrollDirection = 0;
                    } else if (gestureState.vy > 0) {
                        scrollDirection = 1;
                    } else if (gestureState.vy < 0) {
                        scrollDirection = -1;
                    }
                    component.setState(() => {
                        return {
                            scrollDirection
                        };
                    });
                }
            });
        }
        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    overlay,
                    alignment,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.panResponder = null;
        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
            alignment,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                scrollDirection: 0,
                adjustedStyle: component.readjustStyle({
                    shade,
                    overlay,
                    alignment,
                    style
                })
            };
        });
    }
    render () {
        const component = this;
        const {
            cId,
            shade,
            overlay,
            scrollable,
            onScroll,
            children
        } = component.props;
        const {
            adjustedStyle,
            scrollDirection
        } = component.state;
        const frosted = overlay === `frosted`;
        const bodyViewChildProperty = {
            shade
        };
        let bodyViewChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    return React.cloneElement(child, bodyViewChildProperty);
                } else {
                    return null;
                }
            }));
            bodyViewChildren = Hf.isEmpty(fragments) ? null : fragments;
        }

        if (scrollable) {
            if (frosted) {
                return (
                    <BlurView
                        style = { adjustedStyle }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.general.frostLevel }
                    >
                        <ScrollView
                            ref = { component.assignComponentRef(`scroll-view${cId}`) }
                            directionalLockEnabled = { true }
                            scrollEventThrottle = { 16 }
                            onScroll = {(event) => {
                                onScroll(event, scrollDirection);
                            }}
                            { ...component.panResponder.panHandlers }
                        >
                            {
                                bodyViewChildren
                            }
                        </ScrollView>
                    </BlurView>
                );
            }
            return (
                <View style = { adjustedStyle }>
                    <ScrollView
                        ref = { component.assignComponentRef(`scroll-view${cId}`) }
                        directionalLockEnabled = { true }
                        scrollEventThrottle = { 16 }
                        onScroll = {(event) => {
                            onScroll(event, scrollDirection);
                        }}
                        { ...component.panResponder.panHandlers }
                    >
                        {
                            bodyViewChildren
                        }
                    </ScrollView>
                </View>
            );
        } else {
            if (frosted) {
                return (
                    <BlurView
                        style = { adjustedStyle }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.general.frostLevel }
                    >
                        {
                            bodyViewChildren
                        }
                    </BlurView>
                );
            } else {
                return (
                    <View style = { adjustedStyle }>
                        {
                            bodyViewChildren
                        }
                    </View>
                );
            }
        }
    }
}
