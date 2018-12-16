import AuthStore from './auth'
import PeopleStore from './people'

export default {
    auth: new AuthStore(),
    people: new PeopleStore(),
}