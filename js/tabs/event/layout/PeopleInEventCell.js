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
 * @providesModule PeopleInEventCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/FontAwesome';

const CellRowHeight = 60

let F8Colors = require('F8Colors');
let {Text} = require('F8Text');
let F8Touchable = require('F8Touchable');

class PeopleInEventCell extends React.Component {

    renderLeft() {
        const {item} = this.props;
        const avatorW = 36;
        return (
            <View style={{
                marginRight: 10,
                marginTop: 4,
                width: avatorW,
                height: avatorW,
            }}>
                <Image style={{flex: 1, borderRadius: avatorW / 2}}
                       source={{uri: 'https://s3-media1.fl.yelpcdn.com/photo/Zx3PIaWtxW2rJDmgxINjHg/60s.jpg'}}/>
            </View>
        )
    }

    renderRight() {
        const {item} = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                // backgroundColor: 'blue'
            }}>
                <Text style={[{
                    marginBottom: 4
                }, {
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#333"
                }]}>{item.displayName}</Text>
                <Text style={{
                    height: 17,
                    fontSize: 14,
                    color: "#333"
                }}>{"3 Recipes Ordered"}</Text>
            </View>
        )
    }

    renderCell() {
        const {item} = this.props;
        return (
            <View
                key={item.objectId}
                style={{
                    paddingLeft: 10,
                    marginRight: 10,
                    backgroundColor: "white",
                    width: width,
                    height: CellRowHeight,
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
                <View style={{position: 'absolute', right: 10, top: (CellRowHeight - 24) / 2}}>
                    <Icon name="angle-right" size={24} color="#C8C7CC"/>
                </View>
            </View>
        )
    }

    onPress() {
        const user = this.props.item;
        debugger
        // this.props.navigator.push({user});
    }

    render() {
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                {this.renderCell()}
            </TouchableHighlight>
        )
    }
}


module.exports = PeopleInEventCell;
