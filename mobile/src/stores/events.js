import EntitiesStore, {loadAllHelper} from './entities-store'
import {action} from 'mobx'

class Events extends EntitiesStore {
    @action loadAll = loadAllHelper('events')
}


export default Events