import { dbRequester } from '../../requesters/db-requester'
import { filterKeysOfObject } from '@/utils/utilsObject';

export const users = {
  getByID: async function (id='') {
    return await dbRequester('get', `users/${id}`, '')
  },
  updateUser: async function (id='', firstname='', lastname='', username='', email='', password='') {
    const dataNewUser = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password
    }

    const filteredDataNewUser = filterKeysOfObject(dataNewUser, ['firstname', 'lastname', 'username', 'email'])

    localStorage.removeItem('user-info')
    localStorage.setItem('user-info', JSON.stringify({id: id, ...filteredDataNewUser}))

    return await dbRequester('patch', `users/${id}`, '', dataNewUser)
  }
}