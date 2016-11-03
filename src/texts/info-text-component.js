/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module InfoTextComponent
 * @description - Info text component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import InfoTextInterface from './interfaces/info-text-interface';

const InfoTextComponent = InfoTextInterface({
    name: `info-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default InfoTextComponent;
