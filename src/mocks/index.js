import conferences from './conferences'
import people from './people'
import firebase from 'firebase/app'

export function saveEventsToFB() {
  const eventsRef = firebase.database().ref('/events')
  conferences.forEach((conference) => eventsRef.push(conference))
}

export function savePeopleToFB() {
  const eventsRef = firebase.database().ref('/people')
  people.forEach((person) => eventsRef.push(person))
}

window.saveEventsToFB = saveEventsToFB

window.savePeopleToFB = savePeopleToFB
