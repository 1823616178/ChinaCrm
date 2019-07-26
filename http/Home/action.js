import { requests } from '../../utils/requests.js'

export function OneRequests(data) {
  return requests("/Busin/getEcterInfoList", data);
}

