import axios from 'axios'

export async function requester(url, method, data, headersOption) {
  try {
    return await axios({
      method: method,
      url: url,
      data: data,
      headers: headersOption
    })
  } catch (error) {
    throw error.response ?? error
  }
}
