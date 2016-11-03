/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module IconImageComponent
 * @description - Icon image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import IconImageInterface from './interfaces/icon-image-interface';

const IconImageComponent = IconImageInterface({
    name: `icon-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default IconImageComponent;
