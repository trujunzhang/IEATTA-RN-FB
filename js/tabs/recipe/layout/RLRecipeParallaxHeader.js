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

const IEAStarIcon = require('IEAStarIcon')

class RLRecipeParallaxHeader extends Component {

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
        const {forRestaurant} = this.props
        return (
            <Text style={{fontSize: 12, color: "white"}}>
                {forRestaurant.address}
            </Text>
        )
    }

    render() {
        const {recipe} = this.props
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
                }}>{recipe.displayName}</Text>
                {this.renderMiddle()}
                {this.renderBottom()}
            </View>
        )
    }


}


module.exports = RLRecipeParallaxHeader;

