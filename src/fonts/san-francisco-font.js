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
 * @description - Default font (using default San Francisco for iOS).
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *
 * @flow
 *
 */

'use strict'; //eslint-disable-line

import createFontTemplate from './templates/create-font-template';

const SanFranciscoFont = createFontTemplate({
    fontFamily: `System`
    // fontWeights: [],
    // fontScalings: []
});

export default SanFranciscoFont;
