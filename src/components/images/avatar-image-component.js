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
 * @module AvatarImageComponent
 * @description - Avatar image component.
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

const DEFAULT_AVATAR_IMAGE_STYLE = {
    small: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.avatar.small,
        height: Ht.Theme.image.size.avatar.small,
        padding: 3,
        margin: 3,
        borderRadius: Ht.Theme.image.size.avatar.small / 2,
        backgroundColor: Ht.Theme.palette.white
    },
    normal: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.avatar.normal,
        height: Ht.Theme.image.size.avatar.normal,
        padding: 3,
        margin: 3,
        borderRadius: Ht.Theme.image.size.avatar.normal / 2,
        backgroundColor: Ht.Theme.palette.white
    },
    large: {
        ...Ht.Theme.general.dropShadow.shallow,
        width: Ht.Theme.image.size.avatar.large,
        height: Ht.Theme.image.size.avatar.large,
        padding: 3,
        margin: 3,
        borderRadius: Ht.Theme.image.size.avatar.large,
        backgroundColor: Ht.Theme.palette.white
    }
};

export default class AvatarImageComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-center`, `content-right`,
            `media`, `overlay`
        ]),
        size: PropTypes.oneOf([ `small`, `normal`, `large` ]),
        dropShadowed: PropTypes.bool,
        frame: PropTypes.oneOf([ `none`, `thin`, `normal`, `thick` ]),
        frameColor: PropTypes.string
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        size: Ht.Theme.image.avatar.size,
        dropShadowed: Ht.Theme.image.avatar.dropShadowed,
        frame: Ht.Theme.image.avatar.frame,
        frameColor: Ht.Theme.image.avatar.frameColor
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            adjustedStyle: DEFAULT_AVATAR_IMAGE_STYLE
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
                Hf.log(`error`, `AvatarImageComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `AvatarImageComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `AvatarImageComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `AvatarImageComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        dropShadowed: Ht.Theme.image.avatar.dropShadowed,
        frame: Ht.Theme.image.avatar.frame,
        frameColor: Ht.Theme.image.avatar.frameColor
    }) => {
        const component = this;
        const {
            dropShadowed,
            frame,
            frameColor,
            style
        } = Hf.fallback({
            dropShadowed: Ht.Theme.image.avatar.dropShadowed,
            frame: Ht.Theme.image.avatar.frame,
            frameColor: Ht.Theme.image.avatar.frameColor
        }).of(newStyle);
        const themedFrameColor = frame !== `none` ? frameColor : `transparent`;
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;

        return Hf.isObject(style) ? Hf.merge(prevAdjustedStyle).with({
            small: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            },
            normal: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            },
            large: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`,
                ...style
            }
        }) : Hf.merge(prevAdjustedStyle).with({
            small: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
            },
            normal: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
            },
            large: {
                borderWidth: Ht.Theme.image.frame[frame],
                borderColor: themedFrameColor,
                shadowColor: dropShadowed ? Ht.Theme.palette.black : `transparent`
            }
        });
    }
    animate = (option = {
        loopCount: -1,
        duration: 300,
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
            duration: 300,
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
            dropShadowed,
            frame,
            frameColor,
            style
        } = component.props;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    dropShadowed,
                    frame,
                    frameColor,
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
            dropShadowed,
            frame,
            frameColor,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    dropShadowed,
                    frame,
                    frameColor,
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

        return (
            <AnimatedImage
                ref = { component.assignComponentRef(`animated-image${cId}`) }
                style = { adjustedStyle[size] }
                source = {
                    Hf.isString(source) ? {
                        uri: source,
                        cache: `only-if-cached`
                    } : source
                }
                defaultSource = {
                    Hf.isString(defaultSource) ? {
                        uri: defaultSource
                    } : defaultSource
                }
                resizeMode = 'contain'
                useNativeDriver = { true }
            />
        );
    }
}
