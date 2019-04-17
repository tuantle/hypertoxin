'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions,
    FlatList
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    AvatarImage,
    CoverImage,
    IconImage,
    HeadlineText,
    InfoText,
    CaptionText,
    HorizontalDivider
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const GALLERY_IMAGES = [
    {
        key: `0`,
        name: `Cat May`,
        date: `02/08/2019`,
        avatarImage: require(`../../../assets/images/cat.png`),
        galleryImage: require(`../../../assets/gallery/image-1.png`)
    },
    {
        key: `1`,
        name: `Mister Piggy`,
        date: `12/06/2018`,
        avatarImage: require(`../../../assets/images/pig.png`),
        galleryImage: require(`../../../assets/gallery/image-2.png`)
    },
    {
        key: `2`,
        name: `Owlo`,
        date: `11/23/2018`,
        avatarImage: require(`../../../assets/images/owl.png`),
        galleryImage: require(`../../../assets/gallery/image-3.png`)
    },
    {
        key: `3`,
        name: `Mr. Fantastic`,
        date: `05/01/2014`,
        avatarImage: require(`../../../assets/images/fox.png`),
        galleryImage: require(`../../../assets/gallery/image-4.png`)
    },
    {
        key: `4`,
        name: `Gentelman Penguin`,
        date: `19/08/2018`,
        avatarImage: require(`../../../assets/images/penguin.png`),
        galleryImage: require(`../../../assets/gallery/image-5.png`)
    },
    {
        key: `5`,
        name: `Doggo`,
        date: `07/06/2018`,
        avatarImage: require(`../../../assets/images/dog.png`),
        galleryImage: require(`../../../assets/gallery/image-6.png`)
    },
    {
        key: `6`,
        name: `Ham`,
        date: `09/03/2018`,
        avatarImage: require(`../../../assets/images/hamster.png`),
        galleryImage: require(`../../../assets/gallery/image-7.png`)
    },
    {
        key: `7`,
        name: `Creepy Froggy`,
        date: `19/08/2018`,
        avatarImage: require(`../../../assets/images/frog.png`),
        galleryImage: require(`../../../assets/gallery/image-8.png`)
    },
    {
        key: `8`,
        name: `Rabbita`,
        date: `14/04/2012`,
        avatarImage: require(`../../../assets/images/rabbit.png`),
        galleryImage: require(`../../../assets/gallery/image-9.png`)
    }
];

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

        this.componentRefCache = {};
        this.state = {
            disableResetAnimationButton: false
        };
    }
    componentDidMount () {
        const component = this;

        Object.values(component.componentRefCache).forEach((componentRef, index) => {
            componentRef.animate(`animated-container-view`, {
                from: {
                    translateX: -DEVICE_WIDTH
                },
                to: {
                    translateX: 0
                },
                option: {
                    duration: 500,
                    delay: (index + 1) * 50
                }
            });
        });
    }
    render () {
        const component = this;
        const {
            Theme,
            shade,
            navigation
        } = component.props;
        const {
            disableResetAnimationButton
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                size = 'small'
                shade = { shade }
                label = 'EXAMPLE 3 ANIMATION'
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
                style = {{
                    container: {
                        paddingTop: 80
                    }
                }}
            >
                <HeadlineText room = 'content-top' > Animated Image Gallery Example </HeadlineText>
                <FlatButton
                    room = 'content-top'
                    overlay = 'transparent'
                    size = 'small'
                    label = 'RESET ANIMATION'
                    disabled = { disableResetAnimationButton }
                    onPress = {() => {
                        component.setState(() => {
                            return {
                                disableResetAnimationButton: true
                            };
                        }, () => {
                            Object.values(component.componentRefCache).forEach((componentRef, index) => {
                                componentRef.animate(`animated-container-view`, {
                                    from: {
                                        translateX: 0
                                    },
                                    to: {
                                        translateX: -DEVICE_WIDTH
                                    },
                                    option: {
                                        duration: 500,
                                        delay: (index + 1) * 50
                                    }
                                }, () => null, () => {
                                    componentRef.animate(`animated-container-view`, {
                                        from: {
                                            translateX: -DEVICE_WIDTH
                                        },
                                        to: {
                                            translateX: 0
                                        },
                                        option: {
                                            duration: 500,
                                            delay: (index + 1) * 50 + 1000
                                        }
                                    }, () => null, () => {
                                        component.setState(() => {
                                            return {
                                                disableResetAnimationButton: false
                                            };
                                        });
                                    });
                                });
                            });
                        });
                    }}
                />
                <FlatList
                    room = 'content-middle'
                    data = { GALLERY_IMAGES }
                    extraData = { component.props }
                    renderItem = {({
                        item,
                        index
                    }) => {
                        return ([
                        ]);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    style = {{
                        flexShrink: 1,
                        width: DEVICE_WIDTH,
                        backgroundColor: shade === `light` ? Theme.color.palette.white : Theme.color.palette.black
                    }}
                />
            </BodyScreen>
        ]);
    }
}
