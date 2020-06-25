export const SET_LOADING = 'SET_LOADING';
export const SET_INDEX = 'SET_INDEX';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const CLEAR_RESTAURANTS = 'CLEAR_RESTAURANTS';
export const SET_EXPIRY = 'SET_EXPIRY';
export const SET_END_OF_LIST = 'SET_END_OF_LIST';

export function setLoading(city, loading) {
  return {
    type: SET_LOADING,
    loading,
    city
  }
}

export function setIndex(city, index) {
  return {
    type: SET_INDEX,
    index,
    city
  }
}

export function appendRestaurants(city, restaurants) {
  return {
    type: SET_RESTAURANTS,
    restaurants,
    city
  }
}

export function clearRestaurants(city) {
  return {
    type: CLEAR_RESTAURANTS,
    city
  }
}

export function setExpiry(city, expiry) {
  return {
    type: SET_EXPIRY,
    expiry,
    city
  }
}

export function setEndOfList(city, eol) {
  return {
    type: SET_END_OF_LIST,
    eol,
    city
  }
}

export function getRestaurants(city, index) {
  return dispatch => {
    dispatch(setLoading(city, true));
    fetch(`http://opentable.herokuapp.com/api/restaurants?city=${city}&page=${index}`)
      .then(response => response.json())
      .then(data => {
        dispatch(appendRestaurants(city, data.restaurants));
        dispatch(setIndex(city, index+1));
        // 5 minutes data expiry time
        dispatch(setExpiry(city, new Date().setMinutes(new Date().getMinutes() + 1)));
        dispatch(setEndOfList(city, data.restaurants.length === 0));
        dispatch(setLoading(city, false));
      });
  }
}