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

const {getLocalImagePath} = require('../../../parse/fsApi')

class RLOrderedUserParallaxHeader extends Component {

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
                    marginTop: 0,
                    marginRight: 16,
                }
            ]}
                   source={{uri: `file://${localImagePath}`}}/>
        )
    }

    renderRight() {
        const {orderedUser, forRestaurant, forEvent} = this.props;
        return (
            <View>
                <Text style={{
                    width: width,
                    height: 36,
                    fontSize: 24,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                    color: 'white'
                }}>{orderedUser.displayName}</Text>
                <Text style={{fontSize: 12, color: "white"}}>
                    {forRestaurant.displayName}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                width: width,
                // backgroundColor: 'red',
                paddingHorizontal: 10,
                justifyContent: 'flex-end',
                paddingBottom: 20
            }}>
                <View style={{height: 140, flexDirection: 'row'}}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }


}


module.exports = RLOrderedUserParallaxHeader

