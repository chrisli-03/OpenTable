import React from 'react';

import './Card.scss'

const Card = ({ restaurant: { address, area, image_url, name, phone, postal_code, price, reserve_url }}) => {
  return (
    <div className="card">
      <div className="card-title">
        { name }
      </div>
      <div className="card-body">
        <div className="card-body-icon">
          <img width="30" height="30" src={image_url} alt="image" />
        </div>
        <div className="card-body-detail">
          <div className="card-body-detail-line">
            <div>Address</div>
            <div>{ address }</div>
          </div>
          <div className="card-body-detail-line">
            <div>Area</div>
            <div>{ area }</div>
          </div>
          <div className="card-body-detail-line">
            <div>Phone</div>
            <div>{ phone }</div>
          </div>
          <div className="card-body-detail-line">
            <div>Postal Code</div>
            <div>{ postal_code }</div>
          </div>
          <div className="card-body-detail-line">
            <div>Price</div>
            <div>{ Array(price).fill('$').join('') }</div>
          </div>
        </div>
      </div>
      <div className="card-reserve">
        <a href={reserve_url} target="_blank">Reserve</a>
      </div>
    </div>
  );
}

export default Card
