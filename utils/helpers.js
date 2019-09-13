import { AsyncStorage } from "react-native";
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Quiz yourself!',
    body: "👋 don't forget to complete a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(hour = 20, minute = 0) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            const dateOffset = 0; // TODO: allow this to be changed

            tomorrow.setDate(tomorrow.getDate() + dateOffset)
            tomorrow.setHours(hour)
            tomorrow.setMinutes(minute)
            
            console.log('Tomorrow', tomorrow);
            // TODO: repeats do not work on IOS 10+
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                // repeat: 'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    }
  })
}

export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}