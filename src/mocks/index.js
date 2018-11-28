import conferences from './conferences'
import firebase from 'firebase/app'
import 'firebase/database'

export function saveEventsToFB() {
  const eventsRef = firebase.database().ref('/events')
  conferences.forEach((conference) => eventsRef.push(conference))
  const eventsCount = firebase.database().ref('/eventsCount')
  eventsCount.set(conferences.length)
}

window.saveEventsToFB = saveEventsToFB
