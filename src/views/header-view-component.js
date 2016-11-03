/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module HeaderViewComponent
 * @description - Header view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import HeaderViewInterface from './interfaces/header-view-interface';

const HeaderViewComponent = HeaderViewInterface({
    name: `header-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default HeaderViewComponent;
