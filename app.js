//app.js
import {
  setX_Token
} from './utils/requests.js'
import {
  WeChatLogin,
  WeChatAllData
} from './http/Login/index.js'
import {
  ChangeXtoken
} from './utils/store.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorage({
                key: 'USER_INFO',
                data: res.userInfo,
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        WeChatLogin(res).then((poson) => {
          this.globalData.openid = poson.data.login.openid
          this.globalData.session_key = poson.data.login.session_key
          this.globalData.access_token = poson.data.accessTokenData.access_token
          wx.setStorage({
            key: 'jwt',
            data: poson.data.token,
          })
          setX_Token().then((res => {
            WeChatAllData().then((res) => {
              this.globalData.UserAllInfo = res.data
              wx, wx.setStorage({
                key: 'UserAllInfo',
                data: res.data,
              })
            })
          }))
        })
      }
    })
    // 获取用户信息

  },
  globalData: {
    userInfo: null,
    session_key: "",
    openid: "",
    xToken: "",
    UserAllInfo: []
  }
})