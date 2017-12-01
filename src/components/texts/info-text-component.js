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
 * @module InfoTextComponent
 * @description - Info text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from '../../hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { Text as AnimatedText } from 'react-native-animatable';

const {
    Component
} = React;

const DEFAULT_ANIMATION_DURATION_MS = 300;

export default class InfoTextComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `action-left`, `action-right`,
            `content-left`, `content-center`, `content-right`,
            `media`, `overlay`, `badge`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        alignment: PropTypes.oneOf([ `left`, `center`, `right` ]),
        decoration: PropTypes.oneOf([ `none`, `underline`, `line-through` ]),
        size: PropTypes.oneOf([ `small`, `normal`, `large` ]),
        indentation: PropTypes.number,
        uppercased: PropTypes.bool,
        lowercased: PropTypes.bool,
        color: PropTypes.string
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        shade: Ht.Theme.text.info.shade,
        alignment: Ht.Theme.text.info.alignment,
        decoration: Ht.Theme.text.info.decoration,
        size: Ht.Theme.text.info.size,
        indentation: 0,
        uppercased: false,
        lowercased: false,
        color: ``
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            adjustedStyle: Ht.Theme.text.font.info
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
                Hf.log(`error`, `InfoTextComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `InfoTextComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `InfoTextComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `InfoTextComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.text.info.shade,
        alignment: Ht.Theme.text.info.alignment,
        decoration: Ht.Theme.text.info.decoration,
        indentation: 0,
        color: ``
    }) => {
        const component = this;
        const {
            shade,
            alignment,
            decoration,
            indentation,
            color,
            style
        } = Hf.fallback({
            shade: Ht.Theme.text.info.shade,
            alignment: Ht.Theme.text.info.alignment,
            decoration: Ht.Theme.text.info.decoration,
            indentation: 0,
            color: ``
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themeColor;

        if (Hf.isEmpty(color)) {
            themeColor = Ht.Theme.text.color[shade];
        } else {
            themeColor = color;
        }

        return Hf.isObject(style) ? Hf.merge(prevAdjustedStyle).with({
            small: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor,
                ...style
            },
            normal: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor,
                ...style
            },
            large: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor,
                ...style
            }
        }) : Hf.merge(prevAdjustedStyle).with({
            small: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor
            },
            normal: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor
            },
            large: {
                textAlign: alignment,
                textDecorationLine: decoration,
                paddingLeft: indentation,
                color: themeColor
            }
        });
    }
    animate = (option = {
        loopCount: -1,
        duration: DEFAULT_ANIMATION_DURATION_MS,
        delay: 0,
        easing: `ease`
    }) => {
        const component = this;
        const {
            cId
        } = component.props;
        const [ animatedText ] = component.lookupComponentRefs(`animated-text${cId}`);
        const {
            from,
            to,
            loopCount,
            duration,
            delay,
            easing
        } = Hf.fallback({
            loopCount: -1,
            duration: DEFAULT_ANIMATION_DURATION_MS,
            delay: 0,
            easing: `ease`
        }).of(option);
        let intervalId;
        let count = loopCount;

        if (Hf.isObject(from) && Hf.isObject(to)) {
            if (delay > 0) {
                setTimeout(() => {
                    intervalId = setInterval(() => {
                        if (count >= 0) {
                            if (count === 0) {
                                clearInterval(intervalId);
                            } else {
                                animatedText.transition(from, to, duration, easing);
                                count--;
                            }
                        }
                    }, duration);
                }, delay);
            } else {
                intervalId = setInterval(() => {
                    if (count >= 0) {
                        if (count === 0) {
                            clearInterval(intervalId);
                        } else {
                            animatedText.transition(from, to, duration, easing);
                            count--;
                        }
                    }
                }, duration);
            }
        } else if (!Hf.isObject(from) && Hf.isObject(to)) {
            if (delay > 0) {
                setTimeout(() => {
                    intervalId = setInterval(() => {
                        if (count >= 0) {
                            if (count === 0) {
                                clearInterval(intervalId);
                            } else {
                                animatedText.transitionTo(to, duration, easing);
                                count--;
                            }
                        }
                    }, duration);
                }, delay);
            } else {
                intervalId = setInterval(() => {
                    if (count >= 0) {
                        if (count === 0) {
                            clearInterval(intervalId);
                        } else {
                            animatedText.transitionTo(to, duration, easing);
                            count--;
                        }
                    }
                }, duration);
            }
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            alignment,
            decoration,
            indentation,
            color,
            style
        } = component.props;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    alignment,
                    decoration,
                    indentation,
                    color,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            alignment,
            decoration,
            indentation,
            color,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    alignment,
                    decoration,
                    indentation,
                    color,
                    style
                })
            };
        });
    }
    render () {
        const component = this;
        const {
            cId,
            size,
            uppercased,
            lowercased,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        let infoTextChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (uppercased) {
                    return child.toUpperCase();
                } else if (lowercased) {
                    return child.toLowerCase();
                } else {
                    return child;
                }
            }));
            infoTextChildren = Hf.isEmpty(fragments) ? null : fragments;
        }

        return (
            <AnimatedText
                ref = { component.assignComponentRef(`animated-text${cId}`) }
                style = { adjustedStyle[size] }
                useNativeDriver = { true }
                ellipsizeMode = 'tail'
                numberOfLines = { 1028 }
            >
                {
                    infoTextChildren
                }
            </AnimatedText>
        );
    }
}