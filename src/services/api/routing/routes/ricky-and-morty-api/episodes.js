import { ramRequester } from "../../requesters/ram-requester";

export const episodes = {
  getAll: async function() {
    return await ramRequester("get", "episode", '')
  },
  getByID: async function(id='') {
    return await ramRequester("get", `episode/${id}`, '')
  },
  getByQuery: async function(query='', value='') {
    return await ramRequester("get", `episode?${query}=${value}`, '')
  },
  loadPage: async function(page='') {
    return await ramRequester("get", `episode?${page}`, '')
  }
}