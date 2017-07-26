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
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native'
const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')
const F8Header = require('F8Header')

const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const {
    MENU_ITEM_ADD_A_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS,
    MENU_SECTIONS_MORE,
    MENU_SECTIONS_RESTAURANTS,
} = require('../../lib/constants').default

const RestaurantCell = require('./layout/RestaurantCell')
const RestaurantMoreCell = require('./layout/RestaurantMoreCell')

const Restaurants = require('../../lib/restaurants').default

const {queryNearRestaurant} = require('../../actions')


class IEANearRestaurantScene extends Component {
    _innerRef: ?PureListView;

    static contextTypes = {
        openDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._innerRef = null;

        this.state = {
            sections: {
                MENU_SECTIONS_MORE: Restaurants.TOP_MENUS,
                MENU_SECTIONS_RESTAURANTS: []
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            sections: {
                MENU_SECTIONS_MORE: Restaurants.TOP_MENUS,
                MENU_SECTIONS_RESTAURANTS: nextProps.appModel.restaurants
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(queryNearRestaurant())
    }

    renderRow = (item: Object,
                 sectionID: number | string,
                 rowID: number | string) => {

        if (sectionID === MENU_SECTIONS_MORE) {
            return (<RestaurantMoreCell key={item.tag} item={item} navigator={this.props.navigator}/>)
        }
        return (<RestaurantCell key={item.objectId} restaurant={item} navigator={this.props.navigator}/>)
    }

    renderSectionHeader(sectionData, sectionId) {
        return (
            <SectionHeader key={sectionId} sectionType={sectionId}/>
        )
    }

    renderEmptyList() {
        return (
            <View></View>
        )
    }

    render() {
        console.log(JSON.stringify(this.props.user))

        let leftItem = (Platform.OS === 'android') ? {
            title: 'Menu',
            icon: require('../../common/img/hamburger.png'),
            onPress: () => {
                this.context.openDrawer()
            }
        } : null

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header
                    style={{backgroundColor: F8Colors.primaryColor}}
                    foreground='dark'
                    leftItem={leftItem}
                    title={"IEATTA"}
                    subTitle={"Eating Experience Tracker"}/>
                <PureListView
                    ref={this.storeInnerRef.bind(this)}
                    data={this.state.sections}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    {...(this.props /* flow can't guarantee the shape of props */)}
                    renderEmptyList={this.renderEmptyList.bind(this)}
                />
            </View>
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }
}

const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel,
        user: store.user,
    }
}

module.exports = connect(select)(IEANearRestaurantScene)

