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
 * @module IconImageComponent
 * @description - Icon image component.
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

import { Image as AnimatedImage } from 'react-native-animatable';

const {
    Component
} = React;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_ICON_IMAGE_STYLE = {
    small: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.icon.small,
        height: Ht.Theme.image.size.icon.small,
        padding: 3,
        backgroundColor: `transparent`
    },
    normal: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.icon.normal,
        height: Ht.Theme.image.size.icon.normal,
        padding: 3,
        backgroundColor: `transparent`
    },
    large: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.icon.large,
        height: Ht.Theme.image.size.icon.large,
        padding: 3,
        backgroundColor: `transparent`
    }
};

export default class IconImageComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `action-left`, `action-right`,
            `content-left`, `content-center`, `content-right`,
            `media`, `overlay`, `badge`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        size: PropTypes.oneOf([ `small`, `normal`, `large` ]),
        dropShadowed: PropTypes.bool,
        color: PropTypes.string
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        shade: Ht.Theme.view.layout.shade,
        size: Ht.Theme.image.icon.size,
        dropShadowed: Ht.Theme.image.icon.dropShadowed,
        color: Ht.Theme.image.icon.color
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            adjustedStyle: DEFAULT_ICON_IMAGE_STYLE
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
                Hf.log(`error`, `IconImageComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `IconImageComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `IconImageComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `IconImageComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.view.layout.shade,
        dropShadowed: Ht.Theme.image.icon.dropShadowed,
        color: Ht.Theme.image.icon.color
    }) => {
        const component = this;
        const {
            shade,
            dropShadowed,
            color,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.layout.shade,
            dropShadowed: Ht.Theme.image.icon.dropShadowed,
            color: Ht.Theme.image.icon.color
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;

        if (Ht.Theme.image.color.icon.hasOwnProperty(color)) {
            themedColor = Ht.Theme.image.color.icon[color][shade];
        } else {
            themedColor = color;
        }

        return Hf.isObject(style) ? Hf.merge(prevAdjustedStyle).with({
            small: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            },
            normal: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            },
            large: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            }
        }) : Hf.merge(prevAdjustedStyle).with({
            small: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
            },
            normal: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
            },
            large: {
                tintColor: themedColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
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
        const [ animatedImage ] = component.lookupComponentRefs(`animated-image${cId}`);
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
                                animatedImage.transition(from, to, duration, easing);
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
                            animatedImage.transition(from, to, duration, easing);
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
                                animatedImage.transitionTo(to, duration, easing);
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
                            animatedImage.transitionTo(to, duration, easing);
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
            dropShadowed,
            color,
            style
        } = component.props;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    dropShadowed,
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
            dropShadowed,
            color,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    dropShadowed,
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
            source,
            defaultSource
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        let themedIconSource = Hf.isNonEmptyString(source) &&
                               Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(source)) ? Ht.Theme.icon[Hf.dashToCamelcase(source)] : source;
        let defaultThemedIconSource = Hf.isNonEmptyString(defaultSource) &&
                                      Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(defaultSource)) ? Ht.Theme.icon[Hf.dashToCamelcase(defaultSource)] : defaultSource;

        return (
            <AnimatedImage
                ref = { component.assignComponentRef(`animated-image${cId}`) }
                style = { adjustedStyle[size] }
                source = {
                    Hf.isString(themedIconSource) ? {
                        uri: themedIconSource,
                        isStatic: true
                    } : themedIconSource
                }
                defaultSource = {
                    Hf.isString(defaultThemedIconSource) ? {
                        uri: defaultThemedIconSource
                    } : defaultThemedIconSource
                }
                resizeMode = 'contain'
                useNativeDriver = { true }
            />
        );
    }
}
