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
 * @module IconImage
 * @description - Icon image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { Image as AnimatedImage } from 'react-native-animatable';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

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

const DEFAULT_ICON_IMAGE_STYLE = {
    small: {
        width: DefaultTheme.image.size.icon.small,
        height: DefaultTheme.image.size.icon.small,
        padding: 1,
        backgroundColor: `transparent`
    },
    normal: {
        width: DefaultTheme.image.size.icon.normal,
        height: DefaultTheme.image.size.icon.normal,
        padding: 3,
        backgroundColor: `transparent`
    },
    large: {
        width: DefaultTheme.image.size.icon.large,
        height: DefaultTheme.image.size.icon.large,
        padding: 3,
        backgroundColor: `transparent`
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    margin: `themed`,
    dropShadowed: `themed`,
    color: `themed`
}, prevAdjustedStyle = DEFAULT_ICON_IMAGE_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        margin,
        dropShadowed,
        color,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.image.icon.shade : shade;
    const nullMargin = {
        margin: null,
        marginTop: null,
        marginBottom: null,
        marginLeft: null,
        marginRight: null,
        marginHorizontal: null,
        marginVertical: null
    };
    let themedColor;
    let dropShadow;
    let themedMargin;

    if (color === `themed`) {
        if (Theme.image.color.icon.hasOwnProperty(Theme.image.icon.color)) {
            themedColor = Theme.image.color.icon[Theme.image.icon.color][themedShade];
        } else{
            themedColor = Theme.image.icon.color;
        }
    } else if (Theme.image.color.icon.hasOwnProperty(color)) {
        themedColor = Theme.image.color.icon[color][themedShade];
    } else {
        themedColor = color;
    }

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.image.icon.margin === `string` && Theme.image.margin.icon.hasOwnProperty(Theme.image.icon.margin)) {
                themedMargin = Theme.image.margin.icon[Theme.image.icon.margin];
            } else {
                themedMargin = Theme.image.icon.margin;
            }
        } else if (Theme.image.margin.icon.hasOwnProperty(margin)) {
            themedMargin = Theme.image.margin.icon[margin];
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

    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.image.icon.dropShadowed)) {
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

    return {
        small: {
            ...prevAdjustedStyle.small,
            ...dropShadow,
            width: Theme.image.size.icon.small,
            height: Theme.image.size.icon.small,
            ...themedMargin.small,
            tintColor: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        normal: {
            ...prevAdjustedStyle.normal,
            ...dropShadow,
            width: Theme.image.size.icon.normal,
            height: Theme.image.size.icon.normal,
            ...themedMargin.normal,
            tintColor: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        large: {
            ...prevAdjustedStyle.large,
            ...dropShadow,
            width: Theme.image.size.icon.large,
            height: Theme.image.size.icon.large,
            ...themedMargin.large,
            tintColor: themedColor,
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

export default class IconImage extends React.Component {
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
            adjustedStyle: DEFAULT_ICON_IMAGE_STYLE
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
            if (Theme.image.animation.icon.hasOwnProperty(animationName)) {
                animation = Theme.image.animation.icon[animationName];
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
        const themedSize = size === `themed` ? Theme.image.icon.size : size;

        let themedIconSource = source;
        if (typeof themedIconSource === `string`) {
            const iconImageName = themedIconSource.replace(/-([a-z])/g, (match, word) => word.toUpperCase());
            if (Theme.icon.hasOwnProperty(iconImageName)) {
                themedIconSource = Theme.icon[iconImageName];
            }
        }
        let defaultThemedIconSource = defaultSource;
        if (typeof defaultThemedIconSource === `string`) {
            const iconImageName = defaultThemedIconSource.replace(/-([a-z])/g, (match, word) => word.toUpperCase());
            if (Theme.icon.hasOwnProperty(iconImageName)) {
                defaultThemedIconSource = Theme.icon[iconImageName];
            }
        }

        return (
            <AnimatedImage
                ref = {(componentRef) => {
                    component.refCache[`animated-image`] = componentRef;
                }}
                style = { adjustedStyle[themedSize] }
                source = {
                    typeof themedIconSource === `string` ? {
                        uri: themedIconSource,
                        isStatic: true
                    } : themedIconSource
                }
                defaultSource = {
                    typeof defaultThemedIconSource === `string` ? {
                        uri: defaultThemedIconSource
                    } : defaultThemedIconSource
                }
                resizeMode = 'contain'
                useNativeDriver = { true }
            />
        );
    }
}
