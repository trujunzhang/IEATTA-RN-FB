/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')


const IEAStarIcon = require('../../../common/IEAStarIcon').default

class RLRestaurantParallaxHeader extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    /**
     * className:'biz-rating biz-rating-large clearfix'
     * @returns {XML}
     */
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
                    color: "#ccc"
                }}>{"30 reviews"}</Text>
            </View>
        )
    }

    renderBottom() {
        const {item} = this.props
        return (
            <Text style={{
                fontSize: 12,
                color: "white"
            }}>
                {item.address}
            </Text>
        )
    }

    render() {
        const {item} = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                width: width,
                //backgroundColor: 'red',
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'flex-end',
                paddingBottom: 80
            }}>
                <Text style={{
                    width: width,
                    height: 36,
                    fontSize: 24,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                    color: 'white'
                }}>{item.displayName}</Text>
                {this.renderMiddle()}
                {this.renderBottom()}
            </View>
        )
    }


}


module.exports = RLRestaurantParallaxHeader

