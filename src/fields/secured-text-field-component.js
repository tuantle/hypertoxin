/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module SecuredTextFieldComponent
 * @description - Secured text field component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load secure text field interface */
import SecuredTextFieldInterface from './interfaces/secured-text-field-interface';

const SecuredTextFieldComponent = SecuredTextFieldInterface({
    name: `secure-text-field`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default SecuredTextFieldComponent;
