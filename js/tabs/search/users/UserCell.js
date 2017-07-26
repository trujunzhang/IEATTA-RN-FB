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
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

const UserRowHeight = 84
const RestaurantAvatorWidth = 80

const F8Colors = require('F8Colors')
const F8PlaceHolderImage = require('F8PlaceHolderImage')

const {getLocalImagePath} = require('../../../parse/fsApi')

const IEAStarIcon = require('IEAStarIcon')

class UserCell extends Component {


    renderLeft() {
        const {user} = this.props;
        const localImagePath = getLocalImagePath(user.listPhotoId || '')

        return (
            <View style={{
                marginRight: 10,
                width: 60,
                height: 60
            }}>
                <F8PlaceHolderImage
                    style={{
                        flex: 1,
                        borderRadius: 4,
                        width: 60,
                        height: 60
                    }}
                    source={{uri: `file://${localImagePath}`}}
                    placeholderSource={require('../../img/blank_biz_small.png')}/>
            </View>
        )
    }

    renderRight() {
        const {user} = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                // backgroundColor: 'blue'
            }}>
                <Text style={{
                    height: 17,
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#333"
                }}>{user.displayName}</Text>
                <Text numberOfLines={1}
                      style={{
                          height: 17,
                          fontSize: 14,
                          color: "#333"
                      }}>{user.email}</Text>
            </View>
        )
    }

    renderCell() {
        const {user} = this.props;
        return (
            <View
                key={user.objectId}
                style={{
                    paddingLeft: 10,
                    marginRight: 10,
                    backgroundColor: "white",
                    width: width,
                    height: UserRowHeight,
                }}>
                <View style={{// .action-list .action
                    flex: 1,
                    marginLeft: -10,
                    marginRight: -10,
                    padding: 10,
                    flexDirection: 'row',
                }}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }

    onPress() {
        const {user} = this.props;
        this.props.navigator.push({user});
    }

    componentDidMount() {
        // this.onPress()
    }

    render() {
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                {this.renderCell()}
            </TouchableHighlight>
        )
    }

}

module.exports = UserCell;
