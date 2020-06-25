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
  const { city } = useParams();
  const [form, setForm] = useState({
    name: '',
    address: ''
  });
  const [restaurantFiltered, setRestaurantFiltered] = useState([]);
  const listEl = useRef(null);

  const getMoreRestaurants = () => {
    if (!restaurant[city]) {
      getRestaurants(city, 1);
      return;
    }
    if (restaurant[city].loading || restaurant[city].eol) return
    else if (listEl.current.scrollHeight - listEl.current.clientHeight === listEl.current.scrollTop) {
      getRestaurants(city, restaurant[city].index);
    }
  }

  const handleScroll = () => {
    if (listEl.current.scrollHeight - listEl.current.clientHeight === listEl.current.scrollTop) {
      getMoreRestaurants();
    }
  }

  const handleChange = event => {
    setForm(Object.assign({}, form, { [event.target.id]: event.target.value }))
  }

  useEffect(() => {
    if (restaurant[city] && restaurant[city].expiry <= new Date().getTime()) clearRestaurants(city);
    else setTimeout(() => getMoreRestaurants());
  }, [restaurant[city], form]);

  useEffect(() => {
    if (restaurant[city] && restaurant[city].restaurants)
      setRestaurantFiltered(restaurant[city].restaurants.filter(
        restaurant => new RegExp(`^${form.name}`).test(restaurant.name) && new RegExp(`^${form.address}`).test(restaurant.address)
      ))
  }, [restaurant[city], form])

  if (!restaurant[city]) return <Spinner />

  return (
    <div id="restaurant" onScroll={handleScroll} ref={listEl}>
      {
        restaurant[city].loading ? <Spinner /> : null
      }
      <Link className="btn margin-tb" to='/'>Back</Link>
      <div className="search-box margin-tb">
        <div style={{ marginRight: 15 }}>
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