import React from 'react'
import { shallow, mount } from 'enzyme'
import { EventsTableVirtualized } from './events-table-virtualized'
import eventMocks from '../../mocks/conferences'
import { InfiniteLoader, List } from 'react-virtualized'

const events = eventMocks.map((event) => ({ id: Math.random(), ...event }))

describe('<EventsTableVirtualized />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<EventsTableVirtualized allevents={events} />, {
      disableLifecycleMethods: true
    })
  })

  describe('render()', () => {
    it('should render an <InfiniteLoader />', () => {
      expect(wrapper.contains(<InfiniteLoader />))
    })
  })

  describe('<InfiniteLoader /> tests', () => {
    const props = {
      allevents: events,
      loadedEvents: events,
      fetchAllEvents: () => {}
    }

    beforeEach(() => {
      wrapper = mount(<EventsTableVirtualized {...props} />)
    })

    it('renders <List /> ', () => {
      expect(wrapper.contains(List))
    })

    describe('props', () => {
      it('loadMoreRows', () => {
        expect(wrapper.find(InfiniteLoader).prop('loadMoreRows')).toEqual(
          wrapper.instance().loadMoreRows
        )
      })

      it('isRowLoaded', () => {
        expect(wrapper.find(InfiniteLoader).prop('isRowLoaded')).toEqual(
          wrapper.instance().isRowLoaded
        )
      })

      it('rowCount', () => {
        expect(wrapper.find(InfiniteLoader).prop('rowCount')).toBe(
          props.allevents.length
        )
      })
    })
  })
})
