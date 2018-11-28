import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { List } from 'react-virtualized'
import { SelectedEventsVirtualized } from './selected-events-virtualized'
import mockEvents from '../../mocks/conferences'
import SelectedEventCard from './selected-event-card'

const events = mockEvents.map((item, index) => ({ id: index, ...item }))

Enzyme.configure({ adapter: new Adapter() })

describe('<SelectedEventsVirtualized />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SelectedEventsVirtualized events={events} />, {
      disableLifecycleMethods: true
    })
  })

  describe('render()', () => {
    it('should render a <List />', () => {
      expect(wrapper.contains(<List />))
    })

    it('<List /> renders <SelectedEventCard />', () => {
      const wrapper = mount(<SelectedEventsVirtualized events={events} />)
      expect(wrapper.contains(SelectedEventCard))
    })

    it('<SelectedEventCard /> props', () => {
      const wrapper = mount(<SelectedEventsVirtualized events={events} />)
      expect(
        wrapper
          .find(SelectedEventCard)
          .at(0)
          .props()
      ).toEqual({
        event: events[0]
      })
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
