import React from 'react'
import { shallow, mount } from 'enzyme'
import { List } from 'react-virtualized'
import { SelectedEventsVirtualized } from './selected-events-virtualized'
import mockEvents from '../../mocks/conferences'
import SelectedEventCard from './selected-event-card'

const events = mockEvents.map((item, index) => ({ id: index, ...item }))

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
})
