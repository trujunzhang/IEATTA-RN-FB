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

const OrderedRecipeCell = require('./OrderedRecipeCell')
const EmptyOrderedRecipe = require('./EmptyOrderedRecipe')
const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const StaticContainer = require('react-native/Libraries/Components/StaticContainer')
const RLOrderedUserListViewHeaderView = require('./RLOrderedUserListViewHeaderView')

const {queryRecipesForUser} = require('../../../actions')

const Photos = require('../../../lib/photos').default


/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_ORDERED_RECIPES,
} = require('../../../lib/constants').default


type Props = {
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};

class OrderedUserListView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);
        this._innerRef = null;

        this.state = {
            sections: {
                MENU_SECTIONS_ORDERED_RECIPES: []
            }
        }
    }


    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.appModel && nextProps.appModel.orderedRecipes) {
            if (nextProps.appModel.orderedRecipes.restaurantId && nextProps.appModel.orderedRecipes.restaurantId === this.props.forRestaurant.objectId) {
                this.setState({
                    sections: {
                        MENU_SECTIONS_ORDERED_RECIPES: nextProps.appModel.orderedRecipes.results || []
                    }
                })
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(queryRecipesForUser(this.props.forRestaurant.objectId))
    }


    renderSectionHeader(sectionData, sectionId) {
        return (
            <SectionHeader sectionType={sectionId}/>
        )
    }

    render() {
        return (
            <PureListView
                ref={this.storeInnerRef.bind(this)}
                data={this.state.sections}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                {...(this.props /* flow can't guarantee the shape of props */)}
                renderEmptyList={this.renderEmptyList.bind(this)}
            />
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
    }

    renderRow(recipe: any,
              sectionID: number | string,
              rowID: number | string) {
        return (
            <OrderedRecipeCell {...this.props} recipe={recipe}/>
        )
    }

    renderTopHeaderView(): ?ReactElement {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: 200}}>
                    <RLOrderedUserListViewHeaderView
                        item={this.props.item}
                        onShowAllPhotosPress={this.onShowAllPhotosPress.bind(this)}/>
                </View>
            </StaticContainer>
        )
    }

    renderEmptyList(): ?ReactElement {
        return (
            <EmptyOrderedRecipe
                title={`No recipes ordered by the user`}
                text="Chick the add icon to add an recipe."
            />
        );
    }

    onShowAllPhotosPress(initialIndex = 0) {
        const photos = this.props.appModel.restaurantPhoto.results || [],
            media = Photos.getMedia(photos)

        this.props.navigator.push({
            photosBrowser: {
                media: media,
                initialIndex: initialIndex
            }
        });
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

module.exports = connect(select)(OrderedUserListView)

