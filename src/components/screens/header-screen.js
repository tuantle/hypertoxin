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
 * @module HeaderScreen
 * @description - Header screen component.
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
    Dimensions,
    ImageBackground,
    StatusBar,
    Text,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: `#000000`,
    shadowRadius: 1,
    shadowOpacity: 0.25,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_HEADER_SCREEN_STYLE = {
    container: {
        position: `absolute`,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH,
        zIndex: 10,
        top: 0,
        backgroundColor: `transparent`
    },
    status: {
        position: `absolute`,
        width: DEVICE_WIDTH,
        height: DefaultTheme.screen.size.header.status,
        zIndex: 12,
        top: 0,
        left: 0
    },
    navigation: {
        small: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
            width: DEVICE_WIDTH,
            height: DefaultTheme.screen.size.header.navigation.small,
            paddingHorizontal: 6,
            zIndex: 11,
            top: DefaultTheme.screen.size.header.status
        },
        normal: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
            width: DEVICE_WIDTH,
            height: DefaultTheme.screen.size.header.navigation.normal,
            zIndex: 11,
            top: DefaultTheme.screen.size.header.status
        },
        large: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
            width: DEVICE_WIDTH,
            height: DefaultTheme.screen.size.header.navigation.large,
            zIndex: 11,
            top: DefaultTheme.screen.size.header.status
        }
    },
    contentLeftRoom: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    contentMiddleRoom: {
        flexGrow: 1,
        flexDirection: `column`,
        alignSelf: `stretch`,
        alignItems: `flex-start`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    contentRightRoom: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    mediaRoom: {
        flexGrow: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        width: DEVICE_WIDTH,
        maxHeight: DefaultTheme.screen.size.header.media,
        zIndex: 10,
        top: DefaultTheme.screen.size.header.status,
        backgroundColor: `transparent`
    },
    label: {
        small: {
            ...DefaultTheme.screen.font.header.label.small,
            paddingLeft: 6
        },
        normal: DefaultTheme.screen.font.header.label.normal,
        large: DefaultTheme.screen.font.header.label.large
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    overlay: `themed`,
    dropShadowed: `themed`
}, prevAdjustedStyle = DEFAULT_HEADER_SCREEN_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        dropShadowed,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.screen.header.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.screen.header.overlay : overlay;
    let themedStatusColor;
    let themedNavigationColor;
    let themedMediaColor;
    let themedLabelColor;
    let dropShadow;

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        themedStatusColor = Theme.screen.color.header.status[themedShade];
        themedNavigationColor = Theme.screen.color.header.navigation[themedShade];
        themedMediaColor = Theme.screen.color.header.media[themedShade];
        break;
    case `translucent`:
        themedStatusColor = `${Theme.screen.color.header.status[themedShade]}${Theme.screen.color.header.opacity}`;
        themedNavigationColor = `${Theme.screen.color.header.navigation[themedShade]}${Theme.screen.color.header.opacity}`;
        themedMediaColor = `${Theme.screen.color.header.media[themedShade]}${Theme.screen.color.header.opacity}`;
        break;
    case `transparent`:
        themedStatusColor = `transparent`;
        themedNavigationColor = `transparent`;
        themedMediaColor = `transparent`;
        break;
    }

    themedLabelColor = Theme.screen.color.header.label[themedShade];

    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.screen.header.dropShadowed)) {
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
        container: {
            ...prevAdjustedStyle.container,
            ...dropShadow,
            ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
        },
        status: {
            ...prevAdjustedStyle.status,
            height: Theme.screen.size.header.status,
            backgroundColor: themedStatusColor,
            ...(typeof style === `object` && style.hasOwnProperty(`status`) && typeof style.status ? style.status : {})
        },
        navigation: {
            small: {
                ...prevAdjustedStyle.navigation.small,
                height: Theme.screen.size.header.navigation.small,
                top: Theme.screen.size.header.status,
                backgroundColor: themedNavigationColor,
                ...(typeof style === `object` && style.hasOwnProperty(`navigation`) && typeof style.navigation ? style.navigation : {})
            },
            normal: {
                ...prevAdjustedStyle.navigation.normal,
                height: Theme.screen.size.header.navigation.normal,
                top: Theme.screen.size.header.status,
                backgroundColor: themedNavigationColor,
                ...(typeof style === `object` && style.hasOwnProperty(`navigation`) && typeof style.navigation ? style.navigation : {})
            }, large: {
                ...prevAdjustedStyle.navigation.large,
                height: Theme.screen.size.header.navigation.large,
                top: Theme.screen.size.header.status,
                backgroundColor: themedNavigationColor,
                ...(typeof style === `object` && style.hasOwnProperty(`navigation`) && typeof style.navigation ? style.navigation : {})
            }
        },
        contentLeftRoom: {
            ...prevAdjustedStyle.contentLeftRoom,
            ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom ? style.contentLeftRoom : {})
        },
        contentMiddleRoom: {
            ...prevAdjustedStyle.contentMiddleRoom,
            ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom ? style.contentMiddleRoom : {})
        },
        contentRightRoom: {
            ...prevAdjustedStyle.contentRightRoom,
            ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom ? style.contentRightRoom : {})
        },
        mediaRoom: {
            ...prevAdjustedStyle.mediaRoom,
            maxHeight: Theme.screen.size.header.media,
            top: Theme.screen.size.header.status,
            backgroundColor: themedMediaColor,
            ...(typeof style === `object` && style.hasOwnProperty(`mediaRoom`) && typeof style.mediaRoom ? style.mediaRoom : {})
        },
        label: {
            small: {
                ...prevAdjustedStyle.label.small,
                ...Theme.screen.font.header.label.small,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})
            },
            normal: {
                ...prevAdjustedStyle.label.normal,
                ...Theme.screen.font.header.label.normal,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})

            },
            large: {
                ...prevAdjustedStyle.label.large,
                ...Theme.screen.font.header.label.large,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})

            }
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
        `themed`,
        `reload`,
        `force-cache`,
        `only-if-cached`
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number
});

