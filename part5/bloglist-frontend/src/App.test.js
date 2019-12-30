import React from 'react'
import {  render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    await waitForElement(() => component.getByText('login')) 
    // expectations here
    expect(component.container).toHaveTextContent("Username");
    expect(component.container).toHaveTextContent("Password");
    expect(component.container).not.toHaveTextContent("create new blog");

  })
})