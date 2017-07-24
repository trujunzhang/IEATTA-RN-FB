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

const {getLocalImagePath} = require('../../../parse/fsApi')

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
        const {forRestaurant} = this.props,
            localImagePath = getLocalImagePath(forRestaurant.listPhotoId)
        return (
            <Image style={[
                {
                    width: 60,
                    height: 60,
                    borderRadius: 4,
                }, {
                    marginTop: 10,
                    marginRight: 16,
                }
            ]}
                   source={{uri: `file://${localImagePath}`}}/>
        )
    }

    renderRight() {
        const {event, forRestaurant} = this.props
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
                    {event.displayName}
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
                <View style={{height: 140, flexDirection: 'row'}}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }
}


module.exports = RLEventParallaxHeader;

