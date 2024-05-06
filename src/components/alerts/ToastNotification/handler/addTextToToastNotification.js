import { defaultNotification } from "../../defaultNotification"

export const addTextToNotification = (toastNotification, message, type) => {
  const divText = document.createElement('div')

  const titleText = document.createElement('h1')
  const spanText = document.createElement('span')

  titleText.innerHTML = type.charAt(0).toUpperCase() + type.slice(1)

  if (message) {
    spanText.innerHTML = message
  } else {
    spanText.innerHTML = defaultNotification[type].defaultMessage
  }

  divText.style.cssText = `
    width: 100%;
  `

  titleText.style.cssText = `
    font-weight: 900;
    font-size: small;
  `

  divText.appendChild(titleText)
  divText.appendChild(spanText)

  toastNotification.appendChild(divText)
}
