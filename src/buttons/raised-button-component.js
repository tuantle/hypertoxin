/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module RaisedButtonComponent
 * @description - Raised button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load raised button interface */
import RaisedButtonInterface from './interfaces/raised-button-interface';

const RaisedButtonComponent = RaisedButtonInterface({
    name: `raised-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default RaisedButtonComponent;
