import { ramRequester } from "../../requesters/ram-requester";

export const locations = {
  getAll: async function() {
    return await ramRequester("get", "location", '')
  },
}