import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import UnitDisplay from '../UnitDisplay'

let container: Element | null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container as Element)
  ;(container as Element).remove()
  container = null
})

it('render as expected', () => {
  act(() => {
    render(<UnitDisplay unit='hello, world!'/>, container)
  })
  expect(container!.textContent).toBe('hello, world!')
})
