/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module EmailFieldComponent
 * @description - Email field component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load email field interface */
import EmailFieldInterface from './interfaces/email-field-interface';

const EmailFieldComponent = EmailFieldInterface({
    name: `email-field`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default EmailFieldComponent;
