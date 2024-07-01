import { ramRequester } from "../../requesters/ram-requester";

export const locations = {
  getAll: async function() {
    return await ramRequester("get", "location", '')
  },
  getByID: async function(id='') {
    return await ramRequester("get", `location/${id}`, '')
  },
  getByQuery: async function(query='', value='') {
    return await ramRequester("get", `location?${query}=${value}`, '')
  },
  loadPage: async function(page='') {
    return await ramRequester("get", `location?${page}`, '')
  }
}