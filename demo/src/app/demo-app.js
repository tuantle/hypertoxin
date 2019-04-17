'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import AppDomain from './domains/app-domain';

const DemoApp = Hf.App.augment({
    composites: [
        Hf.React.AppRendererComposite,
        Hf.React.AppComponentComposite
    ],
    $init () {
        const app = this;
        app.register({
            domain: AppDomain({
                name: app.name
            }),
            component: {
                lib: {
                    React,
                    ReactNative,
                    PropTypes
                },
                renderer: ReactNative
            }
        });
    }
})({
    name: `Demo`
});
export default DemoApp;
