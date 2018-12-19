import EntitiesStore, {loadAllHelper}  from './entities-store'
import {computed, action} from 'mobx'
import groupBy from 'lodash/groupBy'

class PeopleStore extends EntitiesStore {
    @computed get sections() {
        const grouped = groupBy(this.list, person => person.firstName.charAt(0))

        return Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.id, person}))
        }))
    }

    @action loadAll = loadAllHelper('people')

    @action setPhoto = (id, data) => {
        this.entities[id].photo = data
    }
}

export default PeopleStore