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
 * @module HeaderViewViewInterface
 * @description - Hypertoxin demo client-native header view view interface.
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
    SegmentedControlIOS,
    StatusBar
} = ReactNative;

const {
    ScreenView,
    HeaderView,
    BodyView
} = Ht.View;

const {
    FlatButton
} = Ht.Button;

const {
    IconImage
} = Ht.Image;

const HeaderViewViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite,
        Ht.ViewComposite.HeaderViewSlideAndFadeAnimation
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ]
        },
        header: {
            size: `normal`,
            oneOf: [ `small`, `normal`, `large` ]
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
            shade,
            header
        } = component.props;
        let selectedIndex;
        let buttonIconSize;

        switch (header.size) { // eslint-disable-line
        case `small`:
            selectedIndex = 0;
            buttonIconSize = `small`;
            break;
        case `normal`:
            selectedIndex = 1;
            buttonIconSize = `large`;
            break;
        case `large`:
            selectedIndex = 2;
            buttonIconSize = `large`;
            break;
        }

        return (
            <ScreenView shade = { shade }>
                <StatusBar
                    barStyle = { shade === `light` ? `dark-content` : `light-content` }
                    networkActivityIndicatorVisible = { false }
                />
                <HeaderView
                    cId = 'h0'
                    ref = { component.assignComponentRef(`animated-header`) }
                    size = { header.size }
                    label = 'HEADER VIEW'
                >
                    <FlatButton
                        room = 'action-left'
                        overlay = 'transparent'
                        corner = 'round50'
                        onPress = { component.onPressGoBackButton }
                    >
                        <IconImage
                            room = 'content-center'
                            size = { buttonIconSize }
                            source = 'go-back'
                        />
                    </FlatButton>
                </HeaderView>
                <BodyView
                    alignment = 'stretch'
                    style = {{
                        paddingTop: 15,
                        paddingHorizontal: 10
                    }}
                >
                    <SegmentedControlIOS
                        values = {[
                            `SMALL`, `NORMAL`, `LARGE`
                        ]}
                        selectedIndex = { selectedIndex }
                        onChange = {(event) => {
                            switch (event.nativeEvent.selectedSegmentIndex) { // eslint-disable-line
                            case 0:
                                component.outgoing(EVENT.ON.CHANGE_HEADER_SIZE).emit(() => `small`);
                                break;
                            case 1:
                                component.outgoing(EVENT.ON.CHANGE_HEADER_SIZE).emit(() => `normal`);
                                break;
                            case 2:
                                component.outgoing(EVENT.ON.CHANGE_HEADER_SIZE).emit(() => `large`);
                                break;
                            }
                        }}
                    />
                </BodyView>
            </ScreenView>
        );
    }
});
export default HeaderViewViewInterface;
