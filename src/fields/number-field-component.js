/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module NumberFieldComponent
 * @description - Number field component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load number field interface */
import NumberFieldInterface from './interfaces/number-field-interface';

const NumberFieldComponent = NumberFieldInterface({
    name: `number-field`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default NumberFieldComponent;
