import AuthStore from './auth'
import EventStore from './event'
import PeopleStore from './people'
import NavigationStore from './navigation'
import { appName } from '../config'

export default {
    auth: new AuthStore(),
    event: new EventStore(),
    people: new PeopleStore(),
    router: new NavigationStore()
}