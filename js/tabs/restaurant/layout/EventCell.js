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
 * @providesModule EventCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const F8Colors = require('F8Colors')
const {Text} = require('F8Text')
const F8Touchable = require('F8Touchable')

const Events = require('../../../lib/events').default

import Svg, {
    G,
    Path,
} from 'react-native-svg'


class EventCell extends React.Component {

    openEvent() {
        const event = this.props.item;
        this.props.navigator.push({event});
    }

    render() {
        const item = this.props.item;
        const info = Events.getDateInfo(item);
        return (<F8Touchable onPress={this.openEvent.bind(this)}>
            <View style={[{
                paddingLeft: 17,
                backgroundColor: 'white',
                // backgroundColor: 'red'
            }, {
                flexDirection: 'column',
            }, {
                marginHorizontal: 8,
                marginVertical: 6
            }]}>
                <Text numberOfLines={2} style={[styles.titleText, {
                    color: '#0073bb',
                    fontWeight: 'bold',
                    fontSize: 18
                }, {
                    marginBottom: 8
                }]}>
                    {item.displayName}
                </Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Svg width="24" height="24">
                        <Path fill="#666"
                              d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>
                    </Svg>
                    {/*Saturday, 1 Jul, 12:00 am – Monday, 31 Jul, 12:00 am*/}
                    <Text style={[styles.locationText, {color: '#666'}]}>
                        {`${info.startFormat}-${info.endFormat}`}
                    </Text>
                </View>
            </View>
        </F8Touchable>)

    }
}


const styles = StyleSheet.create({
    cell: {},
    titleSection: {
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleAndDuration: {
        justifyContent: 'center',
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 24,
        color: F8Colors.darkText,
        marginBottom: 4,
        marginRight: 10,
    },
    duration: {
        fontSize: 12,
        color: F8Colors.lightText,
    },
    locationText: {
        fontSize: 12,
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
});


let {connect} = require('react-redux');


function select(store, props) {
    return {
        showTick: true,
    };
}

module.exports = connect(select)(EventCell);
