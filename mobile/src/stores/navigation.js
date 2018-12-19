import {NavigationActions} from 'react-navigation'
import BasicStore from './basic-store'
import {autorun} from 'mobx'

class NavigationStore extends BasicStore {
    ref = null

    initStore() {
        let firstRun = true

        setTimeout(() => {
            autorun(() => {
                const {user} = this.getStore('auth')
                const screen = user ? 'lists' : 'auth'

                if (!firstRun) {
//                    this.goTo(screen)
                }

                firstRun = false
            })
        })
    }

    setNavRef = ref => {
        this.ref = ref
        this.initStore()
    }

    goTo = (routeName, params) => this.ref.dispatch(NavigationActions.navigate({
        routeName, params
    }))

}

export default NavigationStore