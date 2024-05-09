import { dbRequester } from '../../requesters/db-requester'

export const favorites = {
  create: async function (userID) {
    return await dbRequester('post', 'favorites', '', {
      id: userID,
      favCharacters: []
    })
  },
  get: async function (userID) {
    return await dbRequester('get', `favorites/${userID}`, '')
  },
  addFavorite: async function (userID, character) {
    dbRequester('get', `favorites/${userID}`, '')
      .then((response) => {
        let userFavorites = response.data.favCharacters

        userFavorites.push(character)

        dbRequester('put', `favorites/${userID}`, '', { favCharacters: userFavorites })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
