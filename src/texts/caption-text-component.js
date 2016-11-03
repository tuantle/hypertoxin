/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module CaptionTextComponent
 * @description - Caption text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import CaptionTextInterface from './interfaces/caption-text-interface';

const CaptionTextComponent = CaptionTextInterface({
    name: `caption-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default CaptionTextComponent;
