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
 * @providesModule F8SVGButton
 * @flow
 */

'use strict';

const F8Colors = require('F8Colors')
const Image = require('Image')
const React = require('React')
const {Text} = require('F8Text')
const TouchableOpacity = require('TouchableOpacity')
const View = require('View')

import Svg, {
    G,
    Path,
} from 'react-native-svg'

class F8SVGButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={{flex: this.props.rowNum}}
                accessibilityTraits="button"
                onPress={this.props.onPress}>
                {this.renderContent()}
            </TouchableOpacity>
        )
    }

    renderContent() {
        const {item} = this.props;
        return (
            <View style={{
                ...item.style,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Svg width="24" height="24">
                    <Path fill="#666" d={item.icon}/>
                </Svg>
                <Text style={{
                    fontSize: 12,
                    color: '#666',
                    backgroundColor: 'transparent'
                }}>{item.title}</Text>
            </View>
        )
    }
}


module.exports = F8SVGButton;
