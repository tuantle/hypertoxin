/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module ItemViewViewInterface
 * @description - Hypertoxin demo client-native item view view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import EVENT from '../events/view-event'; // eslint-disable-line

const {
    StatusBar,
    FlatList
} = ReactNative;

const {
    ScreenView,
    HeaderView,
    BodyView,
    LayoutView,
    ItemView
} = Ht.View;

const {
    FlatButton
} = Ht.Button;

const {
    AvatarImage,
    IconImage
} = Ht.Image;

const {
    HeadlineText,
    TitleText
} = Ht.Text;

const Divider = Ht.Divider;

const animals = [
    {
        key: 0,
        name: `Cat May`,
        avatarImage: require(`../../../assets/images/cat.png`),
        liked: true
    },
    {
        key: 1,
        name: `Mister Piggy`,
        avatarImage: require(`../../../assets/images/pig.png`),
        liked: true
    },
    {
        key: 2,
        name: `Owlo`,
        avatarImage: require(`../../../assets/images/owl.png`),
        liked: false
    },
    {
        key: 3,
        name: `Mr. Fantastic`,
        avatarImage: require(`../../../assets/images/fox.png`),
        liked: false
    },
    {
        key: 4,
        name: `Gentelman Penguin`,
        avatarImage: require(`../../../assets/images/penguin.png`),
        liked: true
    },
    {
        key: 5,
        name: `Doggo`,
        avatarImage: require(`../../../assets/images/dog.png`),
        liked: true
    },
    {
        key: 6,
        name: `Ham`,
        avatarImage: require(`../../../assets/images/hamster.png`),
        liked: true
    },
    {
        key: 7,
        name: `Creepy Froggy`,
        avatarImage: require(`../../../assets/images/frog.png`),
        liked: true
    },
    {
        key: 8,
        name: `Rabbita`,
        avatarImage: require(`../../../assets/images/rabbit.png`),
        liked: true
    },
    {
        key: 9,
        name: `Romkin`,
        avatarImage: require(`../../../assets/images/rat.png`),
        liked: true
    },
    {
        key: 10,
        name: `Seel`,
        avatarImage: require(`../../../assets/images/seal.png`),
        liked: true
    },
    {
        key: 11,
        name: `Stinky`,
        avatarImage: require(`../../../assets/images/skunk.png`),
        liked: true
    },
    {
        key: 12,
        name: `Slowa`,
        avatarImage: require(`../../../assets/images/sloth.png`),
        liked: true
    },
    {
        key: 13,
        name: `Kula`,
        avatarImage: require(`../../../assets/images/kuala.png`),
        liked: true
    },
    {
        key: 14,
        name: `Howler`,
        avatarImage: require(`../../../assets/images/wolf.png`),
        liked: true
    },
    {
        key: 15,
        name: `Sratchy`,
        avatarImage: require(`../../../assets/images/monkey.png`),
        liked: true
    }
];

const ItemViewViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite,
        Ht.ViewComposite.HeaderViewSlideAndFadeAnimation
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ]
        }
    },
    setup: function setup (done) {
        done();
    },
    onPressGoBackButton: function onPressGoBackButton () {
        const component = this;
        const {
            navigation
        } = component.props;

        setTimeout(navigation.goBack, 200);
        component.animateHeaderViewExit(100);
    },
    render: function render () {
        const component = this;
        const {
            shade
        } = component.props;

        return (
            <ScreenView shade = { shade }>
                <StatusBar
                    barStyle = { shade === `light` ? `dark-content` : `light-content` }
                    networkActivityIndicatorVisible = { false }
                />
                <HeaderView
                    cId = 'h0'
                    ref = { component.assignComponentRef(`animated-header`) }
                    label = 'ITEM VIEW'
                >
                    <FlatButton
                        room = 'action-left'
                        overlay = 'transparent'
                        corner = 'round50'
                        onPress = { component.onPressGoBackButton }
                    >
                        <IconImage
                            room = 'content-center'
                            size = 'large'
                            source = 'go-back'
                        />
                    </FlatButton>
                </HeaderView>
                <BodyView
                    ref = { component.assignComponentRef(`body-view`) }
                    alignment = 'stretch'
                    scrollable = { true }
                    onScroll = {(event, scrollDirection) => {
                        const [ animatedHeader ] = component.lookupComponentRefs(`animated-header`);

                        if (scrollDirection === -1) {
                            animatedHeader.collapse();
                        } else {
                            animatedHeader.expand();
                        }
                    }}
                    style = {{
                        paddingTop: 15,
                        paddingHorizontal: 10
                    }}
                >
                    <HeadlineText> Default List of Item Views </HeadlineText>
                    <Divider/>
                    <FlatList
                        data = { animals }
                        renderItem = {(listData) => {
                            const animal = listData.item;

                            return (
                                <ItemView shade = { shade }>
                                    <LayoutView
                                        room = 'content-left'
                                        overlay = 'transparent'
                                        orientation = 'vertical'
                                        alignment = 'center'
                                        selfAlignment = 'start'
                                    >
                                        <AvatarImage source = { animal.avatarImage }/>
                                        <TitleText
                                            size = 'small'
                                            indentation = { 20 }
                                        >{ animal.name }</TitleText>
                                    </LayoutView>
                                    <FlatButton
                                        room = 'action-right'
                                        overlay = 'transparent'
                                        corner = 'round50'
                                    >
                                        <IconImage
                                            room = 'content-center'
                                            source = { animal.liked ? `favorite` : `favorite-outline` }
                                            size = 'small'
                                        />
                                    </FlatButton>
                                </ItemView>
                            );
                        }}
                        style = {{
                            flexDirection: `column`,
                            marginTop: 50,
                            backgroundColor: `transparent`
                        }}
                    />
                </BodyView>
            </ScreenView>
        );
    }
});
export default ItemViewViewInterface;
