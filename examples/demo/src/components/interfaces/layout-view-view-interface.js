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
 * @module LayoutViewViewInterface
 * @description - Hypertoxin demo client-native layout view view interface.
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
    LayoutView
} = Ht.View;

const {
    FlatButton
} = Ht.Button;

const {
    IconImage
} = Ht.Image;

const {
    HeadlineText
} = Ht.Text;

const Divider = Ht.Divider;

const LayoutViewViewInterface = Hf.Interface.augment({
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
    renderSmallColorSquare: function renderColorSquare (key, color) {
        return (
            <View
                key = { key }
                style = {{
                    ...Ht.Theme.general.dropShadow.shallow,
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    margin: 9,
                    backgroundColor: color
                }}
            />
        );
    },
    renderNormalColorSquare: function renderColorSquare (key, color) {
        return (
            <View
                key = { key }
                style = {{
                    ...Ht.Theme.general.dropShadow.shallow,
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    margin: 9,
                    backgroundColor: color
                }}
            />
        );
    },
    renderLargeColorSquare: function renderColorSquare (key, color) {
        return (
            <View
                key = { key }
                style = {{
                    ...Ht.Theme.general.dropShadow.shallow,
                    width: 75,
                    height: 75,
                    borderRadius: 4,
                    margin: 9,
                    backgroundColor: color
                }}
            />
        );
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
                    label = 'LAYOUT VIEW'
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
                    <HeadlineText> Horizontal Layouts </HeadlineText>
                    <LayoutView
                        orientation = 'vertical'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                    >
                        <LayoutView
                            orientation = 'horizontal'
                            alignment = 'start'
                            selfAlignment = 'stretch'
                        >
                            {[
                                component.renderNormalColorSquare(1, Ht.Theme.palette.red),
                                component.renderNormalColorSquare(2, Ht.Theme.palette.green),
                                component.renderNormalColorSquare(3, Ht.Theme.palette.blue)
                            ]}
                        </LayoutView>
                        <LayoutView
                            orientation = 'horizontal'
                            alignment = 'center'
                            selfAlignment = 'stretch'
                        >
                            {[
                                component.renderSmallColorSquare(1, Ht.Theme.palette.red),
                                component.renderNormalColorSquare(2, Ht.Theme.palette.green),
                                component.renderLargeColorSquare(3, Ht.Theme.palette.blue)
                            ]}
                        </LayoutView>
                        <LayoutView
                            orientation = 'horizontal'
                            alignment = 'end'
                            selfAlignment = 'stretch'
                        >
                            {[
                                component.renderNormalColorSquare(1, Ht.Theme.palette.red),
                                component.renderNormalColorSquare(2, Ht.Theme.palette.green),
                                component.renderNormalColorSquare(3, Ht.Theme.palette.blue)
                            ]}
                        </LayoutView>
                    </LayoutView>
                    <Divider/>
                    <HeadlineText> Vertical Layouts </HeadlineText>
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                    >
                        <LayoutView
                            orientation = 'vertical'
                            alignment = 'center'
                            selfAlignment = 'stretch'
                        >
                            {[
                                component.renderSmallColorSquare(1, Ht.Theme.palette.red),
                                // component.renderColorSquare(2, Ht.Theme.palette.green),
                                component.renderLargeColorSquare(3, Ht.Theme.palette.blue)
                            ]}
                        </LayoutView>
                    </LayoutView>
                </BodyView>
            </ScreenView>
        );
    }
});
export default LayoutViewViewInterface;
