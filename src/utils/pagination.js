export const getPage = (url) => {
  if (url) {
    const page = url.split('?')[1]
    return page
  }

  return null
}

export const replaceNumberOfPage = (numberOfPage, url) => {
  const urlArray = url.split('&')

  urlArray[0] = numberOfPage

  const newUrl = urlArray.join('&')
  
  return newUrl
}