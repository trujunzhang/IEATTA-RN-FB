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
    Platform,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')
const PhotoGrid = require('../../../common/PhotoGrid').default

const {queryPhotosForRecipe} = require('../../../actions')

const {getLocalImagePath} = require('../../../parse/fsApi')

import Svg, {
    G,
    Path,
} from 'react-native-svg'


type Props = {
    photos: Array;
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};

const PHOTO_ITEM_WIDTH = 100;

type State = {
    photos: Array;
};

class RecipePhotoHorizonView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);
        this.state = {
            photos: []
        };

        this._innerRef = null;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.appModel && nextProps.appModel.recipePhoto) {
            // debugger
            if (nextProps.appModel.recipePhoto.recipeId && nextProps.appModel.recipePhoto.recipeId === this.props.forRecipe.objectId) {
                this.setState({
                    photos: nextProps.appModel.recipePhoto.results || []
                })
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(queryPhotosForRecipe(this.props.forRecipe.objectId))
    }

    render() {
        const {photos} = this.state;
        return (
            <PhotoGrid
                ref={this.storeInnerRef.bind(this)}
                data={photos}
                horizontal={true}
                itemsPerRow={photos.length}
                itemMargin={6}
                renderRow={this.renderRow.bind(this)}
                renderPhotoHeader={this.renderPhotoHeader.bind(this)}
                {...(this.props /* flow can't guarantee the shape of props */)}
                renderEmptyList={this.renderEmptyList.bind(this)}
            />
        )
    }


    renderPhotoHeader(): ?ReactElement {
        return (
            <View style={{
                width: PHOTO_ITEM_WIDTH,
                height: PHOTO_ITEM_WIDTH,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: F8Colors.controllerViewColor
            }}>
                <Svg width="48" height="48">
                    <Path fill="#666"
                          d="M38 40H10a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6h4.367C15.194 9.675 17.39 8 20 8h8c2.61 0 4.806 1.675 5.633 4H38a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6zM24.01 17a9 9 0 0 0-9 9 9 9 0 1 0 9-9zm0 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                </Svg>
                <Text style={{
                    fontSize: 14,
                    color: '#666',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                }}>{"Add"}</Text>
            </View>
        )
    }

    renderRow(photo: Object,
              itemWidth: Int,
              index: Int) {
        const localImagePath = getLocalImagePath(photo.objectId),
            onShowAllPhotosPress = this.props.onShowAllPhotosPress
        return (
            <TouchableOpacity
                key={photo.objectId}
                style={{
                    width: PHOTO_ITEM_WIDTH,
                    height: PHOTO_ITEM_WIDTH,
                    marginRight: 6
                }}
                onPress={ () => {
                    onShowAllPhotosPress(index)
                }}>
                <Image
                    key={photo.objectId}
                    style={{
                        width: PHOTO_ITEM_WIDTH,
                        height: PHOTO_ITEM_WIDTH,
                        borderRadius: 4
                    }}
                    source={{uri: `file://${localImagePath}`}}/>
            </TouchableOpacity>
        )
    }

    renderEmptyList(): ?ReactElement {
        return (
            <View/>
        );
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._innerRef && this._innerRef.getScrollResponder();
    }
}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel
    };
}

module.exports = connect(select)(RecipePhotoHorizonView)

