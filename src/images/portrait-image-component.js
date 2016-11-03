/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module PortraitImageComponent
 * @description - Portrait image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import PortraitImageInterface from './interfaces/portrait-image-interface';

const PortraitImageComponent = PortraitImageInterface({
    name: `portrait-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default PortraitImageComponent;
