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
 * @module AvatarImage
 * @description - Avatar image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { View as AnimatedView } from 'react-native-animatable';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const {
    Image
} = ReactNative;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: `#000000`,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_AVATAR_IMAGE_STYLE = {
    small: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        width: DefaultTheme.image.size.avatar.small + 15,
        height: DefaultTheme.image.size.avatar.small + 15,
        padding: 3,
        borderRadius: (DefaultTheme.image.size.avatar.small + 15) / 2,
        backgroundColor: `transparent`
    },
    normal: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        width: DefaultTheme.image.size.avatar.normal + 15,
        height: DefaultTheme.image.size.avatar.normal + 15,
        padding: 3,
        borderRadius: (DefaultTheme.image.size.avatar.normal + 15) / 2,
        backgroundColor: `transparent`
    },
    large: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        width: DefaultTheme.image.size.avatar.large + 15,
        height: DefaultTheme.image.size.avatar.large + 15,
        padding: 3,
        borderRadius: (DefaultTheme.image.size.avatar.large + 15) / 2,
        backgroundColor: `transparent`
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    overlay: `themed`,
    margin: `themed`,
    dropShadowed: `themed`,
    color: `themed`
}, prevAdjustedStyle = DEFAULT_AVATAR_IMAGE_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        margin,
        dropShadowed,
        color,
        style
    } = newStyle;
    const themedOverlay = overlay === `themed` ? Theme.image.avatar.overlay : overlay;
    const themedShade = shade === `themed` ? Theme.image.avatar.shade : shade;
    const nullMargin = {
        margin: null,
        marginTop: null,
        marginBottom: null,
        marginLeft: null,
        marginRight: null,
        marginHorizontal: null,
        marginVertical: null
    };
    let dropShadow;
    let themedColor;
    let themedBorderColor;
    let themedBorderWidth = 0;
    let themedMargin;

    if (color === `themed`) {
        if (Theme.image.color.avatar.hasOwnProperty(Theme.image.avatar.color)) {
            themedColor = Theme.image.color.avatar[Theme.image.avatar.color][themedShade];
        } else {
            themedColor = Theme.image.avatar.color;
        }
    } else if (Theme.image.color.avatar.hasOwnProperty(color)) {
        themedColor = Theme.image.color.avatar[color][themedShade];
    } else {
        themedColor = color;
    }

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.image.avatar.margin === `string` && Theme.image.margin.avatar.hasOwnProperty(Theme.image.avatar.margin)) {
                themedMargin = Theme.image.margin.avatar[Theme.image.avatar.margin];
            } else {
                themedMargin = Theme.image.avatar.margin;
            }
        } else if (Theme.image.margin.avatar.hasOwnProperty(margin)) {
            themedMargin = Theme.image.margin.avatar[margin];
        } else {
            themedMargin = 0;
        }
    } else {
        themedMargin = margin;
    }
    if (typeof themedMargin === `number`) {
        themedMargin = {
            small: {
                ...nullMargin,
                margin: themedMargin
            },
            normal: {
                ...nullMargin,
                margin: themedMargin
            },
            large: {
                ...nullMargin,
                margin: themedMargin
            }
        };
    } else if (typeof themedMargin === `object`) {
        themedMargin = Object.entries(themedMargin).reduce((_themedMargin, [ key, value ]) => {
            let _margin = nullMargin;

            _margin[`margin${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
            _themedMargin = {
                small: {
                    ..._themedMargin.small,
                    ..._margin
                },
                normal: {
                    ..._themedMargin.normal,
                    ..._margin
                },
                large: {
                    ..._themedMargin.large,
                    ..._margin
                }
            };
            return _themedMargin;
        }, {
            small: nullMargin,
            normal: nullMargin,
            large: nullMargin
        });
    }

    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.image.avatar.dropShadowed)) {
        dropShadow = DEFAULT_DROP_SHADOW_STYLE;
    } else {
        dropShadow = {
            ...DEFAULT_DROP_SHADOW_STYLE,
            shadowRadius: 0,
            shadowOpacity: 0,
            shadowOffset: {
                width: 0,
                height: 0
            }
        };
    }

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        themedBorderColor = `transparent`;
        break;
    case `translucent`:
        themedBorderColor = `transparent`;
        themedColor = `${themedColor}${Theme.image.color.avatar.opacity}`;
        break;
    case `translucent-outline`:
        themedBorderColor = themedColor;
        themedColor = `${themedColor}${Theme.image.color.avatar.opacity}`;
        break;
    case `transparent`:
        themedBorderColor = `transparent`;
        themedColor = `transparent`;
        break;
    case `transparent-outline`:
        themedBorderColor = themedColor;
        themedBorderWidth = 1;
        themedColor = `transparent`;
        break;
    }

    return {
        small: {
            ...prevAdjustedStyle.small,
            ...dropShadow,
            width: Theme.image.size.avatar.small + 15,
            height: Theme.image.size.avatar.small + 15,
            ...themedMargin.small,
            borderRadius: (Theme.image.size.avatar.small + 15) / 2,
            borderWidth: themedBorderWidth,
            borderColor: themedBorderColor,
            backgroundColor: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        normal: {
            ...prevAdjustedStyle.normal,
            ...dropShadow,
            width: Theme.image.size.avatar.normal + 15,
            height: Theme.image.size.avatar.normal + 15,
            ...themedMargin.normal,
            borderRadius: (Theme.image.size.avatar.normal + 15) / 2,
            borderWidth: themedBorderWidth,
            borderColor: themedBorderColor,
            backgroundColor: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        large: {
            ...prevAdjustedStyle.large,
            ...dropShadow,
            width: Theme.image.size.avatar.large + 15,
            height: Theme.image.size.avatar.large + 15,
            ...themedMargin.large,
            borderRadius: (Theme.image.size.avatar.large + 15) / 2,
            borderWidth: themedBorderWidth,
            borderColor: themedBorderColor,
            backgroundColor: themedColor,
            ...(typeof style === `object` ? style : {})
        }
    };
};

const ImageURISourcePropType = PropTypes.shape({
    uri: PropTypes.string,
    bundle: PropTypes.string,
    method: PropTypes.string,
    headers: PropTypes.objectOf(PropTypes.string),
    body: PropTypes.string,
    cache: PropTypes.oneOf([
        `default`,
        `reload`,
        `force-cache`,
        `only-if-cached`
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number
});

export default class AvatarImage extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        exclusions: PropTypes.arrayOf(PropTypes.string),
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-middle`, `content-right`,
            `content-bottom`, `content-top`,
            `media`, `activity-indicator`
        ]),
        shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` ]),
        size: PropTypes.oneOf([ `themed`, `small`, `normal`, `large` ]),
        margin: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({
                top: PropTypes.number,
                bottom: PropTypes.number,
                left: PropTypes.number,
                right: PropTypes.number,
                horizontal: PropTypes.number,
                vertical: PropTypes.number
            })
        ]),
        dropShadowed: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        color: PropTypes.string,
        source: PropTypes.oneOfType([
            () => null,
            PropTypes.string,
            PropTypes.number,
            ImageURISourcePropType,
            PropTypes.arrayOf(ImageURISourcePropType)
        ]),
        defaultSource: PropTypes.oneOfType([
            () => null,
            PropTypes.string,
            PropTypes.number,
            ImageURISourcePropType,
            PropTypes.arrayOf(ImageURISourcePropType)
        ]),
        initialAnimation: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                refName: PropTypes.string,
                transitions: PropTypes.arrayOf(PropTypes.shape({
                    to: PropTypes.oneOfType([
                        PropTypes.func,
                        PropTypes.object
                    ]),
                    from: PropTypes.oneOfType([
                        PropTypes.func,
                        PropTypes.object
                    ]),
                    option: PropTypes.shape({
                        duration: PropTypes.number,
                        delay: PropTypes.number,
                        easing: PropTypes.string
                    })
                })),
                onTransitionBegin: PropTypes.func,
                onTransitionEnd: PropTypes.func,
                onAnimationBegin: PropTypes.func,
                onAnimationEnd: PropTypes.func
            })
        ])
    }
    static defaultProps = {
        exclusions: [ `` ],
        room: `none`,
        shade: `themed`,
        overlay: `themed`,
        size: `themed`,
        margin: `themed`,
        dropShadowed: `themed`,
        color: `themed`,
        source: null,
        defaultSource: null,
        initialAnimation: `themed`
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            margin,
            dropShadowed,
            color,
            style
        } = props;
        const {
            Theme
        } = state.context;

        return {
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                margin,
                dropShadowed,
                color,
                style
            }, state.adjustedStyle, Theme)
        };
    }
    constructor (props) {
        super(props);

        const component = this;

        component.refCache = {};
        component.state = {
            context: {
                Theme: DefaultTheme
            },
            adjustedStyle: DEFAULT_AVATAR_IMAGE_STYLE
        };
    }
    animate (animation = {
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) {
        const component = this;
        const {
            Theme
        } = component.context;

        if (typeof animation === `string` && animation !== `none`) {
            const animationName = animation.replace(/-([a-z])/g, (match, word) => word.toUpperCase());
            if (Theme.image.animation.avatar.hasOwnProperty(animationName)) {
                animation = Theme.image.animation.avatar[animationName];
            }
        }

        if (typeof animation === `object`) {
            const {
                refName,
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;

            const componentRef = component.refCache[refName];
            if (componentRef !== undefined && Array.isArray(transitions)) {
                let transitionDuration = 0;

                const transitionPromises = transitions.map((transition, transitionIndex) => {
                    let transitionBeginPromise;
                    let transitionEndPromise;

                    if (typeof transition === `object`) {
                        let transitionType;
                        let componentRefTransition = {
                            from: {},
                            to: {}
                        };
                        let componentRefTransitionOption = {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        };

                        if (transition.hasOwnProperty(`from`)) {
                            let from = typeof transition.from === `function` ? transition.from(component.props, component.state, component.context) : transition.from;
                            componentRefTransition.from = typeof from === `object` ? from : {};
                            transitionType = `from`;
                        }
                        if (transition.hasOwnProperty(`to`)) {
                            let to = typeof transition.to === `function` ? transition.to(component.props, component.state, component.context) : transition.to;
                            componentRefTransition.to = typeof to === `object` ? to : {};
                            transitionType = transitionType === `from` ? `from-to` : `to`;
                        }
                        if (transition.hasOwnProperty(`option`) && typeof transition.option === `object`) {
                            componentRefTransitionOption = {
                                ...componentRefTransitionOption,
                                ...transition.option
                            };
                        }

                        transitionBeginPromise = new Promise((resolve) => {
                            setTimeout(() => {
                                if (transitionType === `to`) {
                                    componentRef.transitionTo(
                                        componentRefTransition.to,
                                        componentRefTransitionOption.duration,
                                        componentRefTransitionOption.easing,
                                        componentRefTransitionOption.delay
                                    );
                                } else if (transitionType === `from-to`) {
                                    setTimeout(() => {
                                        componentRef.transition(
                                            componentRefTransition.from,
                                            componentRefTransition.to,
                                            componentRefTransitionOption.duration,
                                            componentRefTransitionOption.easing
                                        );
                                    }, componentRefTransitionOption.delay);
                                }
                                (typeof onTransitionBegin === `function` ? onTransitionBegin : () => null)(transitionIndex);
                                resolve((_onTransitionBegin) => (typeof _onTransitionBegin === `function` ? _onTransitionBegin : () => null)(_onTransitionBegin));
                            }, transitionDuration + 5);
                        });

                        transitionDuration += componentRefTransitionOption.duration + componentRefTransitionOption.delay;

                        transitionEndPromise = new Promise((resolve) => {
                            setTimeout(() => {
                                (typeof onTransitionEnd === `function` ? onTransitionEnd : () => null)(transitionIndex);
                                resolve((_onTransitionEnd) => (typeof _onTransitionEnd === `function` ? _onTransitionEnd : () => null)(transitionIndex));
                            }, transitionDuration);
                        });
                    }

                    return [ transitionBeginPromise, transitionEndPromise ];
                });

                const animationBeginPromise = new Promise((resolve) => {
                    (typeof onAnimationBegin === `function` ? onAnimationBegin : () => null)();
                    resolve((_onAnimationBegin) => (typeof _onAnimationBegin === `function` ? _onAnimationBegin : () => null)());
                });
                const animationEndPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        (typeof onAnimationEnd === `function` ? onAnimationEnd : () => null)();
                        resolve((_onAnimationEnd) => (typeof _onAnimationEnd === `function` ? _onAnimationEnd : () => null)());
                    }, transitionDuration + 5);
                });

                return Promise.all([
                    animationBeginPromise,
                    ...transitionPromises.flat(),
                    animationEndPromise
                ].filter((animationPromise) => animationPromise !== undefined));
            }
        }
    }
    componentDidMount () {
        const component = this;
        const {
            shade,
            overlay,
            margin,
            dropShadowed,
            color,
            initialAnimation,
            style
        } = component.props;
        const {
            Theme
        } = component.context;

        component.setState((prevState) => {
            return {
                context: {
                    Theme
                },
                adjustedStyle: readjustStyle({
                    shade,
                    overlay,
                    margin,
                    dropShadowed,
                    color,
                    style
                }, prevState.adjustedStyle, Theme)
            };
        }, () => {
            if ((typeof initialAnimation === `string` && initialAnimation !== `none`) || typeof initialAnimation === `object`) {
                component.animate(initialAnimation);
            }
        });
    }
    componentWillUnMount () {
        const component = this;

        component.refCache = {};
    }
    render () {
        const component = this;
        const {
            size,
            source,
            defaultSource
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.image.avatar.size : size;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                style = { adjustedStyle[themedSize] }
                useNativeDriver = { true }
            >
                <Image
                    source = {
                        typeof source === `string` ? {
                            uri: source,
                            cache: `only-if-cached`
                        } : source
                    }
                    defaultSource = {
                        typeof defaultSource === `string` ? {
                            uri: defaultSource
                        } : defaultSource
                    }
                    resizeMode = 'cover'
                    style = {{
                        width: adjustedStyle[themedSize].width - 15,
                        height: adjustedStyle[themedSize].height - 15
                    }}
                />
            </AnimatedView>
        );
    }
}
