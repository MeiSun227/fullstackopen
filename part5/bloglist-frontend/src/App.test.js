import React from 'react'
import {  render, waitForElement, rerender} from '@testing-library/react'

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

  test('after login blogs are rendered', async () =>{
      
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    let component = render(
      <App />
    )
    await waitForElement(() => component.getByText(user.name + ' is logged in'))  

    expect(component.container).toHaveTextContent("create new blog");
    expect(component.container).toHaveTextContent("Santa is a dream man");
  })
})