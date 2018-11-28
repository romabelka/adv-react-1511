import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTableVirtualized, Informer } from './events-table-virtualized'
import events from '../../mocks/conferences'
import { Table } from 'react-virtualized'
import Loader from '../common/loader'

Enzyme.configure({ adapter: new Adapter() })

describe('events/events-table-virtualized.test', () => {
  let wrapper
  it('should render <Table />', () => {
    wrapper = shallow(<EventsTableVirtualized events={events} />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.contains(<Table />))
  })
  it('should render <Loader /> if no events passed', () => {
    wrapper = shallow(<EventsTableVirtualized loading={true} />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.contains(<Loader />)).toEqual(true)
    expect(!wrapper.contains(<Table />)).toEqual(true)
  })
  it('should render <Informer /> if events is an empty arraay', () => {
    wrapper = shallow(<EventsTableVirtualized loading={false} events={[]} />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.contains(<Informer />)).toEqual(true)
  })
})
