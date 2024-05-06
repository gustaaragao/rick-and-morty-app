import { defaultNotification } from "../../defaultNotification";
import { createElement } from "lucide";

const addIconToPopUp = (popUp, type) => {
  const icon = defaultNotification[type].icon
  const iconSVGElement = createElement(icon)
  const iconDiv = document.createElement('div')
  
  iconDiv.appendChild(iconSVGElement)

  popUp.appendChild(iconDiv)
}

const addCSStoPopUp = (popUp, type) => {
  popUp.style.cssText = `
    width: 300px;
    background: pink;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 0 30px 30px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `
}

export const addStylesToPopUp = (popUp, type) => {
  addIconToPopUp(popUp, type)
  addCSStoPopUp(popUp, type)

}