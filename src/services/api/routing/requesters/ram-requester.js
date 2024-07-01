import { requester } from './requester'

const BASE_URL = import.meta.env.VITE_RICK_AND_MORTY_API_URL

export async function ramRequester(method, entity, params = '', headersOption) {
  try {
    const url = BASE_URL + '/' + entity + params
    return await requester(url, method, '', headersOption)
  } catch (error) {
    throw error.response ?? error
  }
}
