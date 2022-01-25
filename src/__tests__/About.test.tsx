/**
 * @jest-environment jsdom
 */
import { render, screen} from "@testing-library/react";
import About from "../pages/about";

describe('about', () => {
  let container: HTMLDivElement
  beforeEach(() => {
    document.body.appendChild(container = document.createElement('div'))
  })
  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should title render', () => {
    const container = render(<About />)
    expect(container.getByText('⚡️Talexy')).toMatchSnapshot()
  })
})
