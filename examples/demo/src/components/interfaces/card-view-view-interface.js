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
 * @module CardViewViewInterface
 * @description - Hypertoxin demo client-native card view view interface.
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
    View
} = ReactNative;

const {
    ScreenView,
    HeaderView,
    BodyView,
    LayoutView,
    CardView
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
    TitleText,
    SubtitleText,
    InfoText
} = Ht.Text;

const {
    Divider
} = Ht.Misc;

const catAvatarImage = require(`../../../assets/images/cat.png`);

const CardViewViewInterface = Hf.Interface.augment({
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
                    label = 'Card View'
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
                    alignment = 'center'
                    style = {{
                        paddingTop: 15,
                        paddingHorizontal: 10
                    }}
                >
                    <HeadlineText> Profile Cards </HeadlineText>
                    <Divider/>
                    <CardView overlay = 'opaque' >
                        <LayoutView
                            room = 'content-left'
                            overlay = 'transparent'
                            orientation = 'vertical'
                            alignment = 'center'
                            selfAlignment = 'start'
                        >
                            <AvatarImage source = { catAvatarImage }/>
                            <TitleText
                                size = 'small'
                                indentation = { 10 }
                            > Cat May </TitleText>
                        </LayoutView>
                        <TitleText
                            room = 'content-right'
                            size = 'small'
                            color = { Ht.Theme.palette.yellow }
                            indentation = { 10 }
                        > ★★★★★ </TitleText>
                        <View
                            room = 'media'
                            style = {{
                                flexDirection: `column`,
                                alignItems: `stretch`,
                                justifyContent: `center`,
                                height: 100,
                                backgroundColor: `red`
                            }}
                        />
                        <LayoutView
                            room = 'content-center'
                            overlay = 'transparent'
                            orientation = 'horizontal'
                            alignment = 'start'
                            selfAlignment = 'start'
                        >
                            <SubtitleText
                                size = 'small'
                                indentation = { 5 }
                            > Bio: </SubtitleText>
                            <InfoText
                                size = 'small'
                                indentation = { 20 }
                            > Supper lazy and good for nothing. Cute tho! </InfoText>
                        </LayoutView>
                        <FlatButton room = 'action-left' label = 'DISLIKE'/>
                        <FlatButton room = 'action-right' label = 'LIKE'/>
                    </CardView>
                </BodyView>
            </ScreenView>
        );
    }
});
export default CardViewViewInterface;
