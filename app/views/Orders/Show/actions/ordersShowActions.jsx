/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description Redux actions. Contains sync action-creators and async actions using Redux-Thunk.
 *
 */
// Custom imports
import { get, patch } from '../../../../utilities/apiUtilities';


export const REQUEST_ORDERS_SHOW_ACTION = 'REQUEST_ORDERS_SHOW_ACTION';
export const RECEIVE_ORDERS_SHOW_SUCCESS = 'RECEIVE_ORDERS_SHOW_SUCCESS';
export const RECEIVE_ORDERS_SHOW_FAILURE = 'RECEIVE_ORDERS_SHOW_FAILURE';


/**
 * @function requestOrdersShowAction
 * @description Action-creator
 */
const requestOrdersShowAction = () => ({
  type: REQUEST_ORDERS_SHOW_ACTION,
});


/**
 * @function receiveOrdersShowSuccess
 * @description Action-creator
 * @param order
 */
const receiveOrdersShowSuccess = order => ({
  type: RECEIVE_ORDERS_SHOW_SUCCESS,
  payload: {
    order,
  },
});


/**
 * @function receiveOrdersShowFailure
 * @description Action-creator
 * @param error
 */
const receiveOrdersShowFailure = error => ({
  type: RECEIVE_ORDERS_SHOW_FAILURE,
  payload: {
    error,
  },
});


/**
 * @function performRetrieveOrder
 * @description GET /orders/:id to retrieve a specific Order
 * @param id
 */
export const performRetrieveOrder = id =>
  (dispatch) => {
    dispatch(requestOrdersShowAction());
    get(`/orders/${id}`)
      .then((response) => {
        dispatch(receiveOrdersShowSuccess(response.order));
      })
      .catch((e) => {
        dispatch(receiveOrdersShowFailure(e));
      });
  };


/**
 * @function performUpdateOrder
 * @description PATCH /orders/:id to update a specific Order
 * @param id
 * @param updates
 */
export const performUpdateOrder = (id, updates) =>
  (dispatch) => {
    dispatch(requestOrdersShowAction());
    patch(`/orders/${id}`, updates)
      .then((response) => {
        dispatch(receiveOrdersShowSuccess(response.order));
      })
      .catch((e) => {
        dispatch(receiveOrdersShowFailure(e));
      });
  };