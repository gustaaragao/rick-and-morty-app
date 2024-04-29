import { addStylesToToastNotification } from "./handler/addStylesToToastNotification"
import { addTextToNotification } from "./handler/addTextToToastNotification"
import { getToastBox } from "./handler/getToastBox"

const toastNotification = (type) => (message) => {
  try {
    const toastBox = getToastBox()

    const toastNotification = document.createElement('div')

    addStylesToToastNotification(toastNotification, type)
    
    addTextToNotification(toastNotification, message)

    toastBox.appendChild(toastNotification)

    setTimeout(() => {
      toastNotification.remove()
    }, 4000)

  } catch (err) {
    console.log(err)
  }
}

export const successToastNotification = toastNotification('success')
export const errorToastNotification = toastNotification('error')
export const warningToastNotification = toastNotification('warning')