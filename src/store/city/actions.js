export const SET_LOADING = 'SET_LOADING';
export const SET_CITIES = 'SET_CITIES';
export const SET_EXPIRY = 'SET_EXPIRY';

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading
  }
}

export function setCities(cities) {
  return {
    type: SET_CITIES,
    cities
  }
}

export function setExpiry(expiry) {
  return {
    type: SET_EXPIRY,
    expiry
  }
}

export function getCities() {
  return dispatch => {
    dispatch(setLoading(true));
    fetch('https://opentable.herokuapp.com/api/cities')
      .then(response => response.json())
      .then(data => {
        dispatch(setCities(data.cities));
        // 5 minutes data expiry time
        dispatch(setExpiry(new Date().setMinutes(new Date().getMinutes() + 5)));
        dispatch(setLoading(false));
      });
  }
}