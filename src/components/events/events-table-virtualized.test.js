import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTableVirtualized } from './events-table-virtualized'
import Loader from '../common/loader'
import eventMocks from '../../mocks/conferences'

const events = eventMocks.map((event) => ({ id: Math.random(), ...event }))

Enzyme.configure({ adapter: new Adapter() })

describe('EventsTableVirtualized component', () => {
  it('should render a loader', () => {
    const container = shallow(<EventsTableVirtualized loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render a list of events', () => {
    const container = render(<EventsTableVirtualized events={events} />, {
      disableLifecycleMethods: true
    })

    expect(
      container.find('.test--events-virtualized-table-row').length
    ).not.toBe(0)
  })

  it('should request events fetching', (done) => {
    shallow(<EventsTableVirtualized fetchAllEvents={done} events={[]} />)
  })

  //it doesn't work
  it('should select an event', () => {
    let selectedId = null

    const container = render(
      <EventsTableVirtualized
        events={events}
        selectEvent={(id) => (selectedId = id)}
        fetchAllEvents={() => {}}
      />
    )

    container
      .find('.test--events-virtualized-table-row')
      .at(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
