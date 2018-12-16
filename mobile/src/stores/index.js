import AuthStore from './auth'
import NavigationStore from './navigation'
import PeopleStore from './people'
import EventsStore from './events'

export default {
    auth: new AuthStore(),
    navigation: new NavigationStore(),
    people: new PeopleStore(),
    events: new EventsStore()
}