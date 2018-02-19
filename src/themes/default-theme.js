/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @description - Hypertoxin default theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import fontStyleTemplate from './style-templates/font-style-template';

import dropShadowStyleTemplate from './style-templates/drop-shadow-style-template';

// import toxinIconPreset from './icons/toxin-preset';

import toxinPalette from './palettes/toxin-palette';

import colorTheme from './color-theme.js';

import buttonTheme from './button-theme.js';

import fieldTheme from './field-theme.js';

import miscTheme from './misc-theme.js';

import textTheme from './text-theme.js';

import viewTheme from './view-theme.js';

import imageTheme from './image-theme.js';

export default {
    palette: toxinPalette,
    icon: {},
    // icon: toxinIconPreset,
    font: fontStyleTemplate,
    general: {
        frostLevel: 25,
        dropShadow: dropShadowStyleTemplate,
        color: colorTheme
    },
    misc: miscTheme,
    field: fieldTheme,
    button: buttonTheme,
    text: textTheme,
    view: viewTheme,
    image: imageTheme
};
