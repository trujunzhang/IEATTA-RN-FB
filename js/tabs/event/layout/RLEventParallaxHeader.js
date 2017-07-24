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

const CaptionTextView = require('CaptionTextView')
const IEAStarIcon = require('../../../common/IEAStarIcon').default

class RLEventParallaxHeader extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    /**
     * className:'biz-rating biz-rating-large clearfix'
     * @returns {XML}
     */
    renderLeft() {
        return (
            <Image style={{
                width: 60,
                height: 60,
                borderRadius: 4,
                marginRight: 16,
            }}
                   source={{url: 'https://s3-media4.fl.yelpcdn.com/bphoto/oBdw4OSzt2CpuOnpOGw4Ow/60s.jpg'}}/>
        )
    }

    renderRight() {
        const {item, forRestaurant} = this.props
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text
                    numberOfLines={3}
                    style={{
                        paddingBottom: 8,
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                    {item.displayName}
                </Text>
                <CaptionTextView caption="Restaurant:" title={forRestaurant.displayName}/>
            </View>
        )
    }

    /**
     * className="event-details_header ysection"
     * @returns {XML}
     */
    render() {
        return (
            <View style={[// className="arrange arrange--12"
                {
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                }, {
                    width: width,
                    paddingLeft: 12,
                    paddingRight: 12,
                    // paddingBottom: 80
                }
            ]}>
                <View style={{height: 160, flexDirection: 'row'}}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }
}


module.exports = RLEventParallaxHeader

