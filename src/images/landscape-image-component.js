/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module LandscapeImageComponent
 * @description - Landscape image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import LandscapeImageInterface from './interfaces/landscape-image-interface';

const LandscapeImageComponent = LandscapeImageInterface({
    name: `landscape-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default LandscapeImageComponent;
