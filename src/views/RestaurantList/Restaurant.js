import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getRestaurants, clearRestaurants } from '../../store/restaurant/actions';

import Input from '../../components/Input/Input';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';

import './Restaurant.scss'

const RestaurantList = React.forwardRef(({ restaurants, city }, ref) => {
  return (
    <div className="restaurant-list">
      {
        restaurants.map((restaurant, i) => <div key={i} style={{ padding: '0 10px', marginBottom: 15 }}><Card restaurant={restaurant} /></div>)
      }
    </div>
  );
});

const Restaurant = ({ restaurant, getRestaurants, clearRestaurants }) => {
  const { city } = useParams(); // name of city from url
  const [form, setForm] = useState({ // filter form
    name: '',
    address: ''
  });
  const [restaurantFiltered, setRestaurantFiltered] = useState([]); // list of restaurants after filtering
  const listEl = useRef(null); // restaurant div element

  const getMoreRestaurants = () => {
    // first time loading this city, no data available yet
    if (!restaurant[city]) {
      getRestaurants(city, 1);
      return;
    }
    // if city is loading or loaded the last page, stop.
    // prevents duplicated and redundant requests
    // else if restaurant list has not reached bottom yet, continue requesting for more
    if (restaurant[city].loading || restaurant[city].eol) return
    else if (listEl.current.scrollHeight - listEl.current.clientHeight === listEl.current.scrollTop) {
      getRestaurants(city, restaurant[city].index);
    }
  }

  const handleScroll = () => {
    // scroll bar reached bottom, request more data
    if (listEl.current.scrollHeight - listEl.current.clientHeight === listEl.current.scrollTop) {
      getMoreRestaurants();
    }
  }

  // handle filter form change
  const handleChange = event => {
    setForm(Object.assign({}, form, { [event.target.id]: event.target.value }))
  }

  // if restaurant data expired, clear existing data
  useEffect(() => {
    if (restaurant[city] && restaurant[city].expiry <= new Date().getTime()) clearRestaurants(city);
    else setTimeout(() => getMoreRestaurants());
  }, [restaurant[city], form]);

  // filter restaurant list by filter form
  useEffect(() => {
    if (restaurant[city] && restaurant[city].restaurants)
      setRestaurantFiltered(restaurant[city].restaurants.filter(
        restaurant => new RegExp(`^${form.name}`).test(restaurant.name) && new RegExp(`^${form.address}`).test(restaurant.address)
      ))
  }, [restaurant[city], form])

  // if restaurant is loading, render a loading screen
  if (!restaurant[city]) return <Spinner />

  return (
    <div id="restaurant" onScroll={handleScroll} ref={listEl}>
      {
        restaurant[city].loading ? <Spinner /> : null
      }
      <Link className="btn margin-tb" to='/'>Back</Link>
      <div className="search-box margin-tb">
        <div>
          <Input id="name" label="Name" onChange={handleChange} />
        </div>
        <div>
          <Input id="address" label="Address" onChange={handleChange} />
        </div>
      </div>
      <RestaurantList restaurants={restaurantFiltered} city={city} />
    </div>
  );
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  getRestaurants: (city, index) => dispatch(getRestaurants(city, index)),
  clearRestaurants: (city) => dispatch(clearRestaurants(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);