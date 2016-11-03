/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module FlatButtonComponent
 * @description - Flat button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load flat button interface */
import FlatButtonInterface from './interfaces/flat-button-interface';

const FlatButtonComponent = FlatButtonInterface({
    name: `flat-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default FlatButtonComponent;
