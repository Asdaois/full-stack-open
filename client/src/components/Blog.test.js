import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<blog />', () => {
  let component
  const title = 'Testing this title'
  const url = 'http://test.com'
  const author = { username: 'test author' }
  const likes = 2

  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()
    const blog = { title, url, author, likes }
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} handleDelete={() => {}} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(title)
  })

  test('check the url, likes and author when the button controlling the show is clicked', () => {
    const button = component.container.querySelector('.btn-toggle')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(likes)
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent(url)
  })

  test('when the like button is called twice the handle function is called twice', () => {
    const button = component.container.querySelector('.btn-like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
