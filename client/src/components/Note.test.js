import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Note from './Note'

describe('Note', () => {
  test('renders content', () => {
    const content = 'Testing this content'
    const note = {
      content,
      important: true
    }

    const component = render(<Note note={note} />)

    expect(component.container).toHaveTextContent(content)
  })

  test('clicking the button calls event handler once', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    const mockHandler = jest.fn()

    const component = render(<Note note={note} toggleImportance={mockHandler} />)

    const button = component.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
