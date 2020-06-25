import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { cityReducer } from './city/reducers';
import { restaurantReducer } from './restaurant/reducers';

const rootReducer = combineReducers({
  city: cityReducer,
  restaurant: restaurantReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
}