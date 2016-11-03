/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module ItemViewComponent
 * @description - Item view component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import ItemViewInterface from './interfaces/item-view-interface';

const ItemViewComponent = ItemViewInterface({
    name: `item-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default ItemViewComponent;
