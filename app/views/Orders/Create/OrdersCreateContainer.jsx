/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description This connected OrdersCreateContainer is responsible for creating an order.
 *
 * @description It uses an AuthenticatedLayout and an OrderDetailsForm.
 *
 * propTypes = {
 *   performOrdersCreateAction: PropTypes.func.isRequired,
 *   ordersCreateform: ...,
 * };
 *
 * @exports OrdersCreateContainer
 */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Component imports
import AuthenticatedLayout from '../../common/layouts/AuthenticatedLayout';
import OrderDetailsForm from '../Show/components/OrderDetailsForm';


// Actions imports
import { performOrdersCreateAction } from './actions/ordersCreateActions';
import {
  performRetrieveCustomer,
} from '../../Customers/Show/actions/customersShowActions';


// PropType imports
import {
  CustomersShowPropType,
  MatchPropType,
  ReduxFormPropType,
} from '../../../customPropTypes';


/**
 * @class OrdersCreateContainer
 * @description Container for Order creation
 */
class OrdersCreateContainer extends Component {
  constructor(props) {
    super(props);


/**
 * @function createOrder
 * @description Creates an order
 * @param e
 */
    this.createOrder = (e) => {
      e.preventDefault();
      const values = this.props.ordersCreateForm.values;
      values.customer_id = this.props.match.params.customer_id;
      this.props.performOrdersCreateAction(values);
    };

  /**
 * @function retrieveCustomer
 * @description Retrieve a specific customer
 * @param id
 */
    this.retrieveCustomer = (id) => {
      this.props.performRetrieveCustomer(id);
    };
  }

 componentWillMount() {
    this.retrieveCustomer(this.props.match.params.customer_id);
  }

  render() {
    const {
      customersShow: {
        customer,
      },
    } = this.props;

    const customerName = customer.first_name ?
      `${customer.first_name} ${customer.last_name}` :
      '';

    return (
      <AuthenticatedLayout
        showBackButton
        pageTitle={`New Order for: ${customerName}`}
      >
        <div>
          <OrderDetailsForm
            handleSubmit={this.createOrder}
          />
        </div>
      </AuthenticatedLayout>
    );
  }
}

OrdersCreateContainer.propTypes = {
  customersShow: CustomersShowPropType.isRequired,
  match: MatchPropType.isRequired,
  performOrdersCreateAction: PropTypes.func.isRequired,
  performRetrieveCustomer: PropTypes.func.isRequired,
  ordersCreateForm: ReduxFormPropType,
};

OrdersCreateContainer.defaultProps = {
  ordersCreateForm: {},
};

const mapStateToProps = state => ({
  ordersCreateForm: state.form.orderDetailsForm,
});

const mapDispatchToProps = () => ({
  performOrdersCreateAction,
});

export default connect(mapStateToProps, mapDispatchToProps())(OrdersCreateContainer);