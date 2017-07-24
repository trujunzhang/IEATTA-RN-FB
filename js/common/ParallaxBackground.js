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
 * @providesModule ParallaxBackground
 */

'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Animated,
    Image,
    Easing,
    View,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

const resolveAssetSource = require('resolveAssetSource')

// TODO: Remove this magic numbers
const HEIGHT = Dimensions.get('window').height > 600
    ? 200
    : 150;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
    maxHeight: number;
    minHeight: number;
    offset: Animated.Value;
    backgroundImage: number;
    backgroundShift: number; // 0..1
    backgroundColor: string; // TODO: This makes it seems like image loads faster. Remove
    children?: any;
}

type State = {
    shift: Animated.Value;
};

class ParallaxBackground extends React.Component {
    props: Props;
    state: State;

    static HEIGHT = HEIGHT;

    constructor(props: Props) {
        super(props);
        this.state = {
            shift: new Animated.Value(props.backgroundShift || 0),
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.backgroundShift !== this.props.backgroundShift) {
            Animated.timing(this.state.shift, {
                toValue: this.props.backgroundShift,
                duration: 300,
            }).start();
        }
    }

    render(): ReactElement {
        const {minHeight, maxHeight, offset, backgroundColor} = this.props;
        const buffer = 10; // To reduce visual lag when scrolling
        const height = offset.interpolate({
            inputRange: [0, maxHeight - minHeight],
            outputRange: [maxHeight + buffer, minHeight + buffer],
            extrapolateRight: 'clamp',
        });

        return (
            <Animated.View style={[styles.container, {height, backgroundColor}]}>
                {this.renderBackgroundImage()}
                {this.renderContent()}
            </Animated.View>
        );
    }

    renderBackgroundImage(): ?ReactElement {
        const {backgroundImage, minHeight, maxHeight, offset} = this.props;
        if (!backgroundImage) {
            return null;
        }
        const {isLocal, path, width} = backgroundImage;

        // debugger
        // const source = resolveAssetSource(`file://${path}`)
        // if (!source) {
        //     return null;
        // }
        // debugger
        // const {width} = source;
        const translateX = this.state.shift.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH - width],
            extrapolate: 'clamp'
        });

        const length = maxHeight - minHeight;
        const translateY = offset.interpolate({
            inputRange: [0, length / 2, length],
            outputRange: [0, -length / 2, -length / 1.5],
            extrapolate: 'clamp'
        });
        // Sometimes image width is smaller than device's width
        const initialScale = Math.max(SCREEN_WIDTH / width * 2 - 1, 1);
        const scale = offset.interpolate({
            inputRange: [-length, 0],
            outputRange: [2, initialScale],
            extrapolateRight: 'clamp'
        });
        const transforms = {transform: [{translateX}, {translateY}, {scale}]}
        const bgStyle = {opacity: 0.55, flex: 1}
        return (
            <Animated.Image
                source={{uri: `file://${path}`}}
                style={[transforms, bgStyle]}
            />
        )
    }

    renderContent(): ?ReactElement {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        const content = React.Children.only(this.props.children);

        const {minHeight, maxHeight, offset} = this.props;
        const length = maxHeight - minHeight;
        const opacity = offset.interpolate({
            inputRange: [0, length - 40],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const translateY = offset.interpolate({
            inputRange: [0, length],
            outputRange: [-32, -(length / 2) - 32],
            extrapolate: 'clamp',
        });
        const transforms = {opacity, transform: [{translateY}]};
        return (
            <Animated.View style={[styles.contentContainer, transforms]}>
                {content}
            </Animated.View>
        );
    }
}

const HEADER_HEIGHT = HEIGHT + 156;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        overflow: 'hidden',
    },
    contentContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});


module.exports = ParallaxBackground
