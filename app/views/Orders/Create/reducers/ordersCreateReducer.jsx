/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description Redux reducer "ordersCreate".
 *
 * @description This reducer is solely responsible for maintaining info about creating Orders.
 *
 *
 * initialState = {
 *   isFetching: false,
 *   error: null,
 * };
 *
 */
// Type imports
import {
  REQUEST_ORDERS_CREATE_ACTION,
  RECEIVE_ORDERS_CREATE_SUCCESS,
  RECEIVE_ORDERS_CREATE_FAILURE,
} from '../actions/ordersCreateActions';


export const initialState = {
  isFetching: false,
  error: null,
};


/**
 * @description Reducer for customersCreate
 * @param reduxState
 * @param action
 * @returns {*}
 */
export default (reduxState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_ORDERS_CREATE_ACTION:
      return {
        ...reduxState,
        isFetching: true,
        error: null,
      };
    case RECEIVE_ORDERS_CREATE_SUCCESS:
      return {
        ...reduxState,
        isFetching: false,
      };
    case RECEIVE_ORDERS_CREATE_FAILURE:
      return {
        ...reduxState,
        isFetching: false,
        error: payload.error,
      };
    default:
      return reduxState;
  }
};