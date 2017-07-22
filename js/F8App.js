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
 * @providesModule F8App
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions
} from 'react-native'

const AppState = require('AppState')
const F8Navigator = require('F8Navigator')
const {
    loadConfig,
    // loadMaps,
    loadNotifications,
    // loadSessions,
    // loadFriendsSchedules,
    // loadSurveys,
    receivePushNotification,
} = require('./actions')
const {updateInstallation} = require('./actions/installation')
const {connect} = require('react-redux')


const LoginScreen = require('./components/lib/login/LoginScreen')
const LoginModal = require('./components/lib/login/LoginModal')

const {version} = require('./env.js')

// Playground:
const Playground = require('./playground')

const {syncBetweenParseAndRealm} = require('./actions')

import BackgroundTimer from 'react-native-background-timer'

class F8App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // playground: true,
            playground: false,
        }
    }

    scheduledTask() {
        // debugger
        this.props.dispatch(syncBetweenParseAndRealm())
    }

    componentDidMount() {
        const self = this

        self.scheduledTask()
        // Start a timer that runs continuous after X milliseconds
        const intervalId = BackgroundTimer.setInterval(() => {
            // this will be executed every 10 minutes
            // even when app is the the background
            self.scheduledTask()
        }, 1 * 60 * 1000)

        // this.setState({intervalId: intervalId})

        AppState.addEventListener('change', this.handleAppStateChange);

        // TODO: Make this list smaller, we basically download the whole internet
        // this.props.dispatch(loadNotifications());
        // this.props.dispatch(loadMaps());
        this.props.dispatch(loadConfig());
        // this.props.dispatch(loadSessions());
        // updateInstallation({version});

        // this.props.dispatch(receivePushNotification({
        //     foreground: true,
        //     message: "wanghao",
        //     data: {url: "http://www.djzhang.com"}
        // }));
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        // Cancel the timer when you are done with it
        // BackgroundTimer.clearInterval(this.state.intervalId)
    }

    handleAppStateChange(appState) {
        if (appState === 'active') {
            // this.props.dispatch(loadSessions());
            // this.props.dispatch(loadNotifications());
            // this.props.dispatch(loadSurveys());
        }
    }

    render() {
        if (this.state.playground) {
            // return <Playground.Playground/>
            // return <Playground.RNFSApp/>
            // return <Playground.FBLogin/>
            // return <Playground.MapViewScene/>
            return <Playground.SectionsListViewScene/>
            //return <Playground.ReactNativeMapsApp/>
        }

        if (!this.props.isLoggedIn) {
            return <LoginScreen />
            //return <LoginModal/>
        }

        return (
            <View style={{flex: 1,}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="light-content"/>
                <F8Navigator />
            </View>
        );
    }

}

function select(store) {
    // console.log("F8 app's select keys: " + JSON.stringify(store.user));
    return {
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
        user: store.user
    };
}

export default connect(select)(F8App);
module.exports = connect(select)(F8App);
