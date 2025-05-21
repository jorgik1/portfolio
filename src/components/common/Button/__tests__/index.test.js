import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '..'; // Assuming the Button component is in the parent directory

describe('Button Component', () => {
  it('renders default button correctly and matches snapshot', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toMatchSnapshot();
  });

  it('renders secondary button correctly and matches snapshot', () => {
    render(<Button secondary>Secondary Action</Button>);
    const buttonElement = screen.getByText(/Secondary Action/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toMatchSnapshot();
  });
});
