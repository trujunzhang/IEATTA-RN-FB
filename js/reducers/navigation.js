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

import type {Action} from '../actions/types';


/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SET_SHARING,
    LOADED_USER_FOLDERS,
    SELECTED_USER_FOLDER,
    ADDED_NEW_FOLDER_WITH_POST,
    POSTS_VOTING_DONE
} = require('../lib/constants').default


// export type Tab =
//     'schedule'
//     | 'my-schedule'
//     | 'map'
//     | 'notifications'
//     | 'info'
//     ;

export type Tab =
    'main'
    | 'info'
    ;


type State = {
    tab: Tab;
};

const initialState: State = {tab: 'main'};

function navigation(state: State = initialState, action: Action): State {
    if (action.type === 'SWITCH_TAB') {
        return {...state, tab: action.tab};
    }
    if (action.type === LOGGED_OUT) {
        return initialState;
    }
    return state;
}

module.exports = navigation;
