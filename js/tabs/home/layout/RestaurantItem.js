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

const RestaurantRowHeight = 84
const RestaurantAvatorWidth = 80

const F8Colors = require('F8Colors')

const {getLocalImagePath} = require('../../../parse/fsApi')

const IEAStarIcon = require('../../../common/IEAStarIcon').default

class RestaurantItem extends Component {

    constructor(props) {
        super(props);

    }

    renderLeft() {
        const {item} = this.props,
            {localPhotoStatus} = item
        const localImagePath = getLocalImagePath(item.listPhotoId)
        // debugger
        return (
            <View style={{
                marginRight: 10,
                width: 60,
                height: 60
            }}>
                <Image style={{flex: 1, borderRadius: 4}}
                       source={{uri: `file://${localImagePath}`}}/>
            </View>
        )
    }

    renderMiddle() {
        return (
            <View style={{
                height: 28,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <IEAStarIcon/>
                <Text style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: "#666"
                }}>{"30 reviews"}</Text>
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
                <Text style={{
                    height: 17,
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#333"
                }}>{item.displayName}</Text>
                {this.renderMiddle()}
                <Text style={{
                    height: 17,
                    fontSize: 14,
                    color: "#333"
                }}>{item.address}</Text>
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
                    height: RestaurantRowHeight,
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
        const restaurant = this.props.item;
        this.props.navigator.push({restaurant});
        const event = {
            "objectId": "p25iag5OcM",
            "updatedAt": "2017-07-12T01:16:19.472Z",
            "displayName": "Outdoor Skating and Holiday Festivities in Downtown Burbank",
            "start": "2017-06-28T10:30:57.566Z",
            "end": "2017-06-28T11:30:57.566Z",
            "want": "Downtown Burbank Announces 2015 Return of Outdoor Skating and Holiday Festivities Downtown Burbank's most festive holiday tradition returns for outdoor ice skating, fundraising events, and special performances at The Rink in Downtown Burbank. The fun begins December 10, 2015 and runs through January 3, 2016.",
            "restaurantId": "OnNGSfwoou",
            "restaurantName": "LISA"
        }
        // this.props.navigator.push({event: event, forRestaurant: restaurant});
        const user = {
            "objectId": "aGkde8iuL6",
            "updatedAt": "2017-07-11T07:47:06.425Z",
            "loginType": "email",
            "displayName": "Jaron Lawrence",
            "email": ""
        }
        // this.props.navigator.push({
        //     orderedUser: user,
        //     forRestaurant: restaurant,
        //     forEvent: event
        // });
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

module.exports = RestaurantItem
