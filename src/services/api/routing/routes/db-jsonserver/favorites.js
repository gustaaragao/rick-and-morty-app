import { dbRequester } from '../../requesters/db-requester'

export const favorites = {
  create: async function (userID) {
    return await dbRequester('post', 'favorites', '', {
      id: userID,
      favCharacters: []
    })
  }
}
