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
 * @module SubtitleText
 * @description - Subtitle text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { Text as AnimatedText } from 'react-native-animatable';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_SUBTITLE_TEXT_STYLE = DefaultTheme.text.font.subtitle;

const readjustStyle = (newStyle = {
    shade: `themed`,
    alignment: `left`,
    decoration: `none`,
    font: `themed`,
    indentation: 0,
    color: `themed`
}, prevAdjustedStyle = DEFAULT_SUBTITLE_TEXT_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        alignment,
        decoration,
        font,
        indentation,
        color,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.text.subtitle.shade : shade;
    let themedColor;

    if (color === `themed`) {
        if (Theme.text.color.subtitle.hasOwnProperty(Theme.text.subtitle.color)) {
            themedColor = Theme.text.color.subtitle[Theme.text.subtitle.color][themedShade];
        } else {
            themedColor = Theme.text.subtitle.color;
        }
    } else if (Theme.text.color.subtitle.hasOwnProperty(color)) {
        themedColor = Theme.text.color.subtitle[color][themedShade];
    } else {
        themedColor = color;
    }

    return {
        small: {
            ...prevAdjustedStyle.small,
            ...Theme.text.font.subtitle.small,
            fontFamily: font === `themed` ? Theme.text.font.subtitle.small.fontFamily : font,
            textAlign: alignment,
            textDecorationLine: decoration,
            paddingLeft: indentation > 0 ? indentation : 0,
            paddingRight: indentation < 0 ? -indentation : 0,
            color: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        normal: {
            ...prevAdjustedStyle.normal,
            ...Theme.text.font.subtitle.normal,
            fontFamily: font === `themed` ? Theme.text.font.subtitle.normal.fontFamily : font,
            textAlign: alignment,
            textDecorationLine: decoration,
            paddingLeft: indentation > 0 ? indentation : 0,
            paddingRight: indentation < 0 ? -indentation : 0,
            color: themedColor,
            ...(typeof style === `object` ? style : {})
        },
        large: {
            ...prevAdjustedStyle.large,
            ...Theme.text.font.subtitle.large,
            fontFamily: font === `themed` ? Theme.text.font.subtitle.large.fontFamily : font,
            textAlign: alignment,
            textDecorationLine: decoration,
            paddingLeft: indentation > 0 ? indentation : 0,
            paddingRight: indentation < 0 ? -indentation : 0,
            color: themedColor,
            ...(typeof style === `object` ? style : {})
        }
    };
};

export default class SubtitleText extends React.Component {
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
        alignment: PropTypes.oneOf([ `left`, `center`, `right` ]),
        decoration: PropTypes.oneOf([ `none`, `underline`, `line-through` ]),
        size: PropTypes.oneOf([ `themed`, `small`, `normal`, `large` ]),
        font: PropTypes.string,
        indentation: PropTypes.number,
        uppercased: PropTypes.bool,
        lowercased: PropTypes.bool,
        color: PropTypes.string,
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
        alignment: `left`,
        decoration: `none`,
        font: `themed`,
        size: `themed`,
        indentation: 0,
        uppercased: false,
        lowercased: false,
        color: `themed`,
        initialAnimation: `themed`
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            alignment,
            decoration,
            font,
            indentation,
            color,
            style
        } = props;
        const {
            Theme
        } = state.context;

        return {
            adjustedStyle: readjustStyle({
                shade,
                alignment,
                decoration,
                font,
                indentation,
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
            adjustedStyle: DEFAULT_SUBTITLE_TEXT_STYLE
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
            if (Theme.text.animation.subtitle.hasOwnProperty(animationName)) {
                animation = Theme.text.animation.subtitle[animationName];
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
            alignment,
            decoration,
            font,
            indentation,
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
                    alignment,
                    decoration,
                    font,
                    indentation,
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
            uppercased,
            lowercased,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.text.subtitle.size : size;
        let contentChildren = null;

        if (React.Children.count(children) > 0) {
            contentChildren = React.Children.toArray(React.Children.map(children, (child) => {
                if (uppercased) {
                    return child.toUpperCase();
                } else if (lowercased) {
                    return child.toLowerCase();
                }
                return child;
            }));
        }

        return (
            <AnimatedText
                ref = {(componentRef) => {
                    component.refCache[`animated-text`] = componentRef;
                }}
                style = { adjustedStyle[themedSize] }
                ellipsizeMode = 'tail'
                numberOfLines = { 1 }
                useNativeDriver = { true }
            >
                {
                    contentChildren
                }
            </AnimatedText>
        );
    }
}
