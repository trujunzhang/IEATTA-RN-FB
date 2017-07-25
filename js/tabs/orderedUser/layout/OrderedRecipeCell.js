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
const {width, height} = Dimensions.get('window')

const CellRowHeight = 84

const F8Colors = require('F8Colors')
const {Text} = require('F8Text')
const CaptionTextView = require('CaptionTextView')

const {getLocalImagePath} = require('../../../parse/fsApi')

const IEAStarIcon = require('IEAStarIcon')
import Icon from 'react-native-vector-icons/FontAwesome';

import Svg, {
    G,
    Path,
} from 'react-native-svg'


class OrderedRecipeCell extends React.Component {


    onPress() {
        const {orderedUser, forRestaurant, forEvent, recipe} = this.props;
        this.props.navigator.push({
            recipe: recipe,
            forRestaurant: forRestaurant,
            forEvent: forEvent,
            forUser: orderedUser
        });
    }

    renderLeft() {
        const {recipe} = this.props,
            {localPhotoStatus} = recipe
        const localImagePath = getLocalImagePath(recipe.listPhotoId)
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
        const {recipe} = this.props
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
                }}>{recipe.displayName}</Text>
                {this.renderMiddle()}
                <CaptionTextView caption="$" title={recipe.price}/>
            </View>
        )
    }

    renderCell() {
        const {recipe} = this.props;
        return (
            <View
                key={recipe.objectId}
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


    render() {
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                {this.renderCell()}
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
