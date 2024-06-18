import { ramRequester } from "../../requesters/ram-requester";

export const characters = {
  getAll: async function(name='') {
    return await ramRequester("get", `character?name=${name}`, '') 
  },
  getByID: async function(id='') {
    return await ramRequester("get", `character/${id}`, '')
  },
  loadNextPage: async function(name='', page='') {
    return await ramRequester("get", `character?page=${page}&name=${name}`, '')
  }
}