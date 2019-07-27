import { requests } from '../../utils/requests.js'

export function WeChatLogin(data){
  return requests("/WeChat/AuthLogin",data);
}
export function WeChatUserInfo(data){
  return requests("/WeChat/AuthUserInfo",data);
}