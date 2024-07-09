import { ramRequester } from "../../requesters/ram-requester";

export const characters = {
  getAll: async function(name='', status='', gender='') {
    return await ramRequester("get", `character?name=${name}&status=${status}&gender=${gender}`, '') 
  },
  getByID: async function(id='') {
    return await ramRequester("get", `character/${id}`, '')
  },
  loadNextPage: async function(name='', status='', gender='', page='') {
    // page=2&name=Rick&status=Alive&gender=Male
    return await ramRequester("get", `character?page=${page}&name=${name}&status=${status}&gender=${gender}`, '')
  }
}