import {
  requests
} from '../../utils/requests.js'

export function OneRequests(data) {
  return requests("/Busin/getEcterInfoList", data);
}

export function ApplyBusinessData(data) {
  return requests("/Busin/ApplyBusinessData", data)
}

export function cancleApplyFunc(data) {
  return requests("/Busin/cancleApplyFunc", data)
}