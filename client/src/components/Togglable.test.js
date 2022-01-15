import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show...'>
        <div className='test-div' />
      </Togglable>)
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('togglable-content')

    expect(div).toBe(null)
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')

    fireEvent.click(button)

    const div = component.container.querySelector('.togglable-content')
    expect(div).not.toBe(null)

    expect(
      component.container.querySelector('.test-div')
    ).not.toBe(null)
  })

  test('toggled contet can be closed', () => {
    const button = component.container.querySelector('.btn')
    fireEvent.click(button)

    const closeButton = component.container.querySelector('.btn')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglable-content')
    expect(div).toBe(null)
  })
})
