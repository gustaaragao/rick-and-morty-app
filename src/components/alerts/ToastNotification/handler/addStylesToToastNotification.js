import { createElement } from 'lucide'
import { stylesToastNotification } from './stylesToastNotification'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex'

const addCSStoToastNotification = (toastNotification, type) => {
	const color = stylesToastNotification[type].color
	const colorHex = transformTailwindColorToHex(color) 

	toastNotification.style.cssText = `
		background-color: #fff;
    height: 40px;
    font-weight: 400;
		margin-right: 20px;
    display: flex;
    align-items: center;
		border: 2px solid ${colorHex};
		color: ${colorHex};
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
	const icon =  stylesToastNotification[type].icon

  const iconSVGElement = createElement(icon)

	addCSStoIcon(iconSVGElement, type)

	toastNotification.appendChild(iconSVGElement)
}

export const addStylesToToastNotification = (toastNotification, type) => {
  addCSStoToastNotification(toastNotification, type)

	addIcon(toastNotification, type)
}
