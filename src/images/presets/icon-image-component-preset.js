/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module IconImageComponentPreset
 * @description - A set of predefined commonly use icon image components.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

/* load icon image interface */
import IconImageInterface from '../interfaces/icon-image-interface';

/* load icons */
import checkIcon from '../../../assets/icons/png/check-3x.png';
import expandIcon from '../../../assets/icons/png/expand-3x.png';
import collapseIcon from '../../../assets/icons/png/collapse-3x.png';

const IconImageComponentPreset = {
    CheckIconImage: IconImageInterface({
        name: `check-icon-image`,
        source: checkIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    ExpandIconImage: IconImageInterface({
        name: `expand-icon-image`,
        source: expandIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent(),
    CollapseIconImage: IconImageInterface({
        name: `collaspe-icon-image`,
        source: collapseIcon
    }).registerComponentLib({
        React,
        ReactNative
    }).toPureComponent()
};

export default IconImageComponentPreset;
