import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCities } from '../../store/city/actions';

import Input from '../../components/Input/Input';
import Spinner from '../../components/Spinner/Spinner';

import './SelectCity.scss';

const SelectCity = ({ loading, cities, expiry, getCities}) => {
  const [filter, setFilter] = useState('') // city filterer
  const [cityFiltered, setCityFiltered] = useState(cities) // list of cities after filtering

  useEffect(() => {
    if (expiry <= new Date().getTime()) getCities(); // if data expired, get new data, else use data in store
  }, [expiry, getCities]);

  useEffect(() => {
    // filter city with regular expression
    setCityFiltered(cities.filter(city => new RegExp(`^${filter.toLowerCase()}`).test(city.toLowerCase())))
  }, [filter, cities])

  // if loading cities, render a loading screen
  if (loading) {
    return <Spinner />
  }

  // handle input change
  const handleChange = event => {
    setFilter(event.target.value)
  }

  return (
    <div id="select-city">
      <div className="margin-tb">
        <Input id="prefix" label="Search By Prefix" onChange={handleChange} />
      </div>
      <p className="mute margin-tb">Click on the city you want to search</p>
      <ul className="list">
        {
          cityFiltered.length > 0
          ? cityFiltered.map((city, i) =>
            <li className="list-item" key={i}>
              <Link to={`/${city}`}>{city}</Link>
            </li>
          )
          : <li className="list-item disabled">No Result</li>
        }
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.city.loading,
  cities: state.city.cities,
  expiry: state.city.expiry
})

const mapDispatchToProps = dispatch => ({
  getCities: () => dispatch(getCities())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCity);