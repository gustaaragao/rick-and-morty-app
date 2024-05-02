import { createElement } from 'lucide'
import { typesToastNotification } from './typesToastNotification/typesToastNotification'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex'
import { increaseBrightness } from '@/utils/increaseBrightness'

const addCSStoToastNotification = (toastNotification, type) => {
  const color = typesToastNotification[type].color
  const colorHex = transformTailwindColorToHex(color)
  const colorHexLighter = increaseBrightness(colorHex, 60)

  toastNotification.style.cssText = `
    font-weight: 400;
	  padding-top: 4px;
	  padding-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
	  background-color: ${colorHexLighter};
	  border: 2px solid ${colorHex};
	  color: ${colorHex};
	  font-size: 12px;
	  border-radius: 0.375rem;
    `
}

const addCSStoIcon = (iconSVGElement) => {
  iconSVGElement.style.cssText = `
	margin: 0 10px;
	stroke-width: 2;
	`
}

const addIcon = (toastNotification, type) => {
  const icon = typesToastNotification[type].icon

  const iconSVGElement = createElement(icon)

  addCSStoIcon(iconSVGElement, type)

  toastNotification.appendChild(iconSVGElement)
}

export const addStylesToToastNotification = (toastNotification, type) => {
  addCSStoToastNotification(toastNotification, type)

  addIcon(toastNotification, type)
}
