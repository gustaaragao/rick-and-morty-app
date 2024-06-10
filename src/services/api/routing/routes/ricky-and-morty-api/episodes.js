import { ramRequester } from "../../requesters/ram-requester";

export const episodes = {
  getAll: async function() {
    return await ramRequester("get", "episode", '')
  },
  getByName: async function(name='') {
    return await ramRequester("get", `episode?name=${name}`, '')
  },
  getByEpisode: async function(episode='') {
    return await ramRequester("get", `episode?episode=${episode}`, '')
  },
  loadNextPage: async function(page='', name='', episode='') {
    return await ramRequester("get", `episode?page=${page}&name=${name}&episode=${episode}`, '')
  }
}