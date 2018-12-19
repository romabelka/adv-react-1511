import '../config'

import AuthStore from './auth'
import NavigationStore from './navigation'
import PeopleStore from './people'
import EventsStore from './events'

const stores = {}

stores.auth = new AuthStore(stores)
stores.navigation = new NavigationStore(stores)
stores.people = new PeopleStore(stores)
stores.events = new EventsStore(stores)

export default stores