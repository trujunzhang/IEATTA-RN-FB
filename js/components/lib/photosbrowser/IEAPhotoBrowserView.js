/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    ActionSheetIOS,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';

class IEAPhotoBrowserView extends Component {

    constructor(props) {
        super(props);

    }

    _onSelectionChanged(media, index, selected) {
        alert(`${media.photo} selection status: ${selected}`);
    }

    _onActionButton(media, index) {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showShareActionSheetWithOptions({
                    url: media.photo,
                    message: media.caption,
                },
                () => {
                },
                () => {
                });
        } else {
            alert(`handle sharing on android for ${media.photo}, index: ${index}`);
        }
    }

    onBackPress() {
        debugger
    }

    render() {
        const {
            media,
            initialIndex
        } = this.props;

        return (
            <PhotoBrowser
                onBack={this.onBackPress.bind(this)}
                mediaList={media}
                initialIndex={initialIndex}
                displayNavArrows={true}
                displaySelectionButtons={true}
                displayActionButton={true}
                startOnGrid={true}
                enableGrid={true}
                useCircleProgress
                onSelectionChanged={this._onSelectionChanged}
                onActionButton={this._onActionButton}
            />
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
        paddingTop: 54,
        paddingLeft: 16,
    },
    row: {
        flex: 1,
        padding: 8,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
    },
    rowTitle: {
        fontSize: 14,
    },
    rowDescription: {
        fontSize: 12,
    },
});

module.exports = IEAPhotoBrowserView;
