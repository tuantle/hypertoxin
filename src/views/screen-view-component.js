/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module ScreenViewComponent
 * @description - Screen view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import ScreenViewInterface from './interfaces/screen-view-interface';

const ScreenViewComponent = ScreenViewInterface({
    name: `screen-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default ScreenViewComponent;