export default class HeaderScreen extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `themed`, `opaque`, `translucent`, `transparent` ]),
        size: PropTypes.oneOf([ `themed`, `small`, `normal`, `large` ]),
        dropShadowed: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        coverImageSource: PropTypes.oneOfType([
            () => null,
            PropTypes.string,
            PropTypes.number,
            ImageURISourcePropType,
            PropTypes.arrayOf(ImageURISourcePropType)
        ]),
        label: PropTypes.string,
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
        ]),
        onHideNavigation: PropTypes.func,
        onShowNavigation: PropTypes.func,
        onHideMedia: PropTypes.func,
        onShowMedia: PropTypes.func
    }
    static defaultProps = {
        shade: `themed`,
        overlay: `themed`,
        size: `themed`,
        dropShadowed: `themed`,
        coverImageSource: null,
        label: ``,
        initialAnimation: `themed`,
        onHideNavigation: () => null,
        onShowNavigation: () => null,
        onHideMedia: () => null,
        onShowMedia: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            dropShadowed,
            style
        } = props;
        const {
            Theme
        } = state.context;

        return {
            context: {
                Theme
            },
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                dropShadowed,
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
            visibility: {
                navigation: true,
                media: true
            },
            adjustedStyle: DEFAULT_HEADER_SCREEN_STYLE
        };
    }
    isNavigationVisible = () => {
        const component = this;
        const {
            visibility
        } = component.state;

        return visibility.navigation;
    }
    isMediaVisible = () => {
        const component = this;
        const {
            visibility
        } = component.state;

        return visibility.media;
    }
    hideNavigation = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            size,
            onHideNavigation
        } = component.props;
        const {
            visibility
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.screen.header.size : size;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (visibility.navigation) {
                animationPromises = component.animate({
                    refName: `animated-navigation-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 0,
                            translateY: -2 * Theme.screen.size.header.navigation[themedSize]
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd
                });

                if (visibility.media) {
                    component.animate({
                        refName: `animated-media-room-view`,
                        transitions: Array.isArray(transitions) ? transitions : [{
                            to: {
                                translateY: -Theme.screen.size.header.navigation[themedSize]
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }]
                    });
                }
                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            navigation: false
                        }
                    };
                }, () => {
                    onHideNavigation();
                });
            }
            return animationPromises;
        }
    }
    showNavigation = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            onShowNavigation
        } = component.props;
        const {
            visibility
        } = component.state;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (!visibility.navigation) {
                animationPromises = component.animate({
                    refName: `animated-navigation-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 1,
                            translateY: 0
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd
                });

                if (visibility.media) {
                    component.animate({
                        refName: `animated-media-room-view`,
                        transitions: Array.isArray(transitions) ? transitions : [{
                            to: {
                                translateY: 0
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }]
                    });
                }
                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            navigation: true
                        }
                    };
                }, () => {
                    onShowNavigation();
                });
            }
            return animationPromises;
        }
    }
    hideMedia = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            size,
            onHideMedia
        } = component.props;
        const {
            visibility
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.screen.header.size : size;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (visibility.media) {
                animationPromises = component.animate({
                    refName: `animated-media-room-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 0,
                            translateY: -2 * (Theme.screen.size.header.media + Theme.screen.size.header.navigation[themedSize] + Theme.screen.size.header.status)
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd
                });
                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            media: false
                        }
                    };
                }, () => {
                    onHideMedia();
                });
            }
            return animationPromises;
        }
    }
    showMedia = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            size,
            onShowMedia
        } = component.props;
        const {
            visibility
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.screen.header.size : size;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (!visibility.media) {
                if (!visibility.navigation) {
                    animationPromises = component.animate({
                        refName: `animated-media-room-view`,
                        transitions: Array.isArray(transitions) ? transitions : [{
                            to: {
                                opacity: 1,
                                translateY: -Theme.screen.size.header.navigation[themedSize]
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }],
                        onTransitionBegin,
                        onTransitionEnd,
                        onAnimationBegin,
                        onAnimationEnd
                    });
                } else {
                    animationPromises = component.animate({
                        refName: `animated-media-room-view`,
                        transitions: Array.isArray(transitions) ? transitions : [{
                            to: {
                                opacity: 1,
                                translateY: 0
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }],
                        onTransitionBegin,
                        onTransitionEnd,
                        onAnimationBegin,
                        onAnimationEnd
                    });
                }
                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            media: true
                        }
                    };
                }, () => {
                    onShowMedia();
                });
            }
            return animationPromises;
        }
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
            if (Theme.screen.animation.header.hasOwnProperty(animationName)) {
                animation = Theme.screen.animation.header[animationName];
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
            dropShadowed,
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
                    dropShadowed,
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
    renderStatus () {
        const component = this;
        const {
            shade
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedShade = shade === `themed` ? Theme.screen.header.shade : shade;

        return (
            <View style = { adjustedStyle.status }>
                <StatusBar
                    barStyle = { `${themedShade}-content` }
                    networkActivityIndicatorVisible = { false }
                />
            </View>
        );
    }
    renderNavigation (contentLeftChildren = null, contentMiddleChildren = null, contentRightChildren = null) {
        const component = this;
        const {
            size,
            label
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.screen.header.size : size;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-navigation-view`] = componentRef;
                }}
                style = { adjustedStyle.navigation[themedSize] }
                useNativeDriver = { true }
            >
                <AnimatedView
                    key = 'animated-navigation-content-left-room-view'
                    ref = {(componentRef) => {
                        component.refCache[`animated-navigation-content-left-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    style = { adjustedStyle.contentLeftRoom }
                >
                    {
                        contentLeftChildren
                    }
                </AnimatedView>
                <AnimatedView
                    key = 'animated-navigation-content-middle-room-view'
                    ref = {(componentRef) => {
                        component.refCache[`animated-navigation-content-middle-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    style = { adjustedStyle.contentMiddleRoom }
                >
                    {
                        contentMiddleChildren !== null ? contentMiddleChildren : <Text style = { adjustedStyle.label[themedSize] }>{ label }</Text>
                    }
                </AnimatedView>
                <AnimatedView
                    key = 'animated-navigation-content-right-room-view'
                    ref = {(componentRef) => {
                        component.refCache[`animated-navigation-content-right-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    style = { adjustedStyle.contentRightRoom }
                >
                    {
                        contentRightChildren
                    }
                </AnimatedView>
            </AnimatedView>
        );
    }
    renderMedia (mediaChildren = null) {
        const component = this;
        const {
            adjustedStyle
        } = component.state;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-media-room-view`] = componentRef;
                }}
                style = { adjustedStyle.mediaRoom }
                useNativeDriver = { true }
            >
                {
                    mediaChildren
                }
            </AnimatedView>
        );
    }
    render () {
        const component = this;
        const {
            shade,
            size,
            coverImageSource,
            children
        } = component.props;
        const {
            visibility,
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.screen.header.size : size;
        let contentLeftChildren = null;
        let contentMiddleChildren = null;
        let contentRightChildren = null;
        let mediaChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    const {
                        exclusions,
                        room,
                        action
                    } = child.props;
                    let actionName = `none`;
                    let actionArgs = [];

                    if (typeof room === `string` && (room === `content-left` || room === `content-middle` || room === `content-right` || room === `media`)) {
                        const inheritedProps = Array.isArray(exclusions) ? Object.entries({
                            shade,
                            size: themedSize,
                            margin: 0,
                            indentation: 0,
                            color: adjustedStyle.label[themedSize].color
                        }).filter(([
                            propName,
                            prop // eslint-disable-line
                        ]) => exclusions.every((exclusion) => propName !== exclusion)).reduce((_inheritedProps, [ propName, prop ]) => {
                            _inheritedProps[propName] = prop;
                            return _inheritedProps;
                        }, {}) : {
                            shade,
                            size: themedSize,
                            margin: 0,
                            indentation: 0,
                            color: adjustedStyle.label[themedSize].color
                        };

                        if (typeof action === `string`) {
                            actionName = action;
                        } else if (typeof action === `object` && action.hasOwnProperty(`name`)) {
                            actionName = action.name;
                            if (action.hasOwnProperty(`args`) && Array.isArray(action.args)) {
                                actionArgs = action.args;
                            }
                        }

                        switch (actionName) { // eslint-disable-line
                        case `show-media`:
                            if (!visibility.media) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.showMedia(...actionArgs)
                                });
                            }
                            return null;
                        case `hide-media`:
                            if (visibility.media) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.hideMedia(...actionArgs)
                                });
                            }
                            return null;
                        default:
                            return React.cloneElement(child, inheritedProps);
                        }
                    }
                }
                return child;
            }));

            contentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                }
                return false;
            });
            contentLeftChildren = contentLeftChildren.length > 0 ? contentLeftChildren : null;

            contentMiddleChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-middle`;
                }
                return false;
            });
            contentMiddleChildren = contentMiddleChildren.length > 0 ? contentMiddleChildren : null;

            contentRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-right`;
                }
                return false;
            });
            contentRightChildren = contentRightChildren.length > 0 ? contentRightChildren : null;

            mediaChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `media`;
                }
                return false;
            });
            mediaChildren = mediaChildren.length > 0 ? mediaChildren : null;
        }

        if (coverImageSource !== null) {
            return (
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-container-view`] = componentRef;
                    }}
                    style = { adjustedStyle.container }
                    useNativeDriver = { true }
                >
                    <ImageBackground
                        style = {{
                            width: DEVICE_WIDTH,
                            height: Theme.screen.size.header.media + Theme.screen.size.header.navigation[themedSize] + Theme.screen.size.header.status
                        }}
                        source = {
                            typeof coverImageSource === `string` ? {
                                uri: coverImageSource,
                                cache: `only-if-cached`
                            } : coverImageSource
                        }
                        resizeMode = 'cover'
                    >
                        {
                            component.renderStatus()
                        }
                        {
                            component.renderNavigation(contentLeftChildren, contentMiddleChildren, contentRightChildren)
                        }
                        {
                            component.renderMedia(mediaChildren)
                        }
                    </ImageBackground>
                </AnimatedView>
            );
        }
        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                style = { adjustedStyle.container }
                useNativeDriver = { true }
            >
                {
                    component.renderStatus()
                }
                {
                    component.renderNavigation(contentLeftChildren, contentMiddleChildren, contentRightChildren)
                }
                {
                    component.renderMedia(mediaChildren)
                }
            </AnimatedView>
        );
    }
}
