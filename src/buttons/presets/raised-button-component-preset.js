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
 * @module RaisedButtonComponentPreset
 * @description - A set of predefined commonly use raised button components.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load raised button interface */
import RaisedButtonInterface from '../interfaces/raised-button-interface';

/* load button icons */
import coypyrightIcon from '../../../assets/icons/png/copyright-3x.png';
import profileIcon from '../../../assets/icons/png/profile-3x.png';
import settingIcon from '../../../assets/icons/png/setting-3x.png';
import cameraIcon from '../../../assets/icons/png/camera-3x.png';
import signoutIcon from '../../../assets/icons/png/signout-3x.png';

import facebookIcon from '../../../assets/icons/base64/socials/facebook-3x';
import googlePlusIcon from '../../../assets/icons/base64/socials/google-plus-3x';
import twitterIcon from '../../../assets/icons/base64/socials/twitter-3x';

const RaisedButtonComponentPreset = {
    CopyrightButton: RaisedButtonInterface({
        name: `copyright-button`,
        icon: coypyrightIcon,
        label: `Copy Right`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    ProfileButton: RaisedButtonInterface({
        name: `profile-button`,
        icon: profileIcon,
        label: `Profile`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CameraButton: RaisedButtonInterface({
        name: `camera-button`,
        icon: cameraIcon,
        label: `Camera`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    SettingButton: RaisedButtonInterface({
        name: `setting-button`,
        icon: settingIcon,
        label: `Setting`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    FacebookSigninButton: RaisedButtonInterface({
        name: `facebook-signin-button`,
        icon: facebookIcon,
        label: `Sign In`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    GooglePlusSigninButton: RaisedButtonInterface({
        name: `google-plus-signin-button`,
        icon: googlePlusIcon,
        label: `Sign In`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    TwiiterSigninButton: RaisedButtonInterface({
        name: `twitter-signin-button`,
        icon: twitterIcon,
        label: `Sign In`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    SignoutButton: RaisedButtonInterface({
        name: `signout-button`,
        icon: signoutIcon,
        label: `Sign Out`
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent()
};

export default RaisedButtonComponentPreset;
