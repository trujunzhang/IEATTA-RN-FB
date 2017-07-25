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


const F8Colors = require('F8Colors')
const F8DrawerLayout = require('F8DrawerLayout')

const ListContainer = require('../../common/ListContainer')
const FilterScreen = require('../../filter/FilterScreen')

const RLRecipeParallaxHeader = require('./layout/RLRecipeParallaxHeader')
const DetailedRecipeListView = require('./layout/DetailedRecipeListView')

const {getLocalImagePath} = require('../../parse/fsApi')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../../lib/constants').default

// TODO: Move from reselect to memoize?
const {createSelector} = require('reselect')


type Props = {
    navigator: Navigator;
    logOut: () => void;
};

class IEADetailedRecipe extends React.Component {
    props: Props;
    _drawer: ?F8DrawerLayout;

    constructor(props) {
        super(props);

        (this: any).openFilterScreen = this.openFilterScreen.bind(this);
        (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    }

    render() {
        const {recipe} = this.props,
            {localPhotoStatus} = item
        const localImagePath = getLocalImagePath(recipe.listPhotoId, PARSE_THUMBNAIL_IMAGES)

        const leftItem = {
            icon: require('../../common/img/back_white.png'),
            onPress: () => {
                this.props.navigator.pop()
            }
        }

        const content = (
            <ListContainer
                item={recipe}
                title={recipe.displayName}
                backgroundImage={{isLocal: true, path: localImagePath, width: 348}}
                renderParallaxHeader={(e) => {
                    return (<RLRecipeParallaxHeader item={item}/>)
                }}
                leftItem={leftItem}
                backgroundColor={F8Colors.primaryColor}
                selectedSectionColor="#51CDDA">
            </ListContainer>
        )

        if (Platform.OS === 'ios') {
            return content;
        }
        return (
            <F8DrawerLayout
                ref={(drawer) => {
                    this._drawer = drawer;
                }}
                drawerWidth={300}
                drawerPosition="right"
                renderNavigationView={this.renderNavigationView}>
                {content}
            </F8DrawerLayout>
        );
    }

    renderNavigationView() {
        return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()}/>;
    }


    openFilterScreen() {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({filter: 123});
        } else {
            this._drawer && this._drawer.openDrawer();
        }
    }
}

module.exports = IEADetailedRecipe;
