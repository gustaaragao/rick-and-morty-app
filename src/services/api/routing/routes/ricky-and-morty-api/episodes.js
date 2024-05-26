import { ramRequester } from "../../requesters/ram-requester";

export const episodes = {
  getAll: async function() {
    return await ramRequester("get", "episode", '')
  }
}