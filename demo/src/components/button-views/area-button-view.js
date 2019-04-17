'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    FlatList
} = ReactNative;

const {
    RowLayout,
    ColumnLayout,
    HeadlineText,
    TitleText,
    FlatButton,
    AreaButton,
    AvatarImage,
    IconImage
} = Ht;

export default class AreaButtonView extends React.Component {
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
        this.itemViewRefs = [];
        this.state = {
            animals: [
                {
                    key: `0`,
                    name: `Meow`,
                    avatarImage: require(`../../../assets/images/cat.png`),
                    liked: true
                },
                {
                    key: `1`,
                    name: `Mister Piggy`,
                    avatarImage: require(`../../../assets/images/pig.png`),
                    liked: true
                },
                {
                    key: `2`,
                    name: `Owlo`,
                    avatarImage: require(`../../../assets/images/owl.png`),
                    liked: false
                },
                {
                    key: `3`,
                    name: `Mr. Fantastic`,
                    avatarImage: require(`../../../assets/images/fox.png`),
                    liked: false
                },
                {
                    key: `4`,
                    name: `Gentelman Penguin`,
                    avatarImage: require(`../../../assets/images/penguin.png`),
                    liked: true
                },
                {
                    key: `5`,
                    name: `Doggo`,
                    avatarImage: require(`../../../assets/images/dog.png`),
                    liked: true
                },
                {
                    key: `6`,
                    name: `Ham`,
                    avatarImage: require(`../../../assets/images/hamster.png`),
                    liked: true
                },
                {
                    key: `7`,
                    name: `Creepy Froggy`,
                    avatarImage: require(`../../../assets/images/frog.png`),
                    liked: true
                },
                {
                    key: `8`,
                    name: `Rabbita`,
                    avatarImage: require(`../../../assets/images/rabbit.png`),
                    liked: true
                }
                // {
                //     key: `9`,
                //     name: `Romkin`,
                //     avatarImage: require(`../../../assets/images/rat.png`),
                //     liked: true
                // },
                // {
                //     key: `10`,
                //     name: `Seel`,
                //     avatarImage: require(`../../../assets/images/seal.png`),
                //     liked: true
                // },
                // {
                //     key: `11`,
                //     name: `Stinky`,
                //     avatarImage: require(`../../../assets/images/skunk.png`),
                //     liked: true
                // },
                // {
                //     key: `12`,
                //     name: `Slowa`,
                //     avatarImage: require(`../../../assets/images/sloth.png`),
                //     liked: true
                // },
                // {
                //     key: `13`,
                //     name: `Kula`,
                //     avatarImage: require(`../../../assets/images/kuala.png`),
                //     liked: true
                // },
                // {
                //     key: `14`,
                //     name: `Howler`,
                //     avatarImage: require(`../../../assets/images/wolf.png`),
                //     liked: true
                // },
                // {
                //     key: `15`,
                //     name: `Sratchy`,
                //     avatarImage: require(`../../../assets/images/monkey.png`),
                //     liked: true
                // }
            ]
        };
    }
    render () {
        const component = this;
        const {
            Theme,
            shade
        } = component.props;
        const {
            animals
        } = component.state;

        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'center'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText room = 'content-top' > Area Buttons </HeadlineText>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    scrollable = { true }
                >
                    <FlatList
                        room = 'content-middle'
                        data = { animals }
                        renderItem = {(listData) => {
                            const animal = listData.item;
                            return (
                                <AreaButton
                                    ref = {(componentRef) => {
                                        component.itemViewRefs.push(componentRef);
                                    }}
                                    shade = { shade }
                                >
                                    <ColumnLayout room = 'content-left' roomAlignment = 'center' >
                                        <AvatarImage
                                            room = 'content-left'
                                            source = { animal.avatarImage }
                                            dropShadowed = { false }
                                        />
                                        <TitleText
                                            room = 'content-right'
                                            size = 'small'
                                            indentation = { 20 }
                                        >{ animal.name }</TitleText>
                                    </ColumnLayout>
                                    <FlatButton
                                        room = 'content-right'
                                        overlay = 'transparent'
                                        corner = 'circular'
                                        color = { animal.liked ? Theme.color.palette.red : Theme.color.palette.grey }
                                        onPress = {() => {
                                            component.setState((prevState) => {
                                                return {
                                                    animals: prevState.animals.map((_animal) => {
                                                        _animal.liked = animal.name === _animal.name ? !_animal.liked : _animal.liked;
                                                        return _animal;
                                                    })
                                                };
                                            });
                                        }}
                                    >
                                        <IconImage
                                            room = 'content-middle'
                                            source = { animal.liked ? `favorite` : `favorite-outline` }
                                        />
                                    </FlatButton>
                                </AreaButton>
                            );
                        }}
                    />
                </RowLayout>
            </RowLayout>
        );
    }
}
