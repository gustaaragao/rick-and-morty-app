/*
Parâmetros: 
- ToastBox
- Props do componente ToastNotification
  -- alertMessage
  -- alertType

const props = defineProps({
  alertMessage: {
    type: String,
    required: true,
  },
  alertType: {
    required: true,
    validator: (value) => {
      console.log(['sucess', 'error', 'warning'].includes(value))
      return ['sucess', 'error', 'warning'].includes(value)
    }
  },
})

Retorna: 
Cria um elemento Toast Notification no Toast Box (recebido via argumento)
*/

const getToastBox = () => {
  if (document.getElementById('toastBox') === null) {
    throw new Error('Toast Box component not found.')
  }
  
  return document.getElementById('toastBox')
}

const addStylesToToastNotification = (toastNotification) => {
  return toastNotification
}

export const createToastNotification = (message) => {
  try {
    const toastBox = getToastBox()

    const toastNotification = document.createElement('div')

    toastNotification.innerHTML = message

    addStylesToToastNotification(toastNotification)

    toastBox.append(toastNotification)

  } catch (err) {
    console.log(err)
  }



  // const toastNotification = document.createElement('div')

  // toastNotification.innerHTML = 'sucess'

  // toastBox.appendChild(toastNotification)
}