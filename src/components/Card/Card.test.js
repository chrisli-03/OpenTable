import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

const data = {
  address: "4401 Loop 322",
  area: "Dallas - Fort Worth",
  city: "Abilene",
  country: "US",
  id: 152869,
  image_url: "https://www.opentable.com/img/restimages/152869.jpg",
  lat: 32.397913,
  lng: -99.716776,
  mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=152869",
  name: "Copper Creek Fine Texas Dining",
  phone: "3256924424",
  postal_code: "79602",
  price: 2,
  reserve_url: "http://www.opentable.com/single.aspx?rid=152869",
  state: "TX"
}

test('renders text', () => {
  const { container, getByText } = render(<Card restaurant={data} />);
  expect(getByText(data.name)).toBeInTheDocument();
  expect(getByText(data.address)).toBeInTheDocument();
  expect(getByText(data.postal_code)).toBeInTheDocument();
  expect(getByText(data.phone)).toBeInTheDocument();
  expect(getByText(Array(data.price).fill('$').join(''))).toBeInTheDocument();
})