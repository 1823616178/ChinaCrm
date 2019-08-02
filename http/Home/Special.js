import {
  requests
} from '../../utils/requests.js'

export function SpecialBuinsDataGet(data) {
  return requests("/Busin/GetDrawerListTree", data);
}
export function reviseContentData(data) {
  return requests("/person/reviseContentData", data);
}
export function AddLogDataList(data) {
  return requests("/person/AddLogDataList", data);
}