import { dbRequester } from '../../requesters/db-requester'

export const users = {
  getByID: async function (id='') {
    return await dbRequester('get', `users/${id}`, '')
  },
  updateUser: async function (id='', firstname='', lastname='', username='', email='', password='') {
    // TODO: Fazer os testes.
    
    const dataNewUser = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password
    }

    return await dbRequester('patch', `users/${id}`, '', dataNewUser)
  }
}