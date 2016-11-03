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
 * @module IconButtonComponentPreset
 * @description - A set of predefined commonly use icon button components.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load icon button interface */
import IconButtonInterface from '../interfaces/icon-button-interface';

/* load button icons */
import menuIcon from '../../../assets/icons/png/menu-3x.png';
import closeIcon from '../../../assets/icons/png/close-3x.png';
import goBackIcon from '../../../assets/icons/png/back-3x.png';
import goForwardIcon from '../../../assets/icons/png/forward-3x.png';
import addIcon from '../../../assets/icons/png/add-3x.png';
import deleteIcon from '../../../assets/icons/png/delete-3x.png';
import editdIcon from '../../../assets/icons/png/edit-3x.png';
import checkIcon from '../../../assets/icons/png/check-3x.png';
import tagIcon from '../../../assets/icons/png/tag-3x.png';
import searchIcon from '../../../assets/icons/png/search-3x.png';
import infoIcon from '../../../assets/icons/png/info-3x.png';
import socialShareIcon from '../../../assets/icons/png/social-share-3x.png';
import cameraIcon from '../../../assets/icons/png/camera-3x.png';

import facebookIcon from '../../../assets/icons/base64/socials/facebook-3x';
import googlePlusIcon from '../../../assets/icons/base64/socials/google-plus-3x';
import twitterIcon from '../../../assets/icons/base64/socials/twitter-3x';

const IconButtonComponentPreset = {
    MenuButton: IconButtonInterface({
        name: `menu-button`,
        icon: menuIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CloseButton: IconButtonInterface({
        name: `close-button`,
        icon: closeIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    GoBackButton: IconButtonInterface({
        name: `go-back-button`,
        icon: goBackIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    GoForwardButton: IconButtonInterface({
        name: `go-forward-button`,
        icon: goForwardIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    AddButton: IconButtonInterface({
        name: `add-button`,
        icon: addIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    DeleteButton: IconButtonInterface({
        name: `delete-button`,
        icon: deleteIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    EditButton: IconButtonInterface({
        name: `edit-button`,
        icon: editdIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CheckButton: IconButtonInterface({
        name: `check-button`,
        icon: checkIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    TagButton: IconButtonInterface({
        name: `tag-button`,
        icon: tagIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    SearchButton: IconButtonInterface({
        name: `search-button`,
        icon: searchIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    InfoButton: IconButtonInterface({
        name: `info-button`,
        icon: infoIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    SocialShareButton: IconButtonInterface({
        name: `social-share-button`,
        icon: socialShareIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CameraButton: IconButtonInterface({
        name: `camera-button`,
        icon: cameraIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    FacebookShareButton: IconButtonInterface({
        name: `facebook-share-button`,
        icon: facebookIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    GooglePlusShareButton: IconButtonInterface({
        name: `google-plus-share-button`,
        icon: googlePlusIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    TwitterShareButton: IconButtonInterface({
        name: `twitter-share-button`,
        icon: twitterIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent()
};

export default IconButtonComponentPreset;
