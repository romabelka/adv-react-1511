import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loader from '../common/loader'
import { EventsTableVirtualized } from './events-table-virtualized'
import eventMocks from '../../mocks/conferences'

Enzyme.configure({ adapter: new Adapter() })

const events = eventMocks.map((event) => ({ id: Math.random(), ...event }))

describe('Events Table Virtualized', () => {
  it('should render a loader', () => {
    const container = shallow(<EventsTableVirtualized loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render a loader if no events', () => {
    const container = shallow(<EventsTableVirtualized events={[]} />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render 10 row', () => {
    const table = render(
      <EventsTableVirtualized events={events.slice(0, 10)} />
    )

    expect(table.find('.ReactVirtualized__Table__row').length).toBe(10)
  })

  it('should request events fetching lazy loading', (done) => {
    shallow(<EventsTableVirtualized fetchLazyEvents={done} events={[]} />)
  })

  it('should select an event', () => {
    let selectedId = null

    const container = mount(
      <EventsTableVirtualized
        events={events}
        selectEvent={(id) => (selectedId = id)}
        fetchLazyEvents={jest.fn()}
      />
    )

    container
      .find('.ReactVirtualized__Table__row')
      .at(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
