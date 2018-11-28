import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Table, Column, InfiniteLoader, Grid } from 'react-virtualized'
import { EventsTableVirtualized as EventsTable } from './events-table-virtualized'
import Loader from '../common/loader'
import eventMocks from '../../mocks/conferences'

const events = eventMocks
  .slice(0, 9)
  .map((event) => ({ id: Math.random(), ...event }))

Enzyme.configure({ adapter: new Adapter() })

describe('EventsTable component', () => {
  const defaultProps = {
    events: [],
    fetchMoreEvents: () => {},
    loading: false,
    loaded: false,
    loadedAll: false,
    selectEvent: () => {}
  }
  const setup = (props) => mount(<EventsTable {...defaultProps} {...props} />)

  it('should render a loader', () => {
    const container = setup({ loading: true })
    expect(container.contains(<Loader />))
  })

  it('should render a list of events', () => {
    const container = setup({ events })
    const rows = container.find(Table).find('[aria-label="row"]')
    expect(rows.length).toEqual(events.length)
  })

  it('should request events fetching', (done) => {
    setup({ fetchMoreEvents: done })
  })

  it('should select an event', () => {
    let selectedId = null
    const container = setup({
      events,
      selectEvent: (id) => (selectedId = id)
    })

    container
      .find('[aria-label="row"]')
      .at(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
