/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module TextFieldComponent
 * @description - Text field component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load text field interface */
import TextFieldInterface from './interfaces/text-field-interface';

const TextFieldComponent = TextFieldInterface({
    name: `text-field`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default TextFieldComponent;
