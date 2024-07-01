export const getPage = (url) => {
  if (url) {
    const page = url.split('?')[1]
    return page
  }

  return null
}