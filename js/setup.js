/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

const F8App = require('F8App')
// const FacebookSDK = require('./FacebookSDK')
const Parse = require('parse/react-native')
const React = require('React')
const Relay = require('react-relay')

const {Provider} = require('react-redux')
const configureStore = require('./store/configureStore')

const {updateLastLocation} = require('./actions')

const {serverURL} = require('./env')

const {configureImageFolder} = require('./parse/fsApi')

function setup(): ReactClass<{}> {
    console.disableYellowBox = true;

    Parse.initialize('YJ60VCiTAD01YOA3LJtHQlhaLjxiHSsv4mkxKvVM', '3S9VZj8y9g0Tj1WS64dl19eDJrEVpvckG7uhcXIi', '87rxX8J0JwaaPSBxY9DdKJEqWXByqE7sShRsX4vg')
    Parse.serverURL = 'https://parseapi.back4app.com/'

    configureImageFolder()

    // FacebookSDK.init();
    // Parse.FacebookUtils.init();
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`${serverURL}/graphql`, {
            fetchTimeout: 30000,
            retryDelays: [5000, 10000],
        })
    );

    class Root extends React.Component {
        state: {
            isLoading: boolean;
            store: any;
        };

        constructor() {
            super();
            this.state = {
                isLoading: true,
                store: configureStore(() => this.setState({isLoading: false})),
                initialPosition: 'unknown',
                lastPosition: 'unknown',
            };
        }

        componentDidMount() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let initialPosition = JSON.stringify(position)
                    // debugger
                    this.setState({initialPosition})
                },
                (error) => {
                     alert(error.message)
                },
                {enableHighAccuracy: true, timeout: 40 * 1000, maximumAge: 1 * 1000}
            )
            this.watchID = navigator.geolocation.watchPosition((position) => {
                let lastPosition = JSON.stringify(position)
                console.log("last position: " + lastPosition);
                this.setState({lastPosition})
                if (!!this.state.store) {
                    this.state.store.dispatch(updateLastLocation(position))
                }
            })
        }

        componentWillUnMount() {
            navigator.geolocation.clearWatch(this.watchID)
        }

        render() {
            if (this.state.isLoading) {
                return null;
            }
            return (
                <Provider store={this.state.store}>
                    <F8App />
                </Provider>
            );
        }
    }

    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
