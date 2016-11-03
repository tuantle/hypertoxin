/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module SubtitleTextComponent
 * @description - Subtitle text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import SubtitleTextInterface from './interfaces/subtitle-text-interface';

const SubtitleTextComponent = SubtitleTextInterface({
    name: `subtitle-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default SubtitleTextComponent;
