import { dbRequester } from '../../requesters/db-requester'

export const favorites = {
  create: async function (userID) {
    return await dbRequester('post', 'favorites', '', {
      id: userID,
      favCharacters: []
    })
  },
  addFavorite: async function (userID, character) {
    dbRequester('get', `favorites/${userID}`, '').then((response) => {
      let userFavorites = response.data.favCharacters
      
      userFavorites.push(character)

      dbRequester('put', `favorites/${userID}`, '', {favCharacters: userFavorites})
    }).catch((err) => {
      console.log(err)
    })
  }
}