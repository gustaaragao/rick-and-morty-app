import { dbRequester } from '../../requesters/db-requester'
import { removeObjectOfArray } from '@/utils/utilsObject'

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
  updateFavorite: async function (userID, character) {
    dbRequester('get', `favorites/${userID}`, '')
    .then((response) => {
      let userFavorites = response.data.favCharacters
        
      const alreadyFavorited = userFavorites.some((favoriteCharacter) => JSON.stringify(favoriteCharacter) === JSON.stringify(character))
      
      if (alreadyFavorited) {
        userFavorites = removeObjectOfArray(userFavorites, character)
      } else {
        userFavorites.push(character)
      }

      dbRequester('put', `favorites/${userID}`, '', { favCharacters: userFavorites })
    })
    .catch((err) => {
      console.error(err)
    })
  },
  removeFavorite: async function(userID, character) {
    dbRequester('get', `favorites/${userID}`, '')
    .then((response) => {
      let userFavorites = response.data.favCharacters

      userFavorites = removeItem(userFavorites, character)

      dbRequester('put', `favorites/${userID}`, '', { favCharacters: userFavorites })
    })
    .catch((err) => {
      console.error(err)
    })
  },
}
