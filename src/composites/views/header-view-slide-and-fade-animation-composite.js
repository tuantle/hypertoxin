/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module HeaderViewSlideAndFadeAnimationComposite
 * @description - HeaderView slide and fade animation composite.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

const HeaderViewSlideAndFadeAnimationComposite = Hf.Composite({
    template: {
        /**
         * @description - Animate HeaderView entry animation.
         *
         * @method animateHeaderViewEntry
         * @param {number} duration
         * @return void
         */
        animateHeaderViewEntry: function animateHeaderViewEntry (duration = 300) {
            const component = this;

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    lookupComponentRefs: `function`
                }).of(component)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.animateHeaderViewEntry - Component is invalid. Cannot apply composite.`);
                }
            }

            const [ animatedHeader ] = component.lookupComponentRefs(`animated-header`);

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    animate: `function`
                }).of(animatedHeader)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.animateHeaderViewEntry - Animated header component is invalid.`);
                }
            }

            animatedHeader.animate(`animated-navigation-action-left-view`, {
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                },
                easing: `ease-in`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-content-center-view`, {
                from: {
                    opacity: 0,
                    translateX: 100
                },
                to: {
                    opacity: 1,
                    translateX: 0
                },
                easing: `ease-in`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-action-right-view`, {
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                },
                easing: `ease-in`,
                loopCount: 1,
                duration
            });
        },
        /**
         * @description - Animate HeaderView exit animation.
         *
         * @method $initReactComponentComposite
         * @param {number} duration
         * @return void
         */
        animateHeaderViewExit: function animateHeaderViewExit (duration) {
            const component = this;

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    lookupComponentRefs: `function`
                }).of(component)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.animateHeaderViewExit - Component is invalid. Cannot apply composite.`);
                }
            }

            const [ animatedHeader ] = component.lookupComponentRefs(`animated-header`);

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    animate: `function`
                }).of(animatedHeader)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.animateHeaderViewExit - Animated header component is invalid.`);
                }
            }

            animatedHeader.animate(`animated-navigation-action-left-view`, {
                from: {
                    opacity: 1
                },
                to: {
                    opacity: 0
                },
                easing: `ease-out`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-content-center-view`, {
                from: {
                    opacity: 1,
                    translateX: 0
                },
                to: {
                    opacity: 0,
                    translateX: 100
                },
                easing: `ease-out`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-action-right-view`, {
                from: {
                    opacity: 1
                },
                to: {
                    opacity: 0
                },
                easing: `ease-out`,
                loopCount: 1,
                duration
            });
        }
    }
});

export default HeaderViewSlideAndFadeAnimationComposite;
