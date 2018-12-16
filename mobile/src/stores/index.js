import '../config'
import AuthStore from './auth'
import NavigatorStore from './navigator'
import EventsStore from './events'
import PeopleStore from './people'

const auth = new AuthStore()

const navigator = new NavigatorStore()

const events = new EventsStore()

const people = new PeopleStore()

export default { auth, navigator, events, people }

