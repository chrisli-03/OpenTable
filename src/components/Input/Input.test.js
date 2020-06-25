import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

test('renders text', () => {
  const { container, getByText } = render(<Input label="Label" />);
  expect(getByText("Label")).toBeInTheDocument();
})