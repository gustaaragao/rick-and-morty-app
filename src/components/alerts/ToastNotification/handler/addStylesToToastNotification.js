import { createElement } from 'lucide'
import { stylesToastNotification } from './stylesToastNotification'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex'
import { increaseBrightness } from '@/utils/increaseBrightness'

const addCSStoToastNotification = (toastNotification, type) => {
  const color = stylesToastNotification[type].color
  const colorHex = transformTailwindColorToHex(color)
  const colorHexLighter = increaseBrightness(colorHex, 60)

  toastNotification.style.cssText = `
    font-weight: 400;
	  margin-right: 20px;
	  padding-top: 4px;
	  padding-bottom: 4px;
	  padding-right: 8px;
    display: flex;
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
	transform: scale(1);
	stroke-width: 2;
	`
}

const addIcon = (toastNotification, type) => {
  const icon = stylesToastNotification[type].icon

  const iconSVGElement = createElement(icon)

  addCSStoIcon(iconSVGElement, type)

  toastNotification.appendChild(iconSVGElement)
}

export const addStylesToToastNotification = (toastNotification, type) => {
  addCSStoToastNotification(toastNotification, type)

  addIcon(toastNotification, type)
}
