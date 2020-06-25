import React from 'react';

import './Input.scss';

const Input = ({ id, label, onChange }) => {
  return (
    <div className="input">
      <label className="input-label" htmlFor={id}>{ label }</label>
      <input className="input-field" id={id} onChange={onChange} />
    </div>
  )
}

export default Input