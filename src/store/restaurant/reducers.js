import { SET_LOADING, SET_INDEX, SET_RESTAURANTS, CLEAR_RESTAURANTS, SET_EXPIRY, SET_END_OF_LIST } from './actions'

export function restaurantReducer(state = {}, action) {
  switch(action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { loading: action.loading })});
    case SET_INDEX:
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { index: action.index }) });
    case SET_RESTAURANTS:
      let restaurants = [];
      if (Array.isArray(state[action.city].restaurants)) {
        // make a copy of each restaurant to free previous array
        restaurants = restaurants.concat(state[action.city].restaurants.map(restaurant => Object.assign({}, restaurant)));
      }
      restaurants = restaurants.concat(action.restaurants.map(restaurant => Object.assign({}, restaurant)));
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { restaurants })});
    case CLEAR_RESTAURANTS:
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { index: 1, restaurants: [], expiry: new Date().setMinutes(new Date().getMinutes() + 1) })});
    case SET_EXPIRY:
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { expiry: action.expiry })});
    case SET_END_OF_LIST:
      return Object.assign({}, state, { [action.city]: Object.assign({}, state[action.city], { eol: action.eol })});
    default:
      return state;
  }
}