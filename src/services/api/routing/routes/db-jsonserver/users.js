import { dbRequester } from '../../requesters/db-requester'

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

    localStorage.removeItem('user-info')
    localStorage.setItem('user-info', JSON.stringify({id: id, ...dataNewUser}))

    return await dbRequester('patch', `users/${id}`, '', dataNewUser)
  }
}