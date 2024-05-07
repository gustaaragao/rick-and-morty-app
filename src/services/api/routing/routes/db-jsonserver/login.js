import { dbRequester } from '../../requesters/db-requester'

export const login = {
  get: async function (email, password) {
    return await dbRequester('get', `users?username=${email}&password=${password}`, '')
  }
}
