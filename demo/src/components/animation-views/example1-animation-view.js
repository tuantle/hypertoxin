'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    FlatButton,
    RaisedButton,
    IconImage,
    CoverImage,
    HeadlineText,
    CaptionText
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

export default class Example1AnimationView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ])
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`
    }
    constructor (props) {
        super(props);
        this.headerScreenRef = null;
        this.state = {
            entered: true,
            usingStyle: null
        };
    }
    render () {
        const component = this;
        const {
            Theme,
            shade,
            navigation
        } = component.props;
        const {
            entered,
            usingStyle
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
                label = 'EXAMPLE 1 ANIMATION'
                // initialAnimation = 'fade-in'
                // style = {{
                //     container: {
                //         opacity: 0
                //     }
                // }}
            >
                <FlatButton
                    room = 'content-left'
                    overlay = 'transparent'
                    corner = 'circular'
                    onPress = {() => navigation.toggleDrawer()}
                >
                    <IconImage
                        room = 'content-middle'
                        source = 'menu'
                    />
                </FlatButton>
                <CoverImage
                    room = 'media'
                    resizeMode = 'cover'
                    source = { require(`../../../assets/images/geometric-wallpaper.png`) }
                    width = { DEVICE_WIDTH }
                    height = { 60 }
                >
                    <HeadlineText
                        room = 'content-top'
                        size = 'large'
                        color = { Theme.color.palette.white }
                    > Media section </HeadlineText>
                </CoverImage>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                style = {{
                    container: {
                        paddingTop: 150
                    }
                }}
            >
                <HeadlineText room = 'content-top' > Example 1 </HeadlineText>
                <HeadlineText room = 'content-top' > Header Screen Animation </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > An example of entry & exit animation sequence </CaptionText>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    margin = {{
                        top: 100,
                        horizontal: 10
                    }}
                >
                    <RaisedButton
                        room = 'content-top'
                        label = 'ENTRY ANIMATION STYLE 1'
                        disabled = { entered || (usingStyle !== 0 && usingStyle === 2) }
                        onPress = {() => {
                            component.headerScreenRef.animate({
                                refName: `animated-container-view`,
                                transitions: [
                                    {
                                        to: {
                                            translateX: 0
                                        },
                                        option: {
                                            duration: 150
                                        }
                                    }
                                ],
                                onAnimationEnd: () => {
                                    component.headerScreenRef.animate({
                                        refName: `animated-navigation-content-left-room-view`,
                                        transitions: [
                                            {
                                                to: {
                                                    translateX: 0
                                                },
                                                option: {
                                                    duration: 150
                                                }
                                            }
                                        ]
                                    });
                                    component.headerScreenRef.animate({
                                        refName: `animated-navigation-content-middle-room-view`,
                                        transitions: [
                                            {
                                                to: {
                                                    translateX: 0
                                                },
                                                option: {
                                                    duration: 150
                                                }
                                            }
                                        ],
                                        onAnimationEnd: () => {
                                            component.headerScreenRef.showMedia({
                                                onAnimationEnd: () => {
                                                    component.setState(() => {
                                                        return {
                                                            entered: true,
                                                            usingStyle: 0
                                                        };
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }}
                    />
                    <RaisedButton
                        room = 'content-top'
                        label = 'EXIT ANIMATION STYLE 1'
                        disabled = { !entered || (usingStyle !== 0 && usingStyle === 2) }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    entered: false,
                                    usingStyle: 1
                                };
                            }, async () => {
                                const [
                                    onMediaRoomViewAnimationEnd
                                ] = (await component.headerScreenRef.hideMedia()).slice(-1);

                                onMediaRoomViewAnimationEnd(async () => {
                                    component.headerScreenRef.animate({
                                        refName: `animated-navigation-content-left-room-view`,
                                        transitions: [
                                            {
                                                to: {
                                                    translateX: DEVICE_WIDTH
                                                },
                                                option: {
                                                    duration: 150
                                                }
                                            }
                                        ]
                                    });
                                    const [
                                        onNavigationContentMiddleRoomViewAnimationEnd
                                    ] = (await component.headerScreenRef.animate({
                                        refName: `animated-navigation-content-middle-room-view`,
                                        transitions: [
                                            {
                                                to: {
                                                    translateX: DEVICE_WIDTH
                                                },
                                                option: {
                                                    duration: 150
                                                }
                                            }
                                        ]
                                    })).slice(-1);
                                    onNavigationContentMiddleRoomViewAnimationEnd(() => {
                                        component.headerScreenRef.animate({
                                            refName: `animated-container-view`,
                                            transitions: [
                                                {
                                                    to: {
                                                        translateX: DEVICE_WIDTH
                                                    },
                                                    option: {
                                                        duration: 150
                                                    }
                                                }
                                            ]
                                        });
                                    });
                                });
                            });
                        }}
                        // onPress = {() => {
                        //     component.setState(() => {
                        //         return {
                        //             entered: false,
                        //             usingStyle: 1
                        //         };
                        //     }, () => {
                        //         component.headerScreenRef.hideMedia({
                        //             onAnimationEnd: () => {
                        //                 component.headerScreenRef.animate({
                        //                     refName: `animated-navigation-content-left-room-view`,
                        //                     transitions: [
                        //                         {
                        //                             to: {
                        //                                 translateX: DEVICE_WIDTH
                        //                             },
                        //                             option: {
                        //                                 duration: 150
                        //                             }
                        //                         }
                        //                     ]
                        //                 });
                        //                 component.headerScreenRef.animate({
                        //                     refName: `animated-navigation-content-middle-room-view`,
                        //                     transitions: [
                        //                         {
                        //                             to: {
                        //                                 translateX: DEVICE_WIDTH
                        //                             },
                        //                             option: {
                        //                                 duration: 150
                        //                             }
                        //                         }
                        //                     ],
                        //                     onAnimationEnd: () => {
                        //                         component.headerScreenRef.animate({
                        //                             refName: `animated-container-view`,
                        //                             transitions: [
                        //                                 {
                        //                                     to: {
                        //                                         translateX: DEVICE_WIDTH
                        //                                     },
                        //                                     option: {
                        //                                         duration: 150
                        //                                     }
                        //                                 }
                        //                             ]
                        //                         });
                        //                     }
                        //                 });
                        //             }
                        //         });
                        //     });
                        // }}
                    />
                </RowLayout>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    margin = {{
                        top: 100,
                        horizontal: 10
                    }}
                >
                    <RaisedButton
                        room = 'content-top'
                        label = 'ENTRY ANIMATION STYLE 2'
                        disabled = { entered || (usingStyle !== 0 && usingStyle === 1) }
                        onPress = {() => {
                            component.headerScreenRef.animate({
                                refName: `animated-container-view`,
                                transitions: [
                                    {
                                        to: {
                                            opacity: 1
                                        },
                                        option: {
                                            duration: 150
                                        }
                                    }
                                ],
                                onAnimationEnd: () => {
                                    component.headerScreenRef.showNavigation({
                                        onAnimationEnd: () => {
                                            component.headerScreenRef.showMedia({
                                                onAnimationEnd: () => {
                                                    component.setState(() => {
                                                        return {
                                                            entered: true,
                                                            usingStyle: 0
                                                        };
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }}
                    />
                    <RaisedButton
                        room = 'content-top'
                        label = 'EXIT ANIMATION STYLE 2'
                        disabled = { !entered || (usingStyle !== 0 && usingStyle === 1) }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    entered: false,
                                    usingStyle: 2
                                };
                            }, () => {
                                component.headerScreenRef.hideMedia({
                                    onAnimationEnd: () => {
                                        component.headerScreenRef.hideNavigation({
                                            onAnimationEnd: () => {
                                                component.headerScreenRef.animate({
                                                    refName: `animated-container-view`,
                                                    transitions: [
                                                        {
                                                            to: {
                                                                opacity: 0
                                                            },
                                                            option: {
                                                                duration: 150
                                                            }
                                                        }
                                                    ]
                                                });
                                            }
                                        });
                                    }
                                });
                            });
                        }}
                    />
                </RowLayout>
            </BodyScreen>
        ]);
    }
}
