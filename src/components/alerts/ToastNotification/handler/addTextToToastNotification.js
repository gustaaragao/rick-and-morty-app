export const addTextToNotification = (toastNotification, message) => {
  const spanText = document.createElement('span')
  spanText.innerHTML = message

  toastNotification.appendChild(spanText)
}
