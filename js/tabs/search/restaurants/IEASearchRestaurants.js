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
const F8SearchBar = require('F8SearchBar')

const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const RestaurantCell = require('../../home/layout/RestaurantCell')

const {queryNearRestaurant} = require('../../../actions')

class IEASearchRestaurants extends Component {

    _innerRef: ?PureListView;

    static contextTypes = {
        openDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._innerRef = null;

        this.state = {
            sections: {
                RESTAURANTS: []
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            sections: {
                RESTAURANTS: nextProps.appModel.restaurants
            }
        })
    }

    componentWillMount() {
        this.props.dispatch(queryNearRestaurant())
    }

    renderRow = (restaurant: Object,
                 sectionID: number | string,
                 rowID: number | string) => {
        return (<RestaurantCell key={restaurant.objectId} restaurant={item} navigator={this.props.navigator}/>)
    }

    renderEmptyList() {
        return (
            <View></View>
        )
    }

    handleSearch(input) {
        console.log("handle search, ", input);

        this.props.dispatch(queryNearRestaurant({search: input}))
    }

    render() {
        const leftItem = {
            icon: require('../../../common/img/back_white.png'),
            onPress: () => {
                this.props.navigator.pop()
            }
        }

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8SearchBar
                    backgroundColor={F8Colors.primaryColor}
                    onBack={() => {
                        this.props.navigator.pop()
                    }}
                    handleSearch={this.handleSearch.bind(this)}
                    iconColor="white"
                    textColor="white"
                    selectionColor="#ccc"
                    backCloseSize={18}
                    placeholder={"Search Restaurants"}
                    placeholderTextColor="#aaa"
                    autoCapitalize={false}
                    ref={(ref) => this.searchBar = ref}/>

                <PureListView
                    ref={this.storeInnerRef.bind(this)}
                    data={this.state.sections}
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


