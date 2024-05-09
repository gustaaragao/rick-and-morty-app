import { ramRequester } from "../../requesters/ram-requester";

export const characters = {
  get: async function(name='') {
    return await ramRequester("get", `character?name=${name}`, '') 
  },
  loadNextPage: async function(name='', page='') {
    return await ramRequester("get", `character?page=${page}&name=${name}`, '')
  }
}