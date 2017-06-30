/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description The OrdersContainer does the exact same thing as the UnauthenticatedContainer.
 *
 * @description It's responsible for Routing the Orders sub-pages.
 *
 * @description It only uses a Switch and Routes from 'react-router-dom'.
 *
 * @exports OrdersContainer
 */
// Module imports
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


// Component imports
import OrdersCreateContainer from './Create/OrdersCreateContainer';
import OrdersIndexContainer from './Index/OrdersIndexContainer';
import OrdersShowContainer from './Show/OrdersShowContainer';


/**
 * @class OrdersContainer
 * @description Routing container for pertinent Orders routes
 *   "/orders/create" exact Route renders the OrdersCreateContainer
 *   "/orders/:id" exact Route renders the OrdersShowContainer
 *   "/orders" Route renders the OrdersIndexContainer
 */
export default class OrdersContainer extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/orders/create/:customer_id"
          component={OrdersCreateContainer}
        />
        <Route
          exact
          path="/orders/:id"
          component={OrdersShowContainer}
        />
        <Route
          path="/orders"
          component={OrdersIndexContainer}
        />
      </Switch>
    );
  }
}

OrdersContainer.propTypes = {};
OrdersContainer.defaultProps = {};