import { requester } from './requester'

const BASE_URL = import.meta.env.VITE_API_DB_JSONSERVER_URL

export async function dbRequester(method, entity, params = '', data = '', headersOption) {
  try {
    const url = BASE_URL + '/' + entity + params
    return await requester(url, method, data, headersOption)
  } catch (error) {
    throw error.response ?? error
  }
}
