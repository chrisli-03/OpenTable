import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders text', () => {
  const { container } = render(<Spinner />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="spinner-wrapper"
    >
      <div
        class="spinner"
      />
    </div>
  `)
})