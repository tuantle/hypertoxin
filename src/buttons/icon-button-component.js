/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module IconButtonComponent
 * @description - Icon button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load icon button interface */
import IconButtonInterface from './interfaces/icon-button-interface';

const IconButtonComponent = IconButtonInterface({
    name: `icon-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default IconButtonComponent;
