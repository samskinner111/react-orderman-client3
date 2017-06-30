/**
 * GENERAL NOTES
 * @author TalkRise <admin@talkrise.com>
 *
 * @description Redux actions. Contains sync action-creators and async actions using Redux-Thunk.
 *
 */
import  { history } from '../../../Routes'
import { post } from '../../../../utilities/apiUtilities'

export const REQUEST_ORDERS_CREATE_ACTION = 'REQUEST_ORDERS_CREATE_ACTION'
export const RECEIVE_ORDERS_CREATE_SUCCESS = 'RECEIVE_ORDERS_CREATE_SUCCESS'
export const RECEIVE_ORDERS_CREATE_FAILURE = 'RECEIVE_ORDERS_CREATE_FAILURE'

const requestOrdersCreateAction = () => ({
  type: REQUEST_ORDERS_CREATE_ACTION,
})

const receiveOrdersCreateSuccess = () => ({
  type: RECEIVE_ORDERS_CREATE_SUCCESS,
})

const receiveOrdersCreateFailure = () => ({
  type: RECEIVE_ORDERS_CREATE_FAILURE,
  payload: {
    error,
  },
})

export const performOrdersCreateAction = params =>
  (dispatch) => {
    dispatch(requestOrdersCreateAction())
    post('./orders', params)
      .then(() => {
        dispatch(receiveOrdersCreateSuccess())
        history.push('./orders')
        })
      .catch((e) => {
        dispatch(recieveOrdersCreateFailure(e))
        })
  }