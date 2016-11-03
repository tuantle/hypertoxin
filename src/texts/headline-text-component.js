/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module HeadLineTextComponent
 * @description - Headline text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import HeadLineTextInterface from './interfaces/headline-text-interface';

const HeadLineTextComponent = HeadLineTextInterface({
    name: `headline-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default HeadLineTextComponent;
