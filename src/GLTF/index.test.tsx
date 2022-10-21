import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import GLTF from './index';

describe('<GLTF />', () => {
  it('render GLTF with dumi', () => {
    const msg = 'dumi';

    render(<GLTF src={msg} backgroundColor="" />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
