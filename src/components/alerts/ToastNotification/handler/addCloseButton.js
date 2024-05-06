import { createElement, X } from "lucide"

export const addCloseButton = (toastNofication) => {
  const closeIcon = createElement(X)

  const closeButton = document.createElement('button')

  closeButton.style.cssText = `
    padding-right: 10px;
  `

  closeButton.addEventListener('click', () => {
    toastNofication.remove()
  })

  closeButton.style.scale = 0.7

  closeButton.appendChild(closeIcon)

  toastNofication.appendChild(closeButton)
}
