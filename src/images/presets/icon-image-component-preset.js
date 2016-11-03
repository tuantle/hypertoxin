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
 * @module IconImageComponentPreset
 * @description - A set of predefined commonly use icon image components.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load icon image interface */
import IconImageInterface from '../interfaces/icon-image-interface';

/* load icons */
import checkIcon from '../../../assets/icons/png/check-3x.png';
import expandIcon from '../../../assets/icons/png/expand-3x.png';
import collapseIcon from '../../../assets/icons/png/collapse-3x.png';

import facebookIcon from '../../../assets/icons/base64/socials/facebook-3x';
import googlePlusIcon from '../../../assets/icons/base64/socials/google-plus-3x';
import twitterIcon from '../../../assets/icons/base64/socials/twitter-3x';

const IconImageComponentPreset = {
    CheckIconImage: IconImageInterface({
        name: `check-icon-image`,
        source: checkIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    ExpandIconImage: IconImageInterface({
        name: `expand-icon-image`,
        source: expandIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CollapseIconImage: IconImageInterface({
        name: `collaspe-icon-image`,
        source: collapseIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    FacebookIconImage: IconImageInterface({
        name: `facebook-icon-image`,
        source: facebookIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    GooglePlusIconImage: IconImageInterface({
        name: `google-plus-icon-image`,
        source: googlePlusIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    TwitterIconImage: IconImageInterface({
        name: `twitter-icon-image`,
        source: twitterIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent()
};

export default IconImageComponentPreset;
