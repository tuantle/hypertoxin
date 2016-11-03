/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module DividerViewComponent
 * @description - A divider view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import DividerViewInterface from './interfaces/divider-view-interface';

const DividerViewComponent = DividerViewInterface({
    name: `divider-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default DividerViewComponent;
