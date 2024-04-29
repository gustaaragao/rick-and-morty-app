import { addStylesToToastNotification } from "./handler/addStylesToToastNotification"
import { addTextToNotification } from "./handler/addTextToToastNotification"
import { getToastBox } from "./handler/getToastBox"

export const toastNotification = (message) => {
  try {
    const toastBox = getToastBox()

    const toastNotification = document.createElement('div')
    
    addStylesToToastNotification(toastNotification)
    
    addTextToNotification(toastNotification, message)

    toastBox.appendChild(toastNotification)
  } catch (err) {
    console.log(err)
  }
}
