/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module CardViewComponent
 * @description - Card view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import CardViewInterface from './interfaces/card-view-interface';

const CardViewComponent = CardViewInterface({
    name: `card-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default CardViewComponent;
