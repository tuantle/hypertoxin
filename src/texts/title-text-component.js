/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module TitleTextComponent
 * @description - Title text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import TitleTextInterface from './interfaces/title-text-interface';

const TitleTextComponent = TitleTextInterface({
    name: `title-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default TitleTextComponent;
