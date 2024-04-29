export const getToastBox = () => {
  if (document.getElementById('toastBox') === null) {
    throw new Error('Toast Box component not found.')
  }

  return document.getElementById('toastBox')
}
