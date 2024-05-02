import { addStylesToPopUp } from "./handler/addStylesToPopUp"

const popUpAlert = (type) => (message = '') => {
  try {
    if (message.length > 50) {
      throw new Error('Message longer than 50 characters.')
    }

    const popUp = document.createElement('div')

    addStylesToPopUp(popUp, type)

    popUp.innerHTML = message

    document.body.appendChild(popUp)

    // setTimeout(() => {
    //   popUp.remove()
    // }, 6000)

  } catch (err) {
    console.log(err)
  }
}

export const popUpAlertSuccess = popUpAlert('success')
export const popUpAlertError = popUpAlert('error')
export const popUpAlertWarning = popUpAlert('warning')
