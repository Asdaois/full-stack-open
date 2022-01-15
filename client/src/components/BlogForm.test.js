import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('call the event handler whith the right details', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    let input = document.querySelector('input[name=\'title\']')
    fireEvent.change(input, { target: { value: 'test title' } })

    input = document.querySelector('input[name=\'url\']')
    fireEvent.change(input, { target: { value: 'test url' } })

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'test title',
      url: 'test url'
    })
  })
})
