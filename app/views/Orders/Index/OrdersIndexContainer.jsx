/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description This connected OrdersIndexContainer is responsible for listing all Orders.
 *
 * @description It uses an AuthenticatedLayout and an OrdersTable.
 *
 * propTypes = {
 *   ordersIndex: ...,
 *   performOrdersIndexSearch: PropTypes.func.isRequired,
 * };
 *
 * @exports OrdersIndexContainer
 */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Component imports
import AuthenticatedLayout from '../../common/layouts/AuthenticatedLayout';
import OrdersTable from '../../common/tables/OrdersTable';
import SearchBar from '../../common/forms/SearchBar';
import SuccessButton from '../../common/buttons/SuccessButton';


// Actions imports
import { performOrdersIndexSearch } from './actions/ordersIndexActions';


// Custom imports
import { history } from '../../Routes';


// PropTypes imports
import {
  OrdersIndexPropType,
} from '../../../customPropTypes';


/**
 * @class OrdersIndexContainer
 * @description Container for Order creation
 */
class OrdersIndexContainer extends Component {
  constructor(props) {
    super(props);


    /**
     * @function findOrders
     * @description Retrieves Orders with potential searchTerm
     * @param page
     */
    this.findOrders = (page = 1) => {
      this.props.performOrdersIndexSearch(page, this.state.searchTerm);
    };


    /**
     * @function handleSearch
     * @description Search handler
     * @param searchTerm
     */
    this.handleSearch = (searchTerm) => {
      this.setState({
        searchTerm,
      });
      this.findOrders(1);
    };
  }


  state = {
    searchTerm: null,
  };


  componentWillMount() {
    this.findOrders(1);
  }

  render() {
    const {
      ordersIndex: {
        isFetching,
        orders,
        pagination,
      },
    } = this.props;

    return (
      <AuthenticatedLayout
        pageTitle="Orders"
      >
        <div>
          <div className="spacer" />
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <SearchBar
                handleSearch={this.handleSearch}
                disabled={false}
                placeholder="Search Orders"
              />
            </div>
            <div className="col-xs-12 col-md-6 text-right">
              <SuccessButton
                disabled={isFetching}
                loading={false}
                title="New Order"
                onClick={() => history.push('/orders/create')}
              />
            </div>
          </div>
          <br className="hidden-md hidden-lg" />
          <div className="row">
            <div className="container-fluid">
              {(() => {
                if (isFetching) {
                  return <h4 className="text-center">Loading your Orders...</h4>;
                }
                return (
                  <OrdersTable
                    handlePageChange={this.findOrders}
                    pagination={pagination}
                    orders={orders}
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}


OrdersIndexContainer.propTypes = {
  ordersIndex: OrdersIndexPropType.isRequired,
  performOrdersIndexSearch: PropTypes.func.isRequired,
};


OrdersIndexContainer.defaultProps = {};


const mapStateToProps = state => ({
  ordersIndex: state.ordersIndex,
});


const mapDispatchToProps = () => ({
  performOrdersIndexSearch,
});


export default connect(mapStateToProps, mapDispatchToProps())(OrdersIndexContainer);
