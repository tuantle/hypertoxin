/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @description - Dropped shadow style template.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */

'use strict'; //eslint-disable-line

import materialPalette from '../palettes/material-palette';

export default { // eslint-disable-line
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowColor: materialPalette.black
};
