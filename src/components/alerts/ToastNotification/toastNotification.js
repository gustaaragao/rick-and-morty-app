import { addStylesToToastNotification } from "./handler/addStylesToToastNotification"
import { addTextToNotification } from "./handler/addTextToToastNotification"
import { addCloseButton } from "./handler/addCloseButton"
import { getToastBox } from "./handler/getToastBox"

const toastNotification = (type) => (message = '') => {
  try { 
    if (message.length > 50) {
      throw new Error('Message longer than 50 characters.')
    }

    const toastBox = getToastBox('')

    const notification = document.createElement('div')

    addStylesToToastNotification(notification, type)
    
    addTextToNotification(notification, message, type)

    addCloseButton(notification)

    toastBox.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 6000)

  } catch (err) {
    console.log(err)
  }
}

export const toastNotificationSucess = toastNotification('success')
export const toastNotificationError = toastNotification('error')
export const toastNotificationWarning = toastNotification('warning')