'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    ActivityIndicator
    // Dimensions
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    RaisedButton,
    AreaButton,
    IconImage,
    HeadlineText,
    SubtitleText,
    CaptionText,
    HorizontalDivider
} = Ht;

// const DEVICE_WIDTH = Dimensions.get(`window`).width;

export default class Example2AnimationView extends React.Component {
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
        this.flatButton1Ref = null;
        this.raisedButton1Ref = null;
        this.raisedButton2Ref = null;
        this.raisedButton3Ref = null;
        this.raisedButton4Ref = null;
        this.raisedButton5Ref = null;
        this.raisedButton6Ref = null;
        this.popUpMenuRef = null;
        this.state = {
            beginPayment: false,
            sendingPaymentOrder: false,
            paymentOrderSent: false,
            sendingMail: false,
            mailSent: false,
            fabAActivated: false,
            fabBActivated: false
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
            beginPayment,
            sendingPaymentOrder,
            paymentOrderSent,
            sendingMail,
            mailSent,
            fabAActivated,
            fabBActivated
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                shade = { shade }
                label = 'EXAMPLE 2 ANIMATION'
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
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'center'
                contentBottomRoomAlignment = 'center'
                style = {{
                    container: {
                        paddingTop: 100
                    }
                }}
            >
                <HeadlineText room = 'content-top' > Example 2 </HeadlineText>
                <HeadlineText room = 'content-top' > Button Animation </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > Some animation examples for buttons </CaptionText>
                <ColumnLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    margin = {{
                        horizontal: 10
                    }}
                >
                    <FlatButton
                        ref = {(componentRef) => {
                            component.flatButton1Ref = componentRef;
                        }}
                        room = 'content-left'
                        overlay = 'opaque'
                        corner = 'circular'
                        busy = { sendingPaymentOrder }
                        rippled = { false }
                        color = {(() => {
                            if (beginPayment || sendingPaymentOrder) {
                                return Theme.color.palette.green;
                            } else if (paymentOrderSent) {
                                return `accent`;
                            }
                            return `primary`;
                        })()}
                        label = {(() => {
                            if (beginPayment) {
                                return `PAY $9.99`;
                            } else if (sendingPaymentOrder) {
                                return `SENDING...`;
                            } else if (paymentOrderSent) {
                                return `THANK YOU!`;
                            }
                            return `PUSHASE`;
                        })()}
                        margin = { 10 }
                        onPress = {() => {
                            if (!paymentOrderSent) {
                                if (!beginPayment) {
                                    component.flatButton1Ref.animate({
                                        refName: `animated-content-left-room-view`,
                                        transitions: [{
                                            from: {
                                                opacity: 1
                                            },
                                            to: {
                                                opacity: 0
                                            },
                                            option: {
                                                duration: 0
                                            }
                                        }]
                                    });
                                    component.flatButton1Ref.animate({
                                        refName: `animated-content-middle-room-view`,
                                        transitions: [{
                                            from: {
                                                opacity: 1,
                                                translateX: 0
                                            },
                                            to: {
                                                opacity: 0,
                                                translateX: -50
                                            },
                                            option: {
                                                duration: 500
                                            }
                                        }, {
                                            from: {
                                                opacity: 0,
                                                translateX: -50
                                            },
                                            to: {
                                                opacity: 1,
                                                translateX: 0
                                            },
                                            option: {
                                                duration: 500
                                            }
                                        }],
                                        onTransitionEnd: (transitionIndex) => {
                                            if (transitionIndex === 0) {
                                                component.setState(() => {
                                                    return {
                                                        beginPayment: true
                                                    };
                                                });
                                            }
                                        }
                                    });
                                } else if (beginPayment || sendingPaymentOrder) {
                                    component.flatButton1Ref.animate({
                                        refName: `animated-content-middle-room-view`,
                                        transitions: Array(9).fill().map((transition, transitionIndex) => {
                                            if (transitionIndex % 2 === 0) {
                                                return {
                                                    from: {
                                                        opacity: 1
                                                    },
                                                    to: {
                                                        opacity: 0
                                                    },
                                                    option: {
                                                        duration: 500
                                                    }
                                                };
                                            }
                                            return {
                                                from: {
                                                    opacity: 0
                                                },
                                                to: {
                                                    opacity: 1
                                                },
                                                option: {
                                                    duration: 500
                                                }
                                            };
                                        }),
                                        onTransitionEnd: (transitionIndex) => {
                                            if (transitionIndex === 0) {
                                                component.setState(() => {
                                                    return {
                                                        beginPayment: false,
                                                        sendingPaymentOrder: true
                                                    };
                                                });
                                            }
                                            if (transitionIndex === 8) {
                                                component.setState(() => {
                                                    return {
                                                        sendingPaymentOrder: false,
                                                        paymentOrderSent: true
                                                    };
                                                }, () => {
                                                    component.flatButton1Ref.animate({
                                                        refName: `animated-content-left-room-view`,
                                                        transitions: [{
                                                            from: {
                                                                opacity: 0
                                                            },
                                                            to: {
                                                                opacity: 1
                                                            },
                                                            option: {
                                                                duration: 500
                                                            }
                                                        }]
                                                    });
                                                    component.flatButton1Ref.animate({
                                                        refName: `animated-content-middle-room-view`,
                                                        transitions: [{
                                                            from: {
                                                                opacity: 0
                                                            },
                                                            to: {
                                                                opacity: 1
                                                            },
                                                            option: {
                                                                duration: 500
                                                            }
                                                        }],
                                                        onAnimationEnd: () => {
                                                            setTimeout(() => {
                                                                component.setState(() => {
                                                                    return {
                                                                        beginPayment: false,
                                                                        sendingPaymentOrder: false,
                                                                        paymentOrderSent: false
                                                                    };
                                                                });
                                                            }, 10000);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }}
                        style = {{
                            container: {
                                width: 150
                            }
                        }}
                    >
                        {
                            paymentOrderSent ? <IconImage
                                room = 'content-left'
                                exclusions = {[ `color` ]}
                                source = 'favorite'
                                color = { Theme.color.palette.red }
                            /> : null
                        }
                    </FlatButton>

                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton1Ref = componentRef;
                        }}
                        busy = { sendingMail }
                        rippled = { false }
                        room = 'content-right'
                        color = {(() => {
                            if (mailSent) {
                                return `secondary`;
                            }
                            return `accent`;
                        })()}
                        label = {(() => {
                            if (mailSent) {
                                return `SENT`;
                            } else if (sendingMail) {
                                return ``;
                            }
                            return `SEND`;
                        })()}
                        margin = { 10 }
                        onPress = {() => {
                            if (!mailSent) {
                                component.raisedButton1Ref.animate({
                                    refName: `animated-content-left-room-view`,
                                    transitions: [{
                                        from: {
                                            opacity: 1
                                        },
                                        to: {
                                            opacity: 0
                                        },
                                        option: {
                                            duration: 300
                                        }
                                    }]
                                });
                                component.raisedButton1Ref.animate({
                                    refName: `animated-content-middle-room-view`,
                                    transitions: [{
                                        from: {
                                            opacity: 1
                                        },
                                        to: {
                                            opacity: 0
                                        },
                                        option: {
                                            duration: 300
                                        }
                                    }],
                                    onAnimationEnd: () => {
                                        component.setState(() => {
                                            return {
                                                sendingMail: true
                                            };
                                        }, () => {
                                            setTimeout(() => {
                                                component.setState(() => {
                                                    return {
                                                        mailSent: true,
                                                        sendingMail: false
                                                    };
                                                }, () => {
                                                    component.raisedButton1Ref.animate({
                                                        refName: `animated-content-left-room-view`,
                                                        transitions: [{
                                                            from: {
                                                                opacity: 0
                                                            },
                                                            to: {
                                                                opacity: 1
                                                            },
                                                            option: {
                                                                duration: 300
                                                            }
                                                        }]
                                                    });
                                                    component.raisedButton1Ref.animate({
                                                        refName: `animated-content-middle-room-view`,
                                                        transitions: [{
                                                            from: {
                                                                opacity: 0
                                                            },
                                                            to: {
                                                                opacity: 1
                                                            },
                                                            option: {
                                                                duration: 300
                                                            }
                                                        }]
                                                    });
                                                });
                                            }, 2000);
                                            setTimeout(() => {
                                                component.setState(() => {
                                                    return {
                                                        mailSent: false,
                                                        sendingMail: false
                                                    };
                                                });
                                            }, 10000);
                                        });
                                    }
                                });
                            }
                        }}
                        style = {{
                            container: {
                                width: 150
                            }
                        }}
                    >
                        <ActivityIndicator
                            room = 'activity-indicator'
                            size = 'small'
                            color = { Theme.color.palette.pink }
                        />
                        <IconImage
                            room = 'content-left'
                            source = { !mailSent ? `email` : `check` }
                        />
                    </RaisedButton>
                </ColumnLayout>
                <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
                <HeadlineText room = 'content-middle' > FAB Menu Animation </HeadlineText>
                <CaptionText room = 'content-middle' size = 'large' > Expanding FAB button </CaptionText>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'start'
                    margin = {{
                        horizontal: 10
                    }}
                >
                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton3Ref = componentRef;
                        }}
                        room = 'content-middle'
                        color = 'accent'
                        corner = 'circular'
                        size = 'large'
                        initialAnimation = {{
                            refName: `animated-container-view`,
                            transitions: [{
                                from: {
                                    opacity: 1,
                                    translateY: 0
                                },
                                to: {
                                    opacity: 0,
                                    translateY: 150
                                },
                                option: {
                                    duration: 1
                                }
                            }]
                        }}
                    >
                        <IconImage
                            exclusions = {[ `size` ]}
                            room = 'content-middle'
                            source = 'email'
                            size = 'small'
                        />
                    </RaisedButton>
                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton4Ref = componentRef;
                        }}
                        room = 'content-middle'
                        color = 'accent'
                        corner = 'circular'
                        size = 'large'
                        initialAnimation = {{
                            refName: `animated-container-view`,
                            transitions: [{
                                from: {
                                    opacity: 1,
                                    translateY: 0
                                },
                                to: {
                                    opacity: 0,
                                    translateY: 100
                                },
                                option: {
                                    duration: 1
                                }
                            }]
                        }}
                    >
                        <IconImage
                            exclusions = {[ `size` ]}
                            room = 'content-middle'
                            source = 'edit'
                            size = 'small'
                        />
                    </RaisedButton>
                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton5Ref = componentRef;
                        }}
                        room = 'content-middle'
                        color = 'accent'
                        corner = 'circular'
                        size = 'large'
                        initialAnimation = {{
                            refName: `animated-container-view`,
                            transitions: [{
                                from: {
                                    opacity: 1,
                                    translateY: 0
                                },
                                to: {
                                    opacity: 0,
                                    translateY: 50
                                },
                                option: {
                                    duration: 1
                                }
                            }]
                        }}
                    >
                        <IconImage
                            exclusions = {[ `size` ]}
                            room = 'content-middle'
                            source = 'favorite'
                            size = 'small'
                        />
                    </RaisedButton>
                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton2Ref = componentRef;
                        }}
                        room = 'content-middle'
                        color = { fabAActivated ? `accent` : `primary` }
                        corner = 'circular'
                        size = 'large'
                        onPress = {() => {
                            component.setState((prevState) => {
                                return {
                                    fabAActivated: !prevState.fabAActivated
                                };
                            }, () => {
                                component.raisedButton2Ref.animate({
                                    refName: `animated-content-middle-room-view`,
                                    transitions: [{
                                        from: (() => {
                                            return fabAActivated ? {
                                                rotate: `45deg`
                                            } : {
                                                rotate: `0deg`
                                            };
                                        })(),
                                        to: (() => {
                                            return fabAActivated ? {
                                                rotate: `0deg`
                                            } : {
                                                rotate: `45deg`
                                            };
                                        })(),
                                        option: {
                                            duration: 300
                                        }
                                    }],
                                    onAnimationEnd: () => {
                                        component.raisedButton3Ref.animate({
                                            refName: `animated-container-view`,
                                            transitions: [{
                                                from: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 1,
                                                        translateY: 0
                                                    } : {
                                                        opacity: 0,
                                                        translateY: 150
                                                    };
                                                })(),
                                                to: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 0,
                                                        translateY: 150
                                                    } : {
                                                        opacity: 1,
                                                        translateY: 0
                                                    };
                                                })(),
                                                option: {
                                                    duration: 300
                                                }
                                            }]
                                        });
                                        component.raisedButton4Ref.animate({
                                            refName: `animated-container-view`,
                                            transitions: [{
                                                from: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 1,
                                                        translateY: 0
                                                    } : {
                                                        opacity: 0,
                                                        translateY: 100
                                                    };
                                                })(),
                                                to: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 0,
                                                        translateY: 100
                                                    } : {
                                                        opacity: 1,
                                                        translateY: 0
                                                    };
                                                })(),
                                                option: {
                                                    duration: 300
                                                }
                                            }]
                                        });
                                        component.raisedButton5Ref.animate({
                                            refName: `animated-container-view`,
                                            transitions: [{
                                                from: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 1,
                                                        translateY: 0
                                                    } : {
                                                        opacity: 0,
                                                        translateY: 50
                                                    };
                                                })(),
                                                to: (() => {
                                                    return fabAActivated ? {
                                                        opacity: 0,
                                                        translateY: 50
                                                    } : {
                                                        opacity: 1,
                                                        translateY: 0
                                                    };
                                                })(),
                                                option: {
                                                    duration: 300
                                                }
                                            }]
                                        });
                                    }
                                });
                            });
                        }}
                    >
                        <IconImage
                            exclusions = {[ `size` ]}
                            room = 'content-middle'
                            source = 'add'
                        />
                    </RaisedButton>
                </RowLayout>
                <RowLayout
                    room = 'content-bottom'
                    roomAlignment = 'center'
                    contentMiddleRoomAlignment = 'center'
                    margin = {{
                        horizontal: 10,
                        bottom: 10
                    }}
                >
                    <RowLayout
                        ref = {(componentRef) => {
                            component.popUpMenuRef = componentRef;
                        }}
                        room = 'content-middle'
                        roomAlignment = 'center'
                        contentTopRoomAlignment = 'stretch'
                        contentMiddleRoomAlignment = 'stretch'
                        contentBottomRoomAlignment = 'stretch'
                        overlay = 'translucent-outline'
                        corner = 'round'
                        color = { Theme.color.palette.pink }
                        dropShadowed = { true }
                        margin = {{
                            top: 10,
                            right: 150
                        }}
                        style = {{
                            container: {
                                width: 155,
                                height: 175,
                                transform: [{
                                    scaleX: 0
                                }, {
                                    scaleY: 0
                                }, {
                                    translateX: -80
                                }, {
                                    translateY: -150
                                }]
                            }
                        }}
                    >
                        <AreaButton
                            room = 'content-top'
                            size = 'small'
                            overlay = 'transparent'
                            margin = {{
                                horizontal: 5
                            }}
                        >
                            <SubtitleText room = 'content-left' exclusions = {[ `shade` ]} shade = { shade === `light` ? `dark` : `light` } size = 'small' > MENU 1 </SubtitleText>
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                corner = 'circular'
                                color = 'accent'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    exclusions = {[ `color` ]}
                                    source = 'favorite'
                                    color = { Theme.color.palette.red }
                                />
                            </FlatButton>
                        </AreaButton>
                        <HorizontalDivider room = 'content-top' color = { Theme.color.palette.beige }/>
                        <AreaButton
                            room = 'content-middle'
                            size = 'small'
                            overlay = 'transparent'
                            margin = {{
                                horizontal: 5
                            }}
                        >
                            <SubtitleText room = 'content-left' exclusions = {[ `shade` ]} shade = { shade === `light` ? `dark` : `light` } size = 'small' > MENU 2 </SubtitleText>
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                corner = 'circular'
                                color = 'accent'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    exclusions = {[ `color` ]}
                                    source = 'favorite'
                                    color = { Theme.color.palette.red }
                                />
                            </FlatButton>
                        </AreaButton>
                        <HorizontalDivider room = 'content-middle' color = { Theme.color.palette.beige }/>
                        <AreaButton
                            room = 'content-bottom'
                            size = 'small'
                            overlay = 'transparent'
                            margin = {{
                                horizontal: 5
                            }}
                        >
                            <SubtitleText room = 'content-left' exclusions = {[ `shade` ]} shade = { shade === `light` ? `dark` : `light` } size = 'small' > MENU 3 </SubtitleText>
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                corner = 'circular'
                                color = 'accent'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    exclusions = {[ `color` ]}
                                    source = 'favorite'
                                    color = { Theme.color.palette.red }
                                />
                            </FlatButton>
                        </AreaButton>
                    </RowLayout>
                    <RaisedButton
                        ref = {(componentRef) => {
                            component.raisedButton6Ref = componentRef;
                        }}
                        room = 'content-bottom'
                        corner = 'circular'
                        color = { fabBActivated ? Theme.color.palette.pink : `primary` }
                        size = 'large'
                        onPress = {() => {
                            component.setState((prevState) => {
                                return {
                                    fabBActivated: !prevState.fabBActivated
                                };
                            }, () => {
                                component.raisedButton6Ref.animate({
                                    refName: `animated-content-middle-room-view`,
                                    transitions: [{
                                        from: (() => {
                                            return fabBActivated ? {
                                                rotate: `-45deg`
                                            } : {
                                                rotate: `0deg`
                                            };
                                        })(),
                                        to: (() => {
                                            return fabBActivated ? {
                                                rotate: `0deg`
                                            } : {
                                                rotate: `-45deg`
                                            };
                                        })(),
                                        option: {
                                            duration: 300
                                        }
                                    }],
                                    onAnimationEnd: () => {
                                        component.popUpMenuRef.animate({
                                            refName: `animated-container-view`,
                                            transitions: [{
                                                from: (() => {
                                                    return fabBActivated ? {
                                                        opacity: 1,
                                                        scaleX: 1,
                                                        scaleY: 1,
                                                        translateX: 0,
                                                        translateY: 0
                                                    } : {
                                                        opacity: 0,
                                                        scaleX: 0,
                                                        scaleY: 0,
                                                        translateX: -80,
                                                        translateY: 150
                                                    };
                                                })(),
                                                to: (() => {
                                                    return fabBActivated ? {
                                                        opacity: 0,
                                                        scaleX: 0,
                                                        scaleY: 0,
                                                        translateX: -80,
                                                        translateY: 150
                                                    } : {
                                                        opacity: 1,
                                                        scaleX: 1,
                                                        scaleY: 1,
                                                        translateX: 0,
                                                        translateY: 0
                                                    };
                                                })(),
                                                option: {
                                                    duration: 300
                                                }
                                            }]
                                        });
                                    }
                                });
                            });
                        }}
                    >
                        <IconImage
                            exclusions = {[ `size` ]}
                            room = 'content-middle'
                            source = 'add'
                        />
                    </RaisedButton>
                </RowLayout>
            </BodyScreen>
        ]);
    }
}
