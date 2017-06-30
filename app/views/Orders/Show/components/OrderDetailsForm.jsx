/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description This component is responsible for displaying a form about a given Order.
 *
 * @description The form can be initialize with or without initialValues.
 *
 * @description The form is used for editing, displaying, and creating Orders.
 *
 * @description Redux-form that runs validations. Uses renderTextInput for it's Field components.
 *
 * propTypes = {
 *   invalid: PropTypes.bool.isRequired,
 *   pristine: PropTypes.bool.isRequired,
 *   handleSubmit: PropTypes.func.isRequired,
 * };
 */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';


// Custom imports
import renderTextField from '../../../common/forms/renderTextField';
import SuccessButton from '../../../common/buttons/SuccessButton';


/**
 * @class OrderDetailsForm
 * @description ConnectedForm for Order Creation and Updates
 *   Field for Date
 *   Field for Status
 *   Field for Description
 */
export class OrderDetailsForm extends Component {
  render() {
    const {
      handleSubmit,
      invalid,
      pristine,
    } = this.props;

    return (
      <div className="panel panel-default">
        <div className="container-fluid">
          <form onSubmit={handleSubmit}>
            <div className="spacer" />
            <div className="col-md-10 col-md-offset-1">
              <Field
                name="date"
                placeholder="Date (YYYY-MM-DD)"
                component={renderTextField}
              />
              <Field
                name="status"
                placeholder="NEW, SCHEDULED, COMPLETED, or CANCELLED"
                component={renderTextField}
              />
              <Field
                name="description"
                placeholder="Description"
                component={renderTextField}
              />
              <div className="spacer" />
              <SuccessButton
                block
                title="Save"
                loading={false}
                disabled={pristine || invalid}
              />
              <div className="spacer" />
            </div>
          </form>
        </div>
        <div className="spacer" />
      </div>
    );
  }
}

OrderDetailsForm.propTypes = {
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

OrderDetailsForm.defaultProps = {
  initialValues: {
    date: '',
    status: '',
    description: '',
  },
};

/**
 * @function validate
 * @description Check values for potential errors
 * @param values
 * @returns {{}}
 */
const validate = (values) => {
  const errors = {};

  if (!values.date) {
    errors.date = 'Required';
  }

  if (!values.status) {
    errors.status = 'Required';
  } else if (['NEW', 'SCHEDULED', 'COMPLETED', 'CANCELLED'].indexOf(values.status) === -1) {
    errors.status = 'Must be one of NEW, SCHEDULED, COMPLETED, or CANCELLED';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  return errors;
};


export default reduxForm({
  form: 'orderDetailsForm',
  validate,
})(OrderDetailsForm);