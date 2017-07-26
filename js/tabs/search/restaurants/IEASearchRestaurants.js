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
} = require('../../../lib/constants').default

const RestaurantCell = require('../../home/layout/RestaurantCell')
const Restaurants = require('../../../lib/restaurants').default

const {queryNearRestaurant} = require('../../../actions')


class IEASearchRestaurants extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    componentDidMount() {
        this.props.dispatch(queryNearRestaurant())
    }

    renderRow = (item: Object,
                 sectionID: number | string,
                 rowID: number | string) => {
        return (<RestaurantCell key={item.objectId} restaurant={item} navigator={this.props.navigator}/>)
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
            icon: require('../../../common/img/hamburger.png'),
            onPress: () => {
                this.context.openDrawer()
            }
        } : null

        // debugger

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
                    data={this.props.appModel.restaurants}
                    renderRow={this.renderRow.bind(this)}
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

module.exports = connect(select)(IEASearchRestaurants)


