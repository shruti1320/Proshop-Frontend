import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen Search Functionality', () => {
  it('updates search term correctly', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeScreen />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search Products');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(searchInput.value).toBe('test');
    });
  });

  it('navigates correctly when searching', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeScreen />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search Products');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(window.location.search).toBe('?search=test');
    });
  });

 
});