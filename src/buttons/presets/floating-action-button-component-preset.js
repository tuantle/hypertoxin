/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module FloatingActionButtonComponentPreset
 * @description - A set of predefined commonly use floating action button components.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load floating action button interface */
import FloatingActionButtonInterface from '../interfaces/floating-action-button-interface';

/* load button icons */
import editdIcon from '../../../assets/icons/png/edit-3x.png';

const FloatingActionButtonComponentPreset = {
    EditButton: FloatingActionButtonInterface({
        name: `edit-button`,
        icon: editdIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent()
};

export default FloatingActionButtonComponentPreset;
