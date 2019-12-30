import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blogs from './Blogs'

test('renders content', () => {

  const blogs = [{
    title: 'Coming soon trailer',
    author: 'kimchi',
    likes: 100,
    user: {
      username: "kissa"
    }

  }]
  const user = {
    username: 'kissa',
    token: '1231231214',
    name: 'Donald Tester'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blogs blogs={blogs} user={user} handleDeleteBlog={mockHandler} handleLikeChange={mockHandler} />
  )

  expect(component.container).toHaveTextContent('Coming soon trailer')

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.queryAllByText('Coming soon trailer')
  fireEvent.click(button[0])

  expect(div).not.toHaveStyle('display: none')
})
