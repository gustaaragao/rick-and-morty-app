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
      
      console.log(userFavorites)

      // dbRequester('put', `favorites/${userID}`, '').then((response) => {
      //   response.data.favCharacters = userFavorites
      // })
    }).catch((err) => {
      console.log(err)
    })
  }
}

// dbRequester('patch', `favorites/${userID}`, '')
//   .then((response) => {
//     console.log(response.data.favCharacters)
//     response.data.favCharacters.push(character)
//     console.log(response.data.favCharacters)
//   })
//   .catch((err) => console.log(err))