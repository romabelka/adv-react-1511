import AuthStore from './auth'
import NavigationStore from './navigation'
import { appName } from '../config'

export default {
    auth: new AuthStore(),
    router: new NavigationStore()
}