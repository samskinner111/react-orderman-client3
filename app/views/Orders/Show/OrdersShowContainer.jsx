/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description OrdersShowContainer shows and edits Order information.
 *
 * @description This container uses an AuthenticatedLayout and OrderDetailsForm.
 *
 * propTypes = {
 *   ordersShow: ...,
 *   match: ...,
 *   performRetrieveOrder: PropTypes.func.isRequired,
 *   performUpdateOrder: PropTypes.func.isRequired,
 *   orderDetailsForm: ...,
 * };
 *
 * @exports OrdersShowContainer
 */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Component imports
import AuthenticatedLayout from '../../common/layouts/AuthenticatedLayout';
import OrderDetailsForm from './components/OrderDetailsForm';


// Actions imports
import {
  performDeleteOrder,
  performRetrieveOrder,
  performUpdateOrder,
} from './actions/ordersShowActions';


// PropTypes imports
import {
  OrdersShowPropType,
  MatchPropType,
  ReduxFormPropType,
} from '../../../customPropTypes';


/**
 * @class OrdersShowContainer
 * @description Container for Order Display and Updates
 */
class OrdersShowContainer extends Component {
  constructor(props) {
    super(props);


    /**
     * @function retrieveOrder
     * @description Retrieves a specific order by ID
     * @param id
     */
    this.retrieveOrder = (id) => {
      this.props.performRetrieveOrder(id);
    };


    /**
     * @function handleSubmit
     * @description Submit handler for Order updates
     * @param e
     */
    this.handleSubmit = (e) => {
      e.preventDefault();
      const { values } = this.props.orderDetailsForm;
      this.props.performUpdateOrder(this.props.match.params.id, values);
    };
  }


  componentWillMount() {
    this.retrieveOrder(this.props.match.params.id);
  }


  render() {
    const {
      ordersShow: {
        isFetching,
        order,
      },
    } = this.props;

    const orderName = order.first_name ?
      `${order.first_name} ${order.last_name}` :
      '';

    return (
      <AuthenticatedLayout
        showBackButton
        pageTitle={`Order Details: ${orderName}`}
      >
        <div>
          <br />
          {(() => {
            if (isFetching) {
              return <h4 className="text-center">Loading Order...</h4>;
            }
            return (
              <div>
                <OrderDetailsForm
                  handleSubmit={this.handleSubmit}
                  initialValues={{
                    first_name: order.first_name,
                    last_name: order.last_name,
                    email: order.email,
                  }}
                />
                <div className="spacer" />
              </div>
            );
          })()}
        </div>
      </AuthenticatedLayout>
    );
  }
}


OrdersShowContainer.propTypes = {
  match: MatchPropType.isRequired,
  ordersShow: OrdersShowPropType.isRequired,
  performRetrieveOrder: PropTypes.func.isRequired,
  performUpdateOrder: PropTypes.func.isRequired,
  performDeleteOrder: PropTypes.func.isRequired,
  orderDetailsForm: ReduxFormPropType,
};


OrdersShowContainer.defaultProps = {
  orderDetailsForm: {},
};


const mapStateToProps = state => ({
  ordersShow: state.ordersShow,
  orderDetailsForm: state.form.orderDetailsForm,
});


const mapDispatchToProps = () => ({
  performRetrieveOrder,
  performUpdateOrder,
});


export default connect(mapStateToProps, mapDispatchToProps())(OrdersShowContainer);
