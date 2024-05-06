import { dbRequester } from '../../requesters/db-requester'

async function checkDBForUsername(username) {
  let response = await dbRequester('get', `users?username=${username}`, '')

  return (response.status == 200 || response.status == 201) && response.data.length > 0
}

async function checkDBForEmail(email) {
  let response = await dbRequester('get', `users?email=${email}`, '')

  return (response.status == 200 || response.status == 201) && response.data.length > 0
}

export const register = {
  post: async function (firstname, lastname, username, email, password) {
    if (await checkDBForUsername(username)) {
      throw 'Nome de usuário já utilizado.'
    }
    if (await checkDBForEmail(email)) {
      throw 'Nome de e-mail já utilizado.'
    }

    let dataNewUser = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password
    }

    return await dbRequester('post', 'users', '', dataNewUser)
  }
}
