import { SET_LOADING, SET_CITIES, SET_EXPIRY } from './actions';

export function cityReducer(state = {}, action) {
  // ignore actions for restaurants
  if (action.city) return state;
  switch(action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { loading: action.loading });
    case SET_CITIES:
      return Object.assign({}, state, { cities: action.cities });
    case SET_EXPIRY:
      return Object.assign({}, state, { expiry: action.expiry });
    default:
      return state;
  }
}