/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module SquareImageComponent
 * @description - Square image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import SquareImageInterface from './interfaces/square-image-interface';

const SquareImageComponent = SquareImageInterface({
    name: `square-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default SquareImageComponent;
