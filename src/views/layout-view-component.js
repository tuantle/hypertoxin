/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module LayoutViewComponent
 * @description - Layout view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import LayoutViewInterface from './interfaces/layout-view-interface';

const LayoutViewComponent = LayoutViewInterface({
    name: `layout-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default LayoutViewComponent;
