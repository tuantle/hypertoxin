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
 * @description - Hypertoxin default color theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import toxinPalette from './palettes/toxin-palette';

export default {
    opacity: `dd`,
    dark: {
        default: toxinPalette.white,
        accent: toxinPalette.orange,
        primary: toxinPalette.blue,
        secondary: toxinPalette.pink,
        disabled: toxinPalette.deepGrey
    },
    light: {
        default: toxinPalette.black,
        accent: toxinPalette.orange,
        primary: toxinPalette.blue,
        secondary: toxinPalette.pink,
        disabled: toxinPalette.lightGrey
    }
};