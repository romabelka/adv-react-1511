import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { EventsTable } from './events-table'
import Loader from '../common/loader'
import eventMocks from '../../mocks/conferences'

const events = eventMocks.map((event) => ({ id: Math.random(), ...event }))

describe('EventsTable component', () => {
  it('should render a loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render a list of events', () => {
    const container = render(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    expect(container.find('.test--events-table__row').length).toEqual(
      events.length
    )
  })

  it('should request events fetching', (done) => {
    shallow(<EventsTable fetchAllEvents={done} events={[]} />)
  })

  it('should select an event', () => {
    let selectedId = null

    const container = mount(
      <EventsTable
        events={events}
        selectEvent={(id) => (selectedId = id)}
        fetchAllEvents={() => {}}
      />
    )

    container
      .find('.test--events-table__row')
      .at(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
