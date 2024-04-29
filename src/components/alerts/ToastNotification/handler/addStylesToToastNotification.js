import { createElement } from "lucide"
import { stylesToastNotification } from "./stylesToastNotification"

const addCSS = (toastNotification) => {
    toastNotification.style.cssText = `
    width: 300px;
    background: red;
    height: 40px;
    font-weight: 500;
    margin 15px 0;
    display: flex;
    align-items: center;
    `
}

export const addStylesToToastNotification = (toastNotification) => {
    addCSS(toastNotification)
  }