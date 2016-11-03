/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module WallpaperImageComponent
 * @description - Wallpaper image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native';

import WallpaperImageInterface from './interfaces/wallpaper-image-interface';

const WallpaperImageComponent = WallpaperImageInterface({
    name: `wallpaper-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default WallpaperImageComponent;
