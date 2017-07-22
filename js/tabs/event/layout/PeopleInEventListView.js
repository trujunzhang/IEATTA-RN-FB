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
let PureListView = require('../../../common/PureListView')

const StaticContainer = require('react-native/Libraries/Components/StaticContainer')
const RLEventListViewHeaderView = require('./RLEventListViewHeaderView')

type Props = {
    day: number;
    sessions: Array<Session>;
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};

type State = {
    todaySessions: Array;
};

class EventsListView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);
        this.state = {
            todaySessions: []
        };

        this._innerRef = null;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.sessions !== this.props.sessions ||
            nextProps.day !== this.props.day) {
            this.setState({
                todaySessions: []
            });
        }
    }

    renderSectionHeader() {
        return <View/>
    }

    render() {
        const todaySessions = [
            {'title': 'section1'},
            {'title': 'section2'},
            {'title': 'section3'},
            {'title': 'section4'},
            {'title': 'section5'},
            {'title': 'section6'},
            {'title': 'section7'},
            {'title': 'section8'}
        ]

        return (
            <PureListView
                ref={this.storeInnerRef.bind(this)}
                data={todaySessions}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                {...(this.props /* flow can't guarantee the shape of props */)}
                renderEmptyList={this.renderEmptyList.bind(this)}
            />
        )
    }


    renderRow(session: any, day: number) {
        return (
            <PeopleInEventCell
                onPress={() => this.openSession(session, day)}
                session={session}
            />
        )
    }

    renderTopHeaderView(): ?ReactElement {
        return (
            <StaticContainer>
                <View style={{
                    flex: 1,
                    marginTop: 120,
                }}>
                    <RLEventListViewHeaderView item={this.props.item}/>
                </View>
            </StaticContainer>
        );
    }

    renderEmptyList(): ?ReactElement {
        return (
            <EmptyPeopleInEvent
                title={`No sessions on day match the filter`}
                text="Check the schedule for the other day or remove the filter."
            />
        );
    }

    openSession(session: any, day: number) {
        this.props.navigator.push({
            day,
            session,
            allSessions: this.state.todaySessions,
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

module.exports = EventsListView
