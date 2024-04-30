import { createElement, X } from "lucide"

export const addCloseButton = (toastNofication) => {
  const closeIcon = createElement(X)

  const closeButton = document.createElement('button')

  closeButton.addEventListener('click', () => {
    toastNofication.remove()
  })

  closeButton.style.scale = 0.7

  closeButton.appendChild(closeIcon)

  toastNofication.appendChild(closeButton)
}
