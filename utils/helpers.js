import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo' 

const saveKey = 'aleciaFlashcards:key'

export function getDecks() {
const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
	return AsyncStorage.getItem(saveKey).then((result) => {
		if (JSON.parse(result) !== null) {
			return JSON.parse(result)			
		} else {
			AsyncStorage.setItem(saveKey, JSON.stringify(decks))
			return AsyncStorage.getItem(saveKey).then((data) => {
				return JSON.parse(data)
			})
			}
		})
		}
	


export function getDeck(id) {
	return getDecks().then((data)=> {
		const filterableArray = Object.keys(data).map((key) => (data[key]))
		return filterableArray.filter((item) => item.title === id)
	})
}
	

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(
	saveKey,
	JSON.stringify({[title] : { title, questions:[] }}))	
}


export function addCardToDeck(title, question, answer){
    getDeck(title).then(data => {
        AsyncStorage.mergeItem(
            saveKey,
            JSON.stringify({
                [title]: {
                    title,
                    questions: [...data[0].questions, { question, answer } ]
                    }
                })
            )
        }

    )}


const NOTIFICATION_KEY = 'AleciaFlash:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: "Study Study!",
    body: "Don't forget to study your Flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
