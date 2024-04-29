import { createElement } from 'lucide'
import { stylesToastNotification } from './stylesToastNotification'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex'
import { increaseBrightness } from '@/utils/increaseBrightness'

const addCSStoToastNotification = (toastNotification, type) => {
  const color = stylesToastNotification[type].color
  const colorHex = transformTailwindColorToHex(color)
  const colorHexLighter = increaseBrightness(colorHex, 80)

  toastNotification.style.cssText = `
    font-weight: 400;
	margin-right: 20px;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-right: 10px;
    display: flex;
    align-items: center;
	background-color: ${colorHexLighter};
	border: 2px solid ${colorHex};
	color: ${colorHex};
	font-size: 12px;
	border-radius: 0.375rem;
    `
}

const addCSStoIcon = (iconSVGElement, type) => {
  iconSVGElement.style.cssText = `
	margin: 0 2px;
	transform: scale(0.8);
	stroke-width: 3;
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
