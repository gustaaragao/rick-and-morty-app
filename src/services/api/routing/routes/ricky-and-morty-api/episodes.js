import { ramRequester } from "../../requesters/ram-requester";

export const episodes = {
  getAll: async function() {
    return await ramRequester("get", "episode", '')
  },
  getByID: async function(id='') {
    return await ramRequester("get", `episode/${id}`, '')
  },
  getByQuery: async function(value='', query='') {
    return await ramRequester("get", `episode?${query}=${value}`, '')
  },
  loadNextPage: async function(page='', name='', episode='') {
    return await ramRequester("get", `episode?page=${page}&name=${name}&episode=${episode}`, '')
  }
}