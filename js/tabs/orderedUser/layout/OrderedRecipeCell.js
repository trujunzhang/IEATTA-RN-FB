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
 * @providesModule OrderedRecipeCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const F8Colors = require('F8Colors')
const {Text} = require('F8Text')

const Events = require('../../../lib/events').default

import Svg, {
    G,
    Path,
} from 'react-native-svg'


class OrderedRecipeCell extends React.Component {

    componentDidMount() {
        // this.onPress()
    }

    onPress() {
        const {recipe} = this.props;
        this.props.navigator.push({recipe});
    }

    render() {
        const {recipe} = this.props;
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                <View style={[{
                    backgroundColor: 'white',
                    // backgroundColor: 'red'
                }, {
                    flexDirection: 'column',
                }, {
                    paddingHorizontal: 8,
                    paddingVertical: 6
                }]}>
                    <Text numberOfLines={2} style={[styles.titleText, {
                        color: '#0073bb',
                        fontWeight: 'bold',
                        fontSize: 18
                    }, {
                        marginBottom: 8
                    }]}>
                        {recipe.displayName}
                    </Text>
                </View>
            </TouchableHighlight>
        )
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


module.exports = OrderedRecipeCell;
