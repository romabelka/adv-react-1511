import conferences from './conferences'
import firebase from 'firebase/app'

export function saveEventsToFB() {
  const eventsRef = firebase.database().ref('/events')
  conferences.forEach((conference) => eventsRef.push(conference))
}

window.saveEventsToFB = saveEventsToFB
