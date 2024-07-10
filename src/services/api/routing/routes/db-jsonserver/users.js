import { dbRequester } from '../../requesters/db-requester'

export const users = {
  getByID: async function (id='') {
    return await dbRequester('get', `users/${id}`, '')
  }
}