import { LOG_IN, LOG_OUT } from '../actions/authedUser';

export default function authedUser(state = '', action) {
  switch (action.type) {
    case LOG_IN:
      return action.id;
    case LOG_OUT:
      return '';

    default:
      return state;
  }
}
