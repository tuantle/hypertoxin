/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module BodyViewComponent
 * @description - Body view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import BodyViewInterface from './interfaces/body-view-interface';

const BodyViewComponent = BodyViewInterface({
    name: `body-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default BodyViewComponent;
