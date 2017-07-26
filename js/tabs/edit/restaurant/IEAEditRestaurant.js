/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'

const F8Colors = require('F8Colors')
const F8Header = require('F8Header')


/**
 * The ErrorAlert displays an alert for both ios & android
 */
const ErrorAlert = require('ErrorAlert')
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The RestaurantForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const RestaurantForm = require('./RestaurantForm')

/**
 * The itemCheckbox will toggle the display of the password fields
 */
const ItemCheckbox = require('ItemCheckbox')

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Platform
}from 'react-native'
const {height, width} = Dimensions.get('window')

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../lib/Translations'
I18n.translations = Translations

const RestaurantPhotoHorizonView = require('../../restaurant/layout/RestaurantPhotoHorizonView')

/**
 * The states were interested in
 */
const {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD,
    // Form Type
    LOGIN_FORM_TYPE_MAIN,
    LOGIN_FORM_TYPE_LOGIN,
    LOGIN_FORM_TYPE_REGISTER,
    LOGIN_FORM_TYPE_FORGOTPASSWORD
} = require('../../../lib/constants').default

/**
 * ## Styles
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    }
})

class IEAEditRestaurant extends Component {
    constructor(props) {
        super(props)
        this.errorAlert = new ErrorAlert()
        this.state = {
            value: {
                username: this.props.auth.form.fields.username,
                email: this.props.auth.form.fields.email,
                password: this.props.auth.form.fields.password,
                passwordAgain: this.props.auth.form.fields.passwordAgain
            }
        }
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextprops) {
        this.setState({
            value: {
                username: nextprops.auth.form.fields.username,
                email: nextprops.auth.form.fields.email,
                password: nextprops.auth.form.fields.password,
                passwordAgain: nextprops.auth.form.fields.passwordAgain
            }
        })
    }

    /**
     * ### onChange
     *
     * As the user enters keys, this is called for each key stroke.
     * Rather then publish the rules for each of the fields, I find it
     * better to display the rules required as long as the field doesn't
     * meet the requirements.
     * *Note* that the fields are validated by the authReducer
     */
    onChange(value) {
        if (value.username !== '') {
            this.props.actions.onAuthFormFieldChange('username', value.username)
        }
        if (value.email !== '') {
            this.props.actions.onAuthFormFieldChange('email', value.email)
        }
        if (value.password !== '') {
            this.props.actions.onAuthFormFieldChange('password', value.password)
        }
        if (value.passwordAgain !== '') {
            this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
        }
        this.setState(
            {value}
        )
    }

    /**
     *  Get the appropriate message for the current action
     *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
     *  @param actions the action for the message type
     */
    getMessage(messageType, actions) {
        let forgotPassword =
            <TouchableHighlight
                onPress={() => {
                    actions.forgotPasswordState()
                    // Actions.ForgotPassword()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_FORGOTPASSWORD)
                }}>
                <Text>{I18n.t('IEAEditRestaurant.forgot_password')}</Text>
            </TouchableHighlight>

        let alreadyHaveAccount =
            <TouchableHighlight
                onPress={() => {
                    actions.loginState()
                    // Actions.Login()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_LOGIN)
                }}>
                <Text>{I18n.t('IEAEditRestaurant.already_have_account')}</Text>
            </TouchableHighlight>

        let register =
            <TouchableHighlight
                onPress={() => {
                    actions.registerState()
                    // Actions.Register()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_REGISTER)
                }}>
                <Text>{I18n.t('IEAEditRestaurant.register')}</Text>
            </TouchableHighlight>

        switch (messageType) {
            case FORGOT_PASSWORD:
                return forgotPassword
            case LOGIN:
                return alreadyHaveAccount
            case REGISTER:
                return register
        }
    }

    /**
     * ### render
     * Setup some default presentations and render
     */
    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }

    onButtonPress() {

    }

    renderContent() {

        // display the login / register / change password screens
        this.errorAlert.checkError(this.props.auth.form.error)

        const leftItem = {
            icon: require('../../../common/img/back_white.png'),
            onPress: () => {
                this.props.navigator.pop()
            }
        }

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header
                    style={{backgroundColor: F8Colors.primaryColor}}
                    foreground='dark'
                    leftItem={leftItem}
                    title={"IEATTA"}
                    subTitle={"Eating Experience Tracker"}/>
                <View>
                    <View style={styles.inputs}>
                        <RestaurantForm
                            form={this.props.auth.form}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}/>
                    </View>

                    <FormButton
                        isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
                        onPress={this.onButtonPress.bind(this)}
                        buttonText={"Save"}/>
                </View>


                <View style={[{ // className="island island--light"
                    width: width,
                    height: 175,
                    flexDirection: 'column',
                    backgroundColor: 'white'
                }, {// Padding and Margin
                    marginTop: 30,
                    marginBottom: 30,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10
                }, {// shadow
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#ccc"
                }]}>
                    <RestaurantPhotoHorizonView
                        forRestaurant={this.props.forRestaurant}
                        onShowAllPhotosPress={this.props.onShowAllPhotosPress}/>
                    {this.renderSeeAllPhotosButton()}
                </View>

            </View>
        )
    }

    renderSeeAllPhotosButton() {
        return (
            <F8Button
                type="photos"
                style={{
                    marginTop: 10,
                    height: 43,
                    backgroundColor: '#41c532',
                    borderRadius: 4
                }}
                caption="See all photos"
                captionStyle={{
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 'bold'
                }}
                onPress={() => {
                    this.props.onShowAllPhotosPress()
                }}
            />
        )
    }
}

/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from '../../../reducers/auth/authActions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}

function select(store) {
    return {
        auth: store.auth
    };
}

module.exports = connect(select, mapDispatchToProps)(IEAEditRestaurant)
