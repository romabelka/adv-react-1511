import React from 'react'
import Enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './events-table'
import Loader from '../common/loader'
import eventMocks from '../../mocks/conferences'

const events = eventMocks.map((event) => ({ id: Math.random(), ...event }))

Enzyme.configure({ adapter: new Adapter() })

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
})
