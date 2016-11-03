/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module AvatarImageComponent
 * @description - Avatar image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import AvatarImageInterface from './interfaces/avatar-image-interface';

const AvatarImageComponent = AvatarImageInterface({
    name: `avatar-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default AvatarImageComponent;
