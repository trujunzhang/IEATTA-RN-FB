/**
 * # RestaurantForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict'
/**
 * ## Import
 *
 * React
 */
import React, {PropTypes} from 'react'

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../lib/Translations'
I18n.translations = Translations

/**
 * States of login display
 */
const {
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD
} = require('../../../lib/constants').default

/**
 *  The fantastic little form library
 */
const t = require('../../../components/vendor/tcomb-form-native')
let Form = t.form.Form


const RestaurantForm = React.createClass({
    /**
     * ## RestaurantForm class
     *
     * * form: the properties to set into the UI form
     * * value: the values to set in the input fields
     * * onChange: function to call when user enters text
     */
    propTypes: {
        formType: PropTypes.string,
        form: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func
    },

    /**
     * ## render
     *
     * setup all the fields using the props and default messages
     *
     */
    render () {
        let formType = this.props.formType

        let options = {
            fields: {}
        }

        let displayName = {
            label: I18n.t('editRestaurant.displayName'),
            maxLength: 20,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.usernameHasError,
            error: this.props.form.fields.usernameErrorMsg
        }

        const editRestaurantForm = t.struct({
            displayName: t.String
        })
        options.fields['displayName'] = displayName
        options.fields['displayName'].placeholder = I18n.t('editRestaurant.displayNamePlaceHolder')
        options.fields['displayName'].autoCapitalize = 'none'

        /**
         * ### Return
         * returns the Form component with the correct structures
         */
        return (
            <Form ref='form'
                  type={editRestaurantForm}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />
        )
    }
})

module.exports = RestaurantForm;
