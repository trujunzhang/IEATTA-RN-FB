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

const PeopleInEventCell = require('./PeopleInEventCell')
const EmptyPeopleInEvent = require('./EmptyPeopleInEvent')

const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const StaticContainer = require('react-native/Libraries/Components/StaticContainer')
const RLEventListViewHeaderView = require('./RLEventListViewHeaderView')

const {queryPeopleForEvent} = require('../../../actions')


/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_PEOPLE_IN_EVENTS,
} = require('../../../lib/constants').default


type Props = {
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};


class EventsListView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);

        this._innerRef = null;

        this.state = {
            sections: {
                MENU_SECTIONS_PEOPLE_IN_EVENTS: []
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.appModel && nextProps.appModel.peopleInEvent) {
            if (nextProps.appModel.peopleInEvent.eventId && nextProps.appModel.peopleInEvent.eventId === this.props.item.objectId) {
                this.setState({
                    sections: {
                        MENU_SECTIONS_PEOPLE_IN_EVENTS: nextProps.appModel.peopleInEvent.results || []
                    }
                })
            }
        }
    }

    componentDidMount() {
        const {item, forRestaurant} = this.props;
        this.props.dispatch(queryPeopleForEvent(item.objectId))
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
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                {...(this.props /* flow can't guarantee the shape of props */)}
                renderEmptyList={this.renderEmptyList.bind(this)}
            />
        )
    }

    /**
     *
     * @param item is the 'UserSchema'.
     * @param sectionID
     * @param rowID
     * @returns {XML}
     */
    renderRow(item: any,
              sectionID: number | string,
              rowID: number | string) {
        return (
            <PeopleInEventCell
                navigator={this.props.navigator}
                item={item}
            />
        )
    }

    renderTopHeaderView(): ?ReactElement {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: 180}}>
                    <RLEventListViewHeaderView {...this.props}/>
                </View>
            </StaticContainer>
        );
    }

    renderEmptyList(): ?ReactElement {
        return (
            <EmptyPeopleInEvent
                title={`No users on event ordered recipes`}
                text="Check the cross icon to add new user."
            />
        )
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

module.exports = connect(select)(EventsListView)

