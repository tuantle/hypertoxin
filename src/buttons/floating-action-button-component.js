/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module FloatingActionButtonComponent
 * @description - Floating action button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load fliating action button interface */
import FloatingActionButtonInterface from './interfaces/floating-action-button-interface';

const FloatingActionButtonComponent = FloatingActionButtonInterface({
    name: `floating-action-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default FloatingActionButtonComponent;
