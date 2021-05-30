import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData().then(({ users }) => {
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}